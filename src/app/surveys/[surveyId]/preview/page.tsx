"use client";
import { useContext } from "react";
import { QuestionsContext } from "../components/QuestionsProvider";

const Page = () => {
  const { questions } = useContext(QuestionsContext);

  console.log({ questions });
  return (
    <div className="absolute left-0 top-0 flex h-screen w-screen flex-col">
      <nav className="h-20 w-full bg-slate-400"></nav>
      <p className="h-10 bg-yellow-200"></p>
      <main className="row-span-3 grid grid-cols-1 overflow-auto bg-white">
        <div className="flex flex-col gap-3">
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
          <div className="h-10 w-10 bg-red-300"></div>
        </div>
      </main>
      <footer className="h-28 bg-orange-300"></footer>
    </div>
  );
};

export default Page;
