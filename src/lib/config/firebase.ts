import { getAuth } from "firebase-admin/auth";
import { getFirestore } from "firebase-admin/firestore";
import { cert, getApps, initializeApp } from "firebase-admin/app";

import { env } from ".";

const app =
  getApps()[0] ??
  initializeApp({
    credential: cert({
      clientEmail: env("FIREBASE_CLIENT_EMAIL"),
      projectId: env("FIREBASE_PROJECT_ID"),
      privateKey: env("FIREBASE_PRIVATE_KEY"),
    }),
  });

export const db = getFirestore(app);

export const auth = getAuth(app);
