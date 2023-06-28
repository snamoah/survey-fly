"use client";

import { useState, useTransition } from "react";

import { sendEmailLink } from "@/lib/auth";
import { clientStorage } from "@/lib/storage";
import Logo from "@/ui/Logo";

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
        placeholder="e.g. johndoe@example.com"
        className="w-full rounded bg-slate-100 p-3 text-sm outline-none"
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
    <section className="grid grid-flow-row gap-8">
      <div className="mb-10 grid place-items-center">
        <Logo />
      </div>
      <header className="flex flex-col gap-1">
        <h1 className="font-bold ">Welcome</h1>
        <p className="text-sm text-slate-400">
          To keep connected with us please login with your email
        </p>
      </header>
      <div>
        <EmailForm />
      </div>
    </section>
  );
};

export default LoginPage;
