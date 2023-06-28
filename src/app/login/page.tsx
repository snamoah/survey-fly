"use client";

import { handleSignIn } from "@/lib/auth";

const LoginPage = () => {
  return (
    <div>
      <h1>Login</h1>
      <form action={handleSignIn}>
        <button type="submit" className="btn bg-orange-400">
          Click here to login
        </button>
      </form>
    </div>
  );
};

export default LoginPage;
