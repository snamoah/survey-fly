"use client";

import Link from "next/link";
import { ReactNode, useState } from "react";
import { useSearchParams, useSelectedLayoutSegment } from "next/navigation";

import { classNames } from "@/utils";
import type { Survey } from "@/types";
import { ArrowRight } from "@/ui/icons";
import BuildSection from "./BuildSection";
import { publishSurveyAction } from "@/lib/actions";

import DesignSection from "./DesignSection";
import TriggerSection from "./TriggerSection";
import IntegrateSidebar from "./IntegrateSidebar";

type Props = {
  survey: Survey;
  children: ReactNode;
};

type ToolbarAction = "build" | "trigger" | "design";

const ASIDE_SEGMENTS = ["create", "integrate"];

const navLinks = [
  { key: "create", title: "Create" },
  { key: "integrate", title: "Integrate" },
  { key: "share", title: "Share" },
  { key: "responses", title: "Responses" },
];

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

export const LayoutComponent = ({ survey, children }: Props) => {
  const [isPublishing, setIsPublishing] = useState(false);
  const searchParams = useSearchParams();
  const segment = useSelectedLayoutSegment();

  const isToolbarVisible = segment === "create";
  const basePath = `/surveys/${survey.id}`;
  const isAsideVisible = segment && ASIDE_SEGMENTS.includes(segment);
  const currentToolbarTab = (searchParams.get("t") ?? "build") as ToolbarAction;

  const publishSurvey = async () => {
    setIsPublishing(true);
    await publishSurveyAction(survey.id);
    setIsPublishing(false);
  };

  return (
    <div className="flex h-screen divide-x divide-slate-300">
      {isToolbarVisible && (
        <nav className="w-48 bg-yellow-200">
          <Link
            href="/dashboard"
            className="flex h-20 w-48 items-center justify-center gap-2"
          >
            <ArrowRight size={16} />
            <span>Go back</span>
          </Link>

          <menu className="mt-20">
            {toolbarLinks.map((link, index) => {
              const isActive = currentToolbarTab === link.key;
              return (
                <li key={index} className="relative h-12">
                  <Link href={`${basePath}/create?t=${link.key}`}>
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
              <Link
                href="/dashboard"
                className="flex h-20 w-48 items-center justify-center gap-2"
              >
                <ArrowRight size={16} />
                Go back
              </Link>
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
              <Link
                href={`${basePath}/preview`}
                className="btn text-slate-700 ring-1 ring-slate-700"
              >
                Preview
              </Link>
            </li>
            <li>
              <button
                disabled={isPublishing}
                onClick={publishSurvey}
                className="btn bg-purple-500"
              >
                {isPublishing ? "Publishing..." : "Publish"}
              </button>
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
          <main className="grow overflow-y-auto bg-white">{children}</main>
        </div>
      </div>
    </div>
  );
};
