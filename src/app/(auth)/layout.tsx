import type { ReactNode } from "react";
import { redirect } from "next/navigation";

import { isValidSession } from "@/lib/auth";
import { Transport } from "@/ui/illustrations";

const Layout = async ({ children }: { children: ReactNode }) => {
  // User is logged in so should be redirected directly into the app
  if (await isValidSession()) {
    redirect("/dashboard");
  }

  return (
    <div className="flex h-screen w-screen flex-row">
      <main className="relative flex basis-1/3 items-center justify-center">
        <div className="flex w-full flex-col px-8">{children}</div>
      </main>
      <aside className="relative flex flex-1 items-center justify-center">
        <div className="h-5/6 w-5/6">
          <Transport />
        </div>
      </aside>
    </div>
  );
};

export default Layout;
