"use client";

import { classNames } from "@/utils";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import { useRouter } from "next/router";

const ASIDE_SEGMENTS = ["create", "integrate"];

const navLinks = [
  {
    key: "create",
    title: "Create",
    href: "/create",
  },
  {
    key: "integrate",
    title: "Integrate",
    href: "/integrate",
  },
  {
    key: "share",
    title: "Share",
    href: "/share",
  },
  {
    key: "responses",
    title: "Responses",
    href: "/responses",
  },
];

const toolbarLinks = [
  { key: "build", title: "Build" },
  { key: "trigger", title: "Trigger" },
  { key: "design", title: "Appearance" },
];

type Props = {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const currentToolbarTab = searchParams.get("t") ?? "build";
  const basePath = `/surveys/${params.surveyId}`;
  const segment = useSelectedLayoutSegment();
  const isToolbarVisible = segment === "create";
  const isAsideVisible = segment && ASIDE_SEGMENTS.includes(segment);

  console.log({ pathname });

  return (
    <div className="flex h-screen divide-x divide-slate-300">
      {isToolbarVisible && (
        <nav className="w-48 bg-yellow-200">
          <div className="flex h-20 items-center justify-center">
            <a href="">Go back</a>
          </div>

          <ul className="mt-20">
            {toolbarLinks.map((link, index) => {
              const isActive = currentToolbarTab === link.key;
              return (
                <li key={index} className="relative h-12">
                  <Link href={`${pathname}?t=${link.key}`}>
                    <span
                      className={classNames(
                        "flex h-full items-center pl-6",
                        isActive && "bg-yellow-300 pl-6"
                      )}
                    >
                      {link.title}
                    </span>
                    {isActive && (
                      <span className="absolute left-0 top-0 h-full w-1 bg-yellow-600"></span>
                    )}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>
      )}
      <div className="flex grow flex-col divide-y divide-slate-300">
        <nav className="flex h-20 justify-between bg-slate-200">
          <ul className={classNames("flex", !isToolbarVisible && "ml-48")}>
            {navLinks.map((navLink, index) => (
              <li key={index} className="relative">
                <Link href={`${basePath}/${navLink.href}`}>
                  <span className="flex h-full items-center px-4">
                    {navLink.title}
                  </span>
                  {navLink.key === segment && (
                    <span className="absolute bottom-0 left-0 h-1 w-full bg-yellow-500"></span>
                  )}
                </Link>
              </li>
            ))}
          </ul>

          <ul className="flex">
            <li>
              <button>Preview</button>
            </li>
            <li>
              <button>Publish</button>
            </li>
          </ul>
        </nav>
        <div className="flex grow divide-x divide-slate-300">
          {isAsideVisible && (
            <section className="flex h-full w-72 flex-col bg-slate-200">
              <div className="grow"></div>
              {segment === "integrate" && (
                <footer className="align-self-end h-24 bg-indigo-300"></footer>
              )}
            </section>
          )}
          <main className="grow bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
