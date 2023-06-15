"use client";

import { classNames } from "@/utils";
import Link from "next/link";
import {
  usePathname,
  useSearchParams,
  useSelectedLayoutSegment,
} from "next/navigation";
import BuildSection from "./components/BuildSection";
import DesignSection from "./components/DesignSection";
import TriggerSection from "./components/TriggerSection";
import IntegrateSidebar from "./components/IntegrateSidebar";

const ASIDE_SEGMENTS = ["create", "integrate"];

const navLinks = [
  { key: "create", title: "Create" },
  { key: "integrate", title: "Integrate" },
  { key: "share", title: "Share" },
  { key: "responses", title: "Responses" },
];

type ToolbarAction = "build" | "trigger" | "design";

const toolbarLinks: { key: ToolbarAction; title: string }[] = [
  { key: "build", title: "Build" },
  { key: "trigger", title: "Trigger" },
  { key: "design", title: "Appearance" },
];

const toolbarTabComponent: Record<ToolbarAction, JSX.Element> = {
  build: <BuildSection />,
  design: <DesignSection />,
  trigger: <TriggerSection />,
};

type Props = {
  children: React.ReactNode;
  params: {
    surveyId: string;
  };
};

const Layout = ({ children, params }: Props) => {
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const segment = useSelectedLayoutSegment();

  const isToolbarVisible = segment === "create";
  const basePath = `/surveys/${params.surveyId}`;
  const isAsideVisible = segment && ASIDE_SEGMENTS.includes(segment);
  const currentToolbarTab = (searchParams.get("t") ?? "build") as ToolbarAction;

  return (
    <div className="flex h-screen divide-x divide-slate-300">
      {isToolbarVisible && (
        <nav className="w-48 bg-yellow-200">
          <div className="flex h-20 w-48 items-center justify-center">
            <a>Go back</a>
          </div>

          <menu className="mt-20">
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
          </menu>
        </nav>
      )}
      <div className="flex grow flex-col divide-y divide-slate-300">
        <nav className="flex h-20 min-h-max justify-between bg-slate-200">
          <div className="flex">
            {!isToolbarVisible && (
              <div className="flex h-20 w-48 items-center justify-center">
                <a>Go back</a>
              </div>
            )}
            <menu className={classNames("flex")}>
              {navLinks.map((navLink, index) => (
                <li key={index} className="relative">
                  <Link href={`${basePath}/${navLink.key}`}>
                    <span className="flex h-20 items-center px-4">
                      {navLink.title}
                    </span>
                    {navLink.key === segment && (
                      <span className="absolute bottom-0 left-0 h-1 w-full bg-yellow-500"></span>
                    )}
                  </Link>
                </li>
              ))}
            </menu>
          </div>

          <ul className="mr-6 flex items-center gap-2">
            <li>
              <button className="btn text-slate-700 ring-1 ring-slate-700">
                Preview
              </button>
            </li>
            <li>
              <button className="btn bg-purple-500">Publish</button>
            </li>
          </ul>
        </nav>
        <div className="flex grow divide-x divide-slate-300 overflow-hidden">
          {isAsideVisible && (
            <section className="flex w-72 flex-col bg-slate-200">
              {segment === "create" && toolbarTabComponent[currentToolbarTab]}
              {segment === "integrate" && <IntegrateSidebar />}
            </section>
          )}
          <main className="grow bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
};

export default Layout;
