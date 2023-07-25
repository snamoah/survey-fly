'use server';

import { cookies, headers } from 'next/headers';
import { notFound, redirect } from 'next/navigation';

import { env } from '../config';
import { auth } from '../config/firebase';
import { sendEmail } from '../config/emails';
import { RedirectType } from 'next/dist/client/components/redirect';

const AUTH_SESSION_KEY = 'authToken';
const GUEST_SESSION_EXPIRES_IN = 60 * 60 * 5 * 1000; // 5 days
const DEFAULT_SESSION_EXPIRES_IN = 60 * 60 * 24 * 14 * 1000; // 14 days

type SignInOptions = {
  isGuest?: boolean;
};

export const handleSignIn = async (
  idToken: string,
  options: SignInOptions = {},
) => {
  try {
    const decodedIdToken = await auth.verifyIdToken(idToken);
    if (Date.now() / 1000 - decodedIdToken.auth_time > 5 * 50) {
      throw new Error('Recent sign in required!');
    }

    // Set session expiration to 30 days.
    const expiresIn = options.isGuest
      ? GUEST_SESSION_EXPIRES_IN
      : DEFAULT_SESSION_EXPIRES_IN;

    const sessionCookie = await auth.createSessionCookie(idToken, {
      expiresIn,
    });

    cookies().set({
      name: AUTH_SESSION_KEY,
      value: sessionCookie,
      maxAge: expiresIn,
      secure: false,
      httpOnly: true,
      path: '/',
    });
    return { success: true };
  } catch (_) {
    return { error: true };
  }
};

export const sendEmailLink = async (email: string) => {
  const loginLink = await auth.generateSignInWithEmailLink(email, {
    url: `${env('APP_URL')}/login/verify`,
  });

  await sendEmail({
    to: email,
    subject: 'Login to your account',
    htmlPart: `<h3>Hello,</h3><br />Click the button below to login in to your account<br/><a href="${loginLink}">Login</a>`,
  });
};

export const verifySession = async () => {
  const sessionCookie = cookies().get(AUTH_SESSION_KEY);
  if (!sessionCookie?.value) {
    throw new Error('Login required');
  }

  const decodedIdToken = await auth.verifySessionCookie(
    sessionCookie.value,
    true,
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

export const redirectToLogin = () => redirect('/login');

export const redirectToNotFoundIfNotSignedIn = async () => {
  try {
    await verifySession();
  } catch (_) {
    return notFound();
  }
};

export const redirectToSignInIfNotSignedIn = async ({
  asGuest,
}: {
  asGuest?: boolean;
} = {}) => {
  const currentUrl = headers().get('x-url');
  const pathName = asGuest ? '/login/guest' : '/login';

  try {
    await verifySession();
  } catch (_) {
    return redirect(`${pathName}?from=${currentUrl}`, RedirectType.replace);
  }
};

export const signOut = async () => {
  cookies().set({
    name: AUTH_SESSION_KEY,
    value: '',
    maxAge: 0,
    secure: false,
    httpOnly: true,
    path: '/',
  });

  try {
    const user = await getUser();
    await auth.revokeRefreshTokens(user.uid);
    await redirectToLogin();
  } catch (_) {
    // TODO: implement some error monitoring
  }
};
