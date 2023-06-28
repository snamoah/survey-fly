import { getUser } from "@/lib/auth";
import Link from "next/link";
import type { ReactNode } from "react";

const Layout = async ({ children }: { children: ReactNode }) => {
  const user = await getUser();

  return (
    <div className="flex h-screen flex-col">
      <nav className="flex h-16 place-content-between divide-x bg-slate-800 p-3">
        <div className="flex flex-1 items-center">
          <header className="grid place-content-center px-4">
            <h2 className="bg-gradient-to-r from-orange-500 to-cyan-400 bg-clip-text font-extrabold text-slate-50 text-transparent">
              SurveyFly
            </h2>
          </header>
          <menu className="ml-10 grid h-full grid-flow-col gap-4">
            <li className="flex items-center">
              <Link
                href="/dashboard"
                className="px-3 py-2 font-medium text-slate-100 hover:text-orange-400"
              >
                Surveys
              </Link>
            </li>
          </menu>
        </div>
        <div>
          <menu className="ml-4 grid h-full grid-flow-col gap-4">
            <li className="flex items-center">
              <Link
                href="/login"
                className="rounded-sm px-3 py-2 font-medium text-slate-100 hover:bg-slate-600"
              >
                Login
              </Link>
            </li>
            <li className="flex items-center">
              <Link href="/signup" className="btn bg-orange-500">
                Sign up
              </Link>
            </li>
          </menu>
        </div>
      </nav>
      <main className="flex-1 overflow-y-auto bg-white">{children}</main>
    </div>
  );
};

export default Layout;
