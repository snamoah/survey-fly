'use  client';

import {
  getAuth,
  signInWithEmailLink,
  isSignInWithEmailLink,
  signInAnonymously,
  setPersistence,
  inMemoryPersistence,
} from 'firebase/auth';
import { initializeApp } from 'firebase/app';

import { clientStorage } from '@/lib/storage';
import { handleSignIn, signOutServer } from '@/lib/auth';

const app = initializeApp({
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
});

const auth = getAuth(app);
setPersistence(auth, inMemoryPersistence);

export const verifyLoginLink = async () => {
  const email = clientStorage.getItem('email');

  /*
   * Redirect to login if verification link was opened on another device
   * the page was not opened via a login redirect
   */
  if (!isSignInWithEmailLink(auth, window.location.href) || !email) {
    return { error: true };
  }

  try {
    const credential = await signInWithEmailLink(
      auth,
      email,
      window.location.href,
    );

    clientStorage.removeItem('email');

    const idToken = await credential.user.getIdToken();
    const results = await handleSignIn(idToken);
    return results;
  } catch (_) {
    return { error: true };
  }
};

export const signInAsGuest = async () => {
  try {
    const credential = await signInAnonymously(auth);
    const idToken = await credential.user.getIdToken();
    const results = await handleSignIn(idToken, { isGuest: true });
    return results;
  } catch (_) {
    return { error: true };
  }
};

export const signOut = async () => {
  await auth.signOut();
  await signOutServer();
};
