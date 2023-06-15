import { useState } from "react";
import { classNames } from "@/utils";

const questions: Question[] = [
  {
    title: "Type a question",
    type: "single-choice",
  },
  {
    title: "Type a question",
    type: "yes-or-no",
  },
  {
    title: "Type a question",
    type: "multiple-choice",
  },
  {
    title: "Type a question",
    type: "single-choice",
  },
  {
    title: "Type a question",
    type: "yes-or-no",
  },
  {
    title: "Type a question",
    type: "multiple-choice",
  },
  {
    title: "Type a question",
    type: "yes-or-no",
  },
  {
    title: "Type a question",
    type: "multiple-choice",
  },
  {
    title: "Type a question",
    type: "multiple-choice",
  },
  {
    title: "Type a question",
    type: "yes-or-no",
  },
  {
    title: "Type a question",
    type: "multiple-choice",
  },
];

const BuildSection = () => {
  const [selected, setSelected] = useState<number>(0);

  return (
    <div className="flex h-full flex-col">
      <header className="mb-2 p-4">
        <h3 className="mb-3">New Survey</h3>
        <button className="btn bg-orange-400">Add your first question</button>
      </header>
      <section className="grow overflow-y-auto scroll-smooth border-t border-slate-300">
        <ul>
          {questions.map((question, index) => {
            const isSelected = selected === index;
            return (
              <li
                key={index}
                className={classNames(
                  "flex p-4 hover:cursor-pointer",
                  isSelected
                    ? "border-y border-slate-300 bg-white"
                    : "hover:bg-slate-100"
                )}
                onClick={() => setSelected(index)}
              >
                {isSelected && (
                  <div className="mr-3 flex items-center justify-items-center font-bold">
                    <span className="h-6 w-4 bg-lime-100"></span>
                  </div>
                )}
                <div>
                  <h3>{question.title}</h3>
                  <p>{question.type}</p>
                </div>
              </li>
            );
          })}
        </ul>
      </section>
    </div>
  );
};

export default BuildSection;
