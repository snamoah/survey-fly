import { Fragment, useContext, useRef, useState } from "react";
import { Popover, Transition } from "@headlessui/react";

import { classNames } from "@/utils";
import { QuestionsActionsContext, QuestionsContext } from "./QuestionsProvider";
import Link from "next/link";

// const questions: Question[] = [
//   {
//     title: "Type a question",
//     type: "single-choice",
//   },
//   {
//     title: "Type a question",
//     type: "yes-or-no",
//   },
//   {
//     title: "Type a question",
//     type: "multiple-choice",
//   },
//   {
//     title: "Type a question",
//     type: "single-choice",
//   },
//   {
//     title: "Type a question",
//     type: "yes-or-no",
//   },
//   {
//     title: "Type a question",
//     type: "multiple-choice",
//   },
//   {
//     title: "Type a question",
//     type: "yes-or-no",
//   },
//   {
//     title: "Type a question",
//     type: "multiple-choice",
//   },
//   {
//     title: "Type a question",
//     type: "multiple-choice",
//   },
//   {
//     title: "Type a question",
//     type: "yes-or-no",
//   },
//   {
//     title: "Type a question",
//     type: "multiple-choice",
//   },
// ];

type QuestionDefinition = {
  id: QuestionType;
  name: string;
  description: string;
};

const defintions: QuestionDefinition[] = [
  {
    id: "multiple-choice",
    name: "Multi Choice",
    description: "Create a multiple choice question",
  },
  {
    id: "single-choice",
    name: "Single Choice",
    description: "Create a single choice question",
  },
  {
    id: "address",
    name: "Address",
    description: "Create a yes or no question",
  },
  {
    id: "signature",
    name: "Signature",
    description: "Create a yes or no question",
  },
  {
    id: "yes-or-no",
    name: "Yes or No",
    description: "Create a yes or no question",
  },
  {
    id: "star-rating",
    name: "Star Rating",
    description: "Create a yes or no question",
  },
  {
    id: "input-field",
    name: "Short Text",
    description: "Create a yes or no question",
  },
];

const BuildSection = () => {
  const [selected, setSelected] = useState<number>(0);
  const questions = useContext(QuestionsContext);
  const { addQuestion } = useContext(QuestionsActionsContext);

  const onSelectQuestion = (definition: QuestionDefinition) =>
    addQuestion({
      title: `${definition.name} question`,
      type: definition.id,
    });

  return (
    <div className="flex h-full flex-col">
      <header className="mb-2 p-4">
        <h3 className="mb-3">New Survey</h3>
        <Popover>
          {({ close }) => (
            <>
              <Popover.Button className="btn bg-orange-400">
                {questions.length === 0
                  ? "Add your first question"
                  : "Add new question"}
              </Popover.Button>
              <Transition
                as={Fragment}
                enter="transition ease-out duration-200"
                enterFrom="opacity-0 translate-y-1"
                enterTo="opacity-100 translate-y-0"
                leave="transition ease-in duration-150"
                leaveFrom="opacity-100 translate-y-0"
                leaveTo="opacity-0 translate-y-1"
              >
                <Popover.Panel className="absolute z-10 mt-2 flex h-80 w-80 flex-col divide-y divide-slate-200 rounded-sm bg-white drop-shadow-md">
                  <header className="rounded-t-sm p-2">
                    <input
                      type="text"
                      placeholder="Search question type..."
                      className="w-full p-1 text-xs outline-none"
                    />
                  </header>
                  <div className="h-full overflow-auto rounded-b-sm">
                    <ul className="m-3 flex flex-col gap-3">
                      {defintions.map((definition) => (
                        <li
                          key={definition.id}
                          onClick={() => {
                            onSelectQuestion(definition);
                            close();
                          }}
                          className="mt-1rounded-sm p-2 hover:cursor-pointer hover:bg-slate-100"
                        >
                          <Link
                            className="flex gap-2 "
                            href={window.location.href}
                          >
                            <div className="h-6 w-6 rounded-sm bg-purple-500"></div>
                            <div>
                              <h3 className="text-sm">{definition.name}</h3>
                              <span className="text-xs">
                                {definition.description}
                              </span>
                            </div>
                          </Link>
                        </li>
                      ))}
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
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
