import { redirect } from "next/navigation";

import Logo from "@/ui/Logo";
import { isValidSession } from "@/lib/auth";
import { Transport } from "@/ui/illustrations";

import { EmailForm } from "./EmailForm";

const LoginPage = async () => {
  // User is logged in so should be redirected directly into the app
  if (await isValidSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen flex-row">
      <main className="relative flex basis-1/3 items-center justify-center">
        <div className="flex w-full flex-col px-8">
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
        </div>
      </main>
      <aside className="relative flex flex-1 items-center justify-center">
        <div className="h-5/6 w-5/6">
          <Transport />
        </div>
      </aside>
    </div>
  );
};

export default LoginPage;
