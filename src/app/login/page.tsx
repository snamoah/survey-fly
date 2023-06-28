"use client";

import { useState, useTransition } from "react";

import { sendEmailLink } from "@/lib/auth";
import { clientStorage } from "@/lib/storage";

const EmailForm = () => {
  const [email, setEmail] = useState("");
  const [isPending, startTransition] = useTransition();
  const [isEmailSent, setIsEmailSent] = useState(false);

  const loginWithEmail = async () => {
    clientStorage.setItem("email", email);
    await sendEmailLink(email);
    setIsEmailSent(true);
  };

  return isEmailSent ? (
    <h1>
      Email has been sent to <em>{email}</em>
    </h1>
  ) : (
    <div className="flex flex-col gap-3">
      <label className="text-xs" htmlFor="email">
        You will receive an email to login
      </label>
      <input
        required
        id="email"
        name="email"
        type="email"
        value={email}
        className="rounded p-3 text-sm ring-2 ring-slate-300"
        onChange={(e) => setEmail(e.target.value)}
      />
      <button
        disabled={isPending}
        onClick={() => startTransition(loginWithEmail)}
        type="submit"
        className="btn bg-orange-400"
      >
        {isPending ? "Logging in..." : "Login"}
      </button>
    </div>
  );
};

const LoginPage = () => {
  return (
    <div className="flex h-screen flex-row bg-yellow-50">
      <main className="relative flex basis-full items-center justify-center">
        <nav className="absolute left-0 top-0 h-16 w-full bg-slate-400"></nav>
        <div className="flex h-1/2 w-1/2 flex-col">
          <h1>Login</h1>
          <EmailForm />
        </div>
      </main>
      <aside className="basis-1/2 bg-blue-700"></aside>
    </div>
  );
};

export default LoginPage;
