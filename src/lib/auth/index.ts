"use server";

import { cookies } from "next/headers";
import { notFound, redirect } from "next/navigation";

import { auth } from "../config/firebase";

const AUTH_SESSION_KEY = "authToken";

export const handleSignIn = async (idToken: string) => {
  try {
    const decodedIdToken = await auth.verifyIdToken(idToken);
    if (Date.now() / 1000 - decodedIdToken.auth_time > 5 * 50) {
      throw new Error("Recent sign in required!");
    }

    // Set session expiration to 5 days.
    const expiresIn = 60 * 60 * 24 * 5 * 1000;
    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set({
      name: AUTH_SESSION_KEY,
      value: sessionCookie,
      maxAge: expiresIn,
      secure: true,
      httpOnly: true,
      path: "/",
    });
    return { success: true };
  } catch (_) {
    return { error: true };
  }
};

export const sendEmailLink = async (email: string) => {
  const loginLink = await auth.generateSignInWithEmailLink(email, {
    url: "http://localhost:3000/login/verify",
  });

  console.log({ loginLink });
};

export const verifySession = async () => {
  const sessionCookie = cookies().get(AUTH_SESSION_KEY);
  if (!sessionCookie?.value) {
    throw new Error("Login required");
  }

  const decodedIdToken = await auth.verifySessionCookie(
    sessionCookie.value,
    true
  );
  return decodedIdToken;
};

export const isValidSession = async () => {
  try {
    await verifySession();
    return true;
  } catch (_) {
    return false;
  }
};

export const getUser = async () => {
  try {
    const decodedIdToken = await verifySession();
    const userRecord = await auth.getUser(decodedIdToken.uid);
    return userRecord;
  } catch (_) {
    return redirectToLogin();
  }
};

export const redirectToLogin = async () => {
  redirect("/login");
};

export const redirectToNotFoundIfNotSignedIn = async () => {
  try {
    await verifySession();
  } catch (_) {
    return notFound();
  }
};

export const signOut = async () => {
  cookies().set({
    name: AUTH_SESSION_KEY,
    value: "",
    maxAge: 0,
    secure: true,
    httpOnly: true,
    path: "/",
  });

  try {
    const user = await getUser();
    await auth.revokeRefreshTokens(user.uid);
    await redirectToLogin();
  } catch (_) {
    // TODO: implement some error monitoring
  }
};
