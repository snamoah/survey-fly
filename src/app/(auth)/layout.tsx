import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isValidSession } from "@/lib/auth";

const Layout = async ({ children }: { children: ReactNode }) => {
  // User is logged in so should be redirected directly into the app
  if (await isValidSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen flex-row bg-yellow-50">
      <main className="relative flex basis-full items-center justify-center">
        <nav className="absolute left-0 top-0 h-16 w-full bg-slate-400"></nav>
        <div className="flex h-1/2 w-1/2 flex-col">{children}</div>
      </main>
      <aside className="basis-1/2 bg-blue-700"></aside>
    </div>
  );
};

export default Layout;
