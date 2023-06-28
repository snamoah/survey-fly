"use server";

import { nanoid } from "nanoid";
import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import { redirect } from "next/navigation";

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
