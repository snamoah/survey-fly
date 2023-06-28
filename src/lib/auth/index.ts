"use server";

import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

import { auth } from "../config/firebase";

const AUTH_TOKEN_KEY = "authToken";

// TODO: implement more secure check
export const isAuthenticated = (request: NextRequest) => {
  return request.cookies.has(AUTH_TOKEN_KEY);
};

export const handleSignIn = async () => {
  cookies().set({
    name: AUTH_TOKEN_KEY,
    value: nanoid(),
    maxAge: 60,
    path: "/",
  });

  return redirect("/dashboard");
};

export const sendEmailLink = async (email: string) => {
  const loginLink = await auth.generateSignInWithEmailLink(email, {
    url: "http://localhost:3000/login/verify",
  });

  console.log({ loginLink });
};
