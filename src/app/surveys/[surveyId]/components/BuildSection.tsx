import { Fragment, useContext } from 'react';
import { Popover, Transition } from '@headlessui/react';

import { QuestionType } from '@/types';
import { QuestionDefinitionMap } from '@/utils/constants';

import QuestionList from './QuestionList';
import { QuestionsActionsContext, QuestionsContext } from './QuestionsProvider';

const BuildSection = () => {
  const { questions } = useContext(QuestionsContext);
  const { addQuestion } = useContext(QuestionsActionsContext);

  const onSelectQuestion = (questionType: QuestionType) => {
    addQuestion(QuestionDefinitionMap[questionType].buildQuestion());
  };

  return (
    <div className="flex h-full flex-col">
      <header className="mb-2 p-4">
        <h2 className="mb-3">New Survey</h2>
        <Popover>
          {({ close }) => (
            <>
              <Popover.Button className="btn bg-orange-400">
                {questions.length === 0
                  ? 'Add your first question'
                  : 'Add new question'}
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
                <Popover.Panel className="absolute z-10 mt-2 flex max-h-80 w-80 flex-col divide-y divide-slate-200 rounded-sm bg-white drop-shadow-md">
                  <header className="rounded-t-sm p-2">
                    <input
                      type="text"
                      autoFocus={true}
                      placeholder="Search question type..."
                      className="w-full p-1 text-xs outline-none"
                    />
                  </header>
                  <div className="h-full overflow-auto rounded-b-sm">
                    <ul className="m-3 flex flex-col gap-3">
                      {Object.values(QuestionDefinitionMap).map(
                        (definition) => (
                          <li
                            key={definition.type}
                            onClick={() => {
                              onSelectQuestion(definition.type);
                              close();
                            }}
                            className="mt-1rounded-sm flex gap-2  p-2 hover:cursor-pointer hover:bg-slate-100"
                          >
                            <div className="mt-1 grid h-6 w-6 place-content-center rounded-sm bg-purple-400 text-white">
                              <definition.Icon size={14} />
                            </div>
                            <div>
                              <h3 className="mt-0 text-sm">
                                {definition.name}
                              </h3>
                              <span className="text-xs">
                                {definition.description}
                              </span>
                            </div>
                          </li>
                        ),
                      )}
                    </ul>
                  </div>
                </Popover.Panel>
              </Transition>
            </>
          )}
        </Popover>
      </header>
      <QuestionList />
    </div>
  );
};

export default BuildSection;
