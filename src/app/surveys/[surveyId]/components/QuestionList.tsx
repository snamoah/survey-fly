import { Question } from '@/types';
import { classNames } from '@/utils';
import { VerticalDots } from '@/ui/icons';
import { useContext } from 'react';
import { QuestionsContext, QuestionsActionsContext } from './QuestionsProvider';

type Props = {
  questions: Question[];
  selectedQuestionId?: string;
  onSelectQuestion: (id: Question['uuid']) => void;
};

const QuestionList = () => {
  const { selectQuestion } = useContext(QuestionsActionsContext);
  const { questions, selectedQuestion } = useContext(QuestionsContext);

  return (
    <section className="w-full grow overflow-y-auto overflow-x-hidden scroll-smooth border-t border-slate-300">
      <ul>
        {questions.map((question, index) => {
          const isSelected = selectedQuestion?.uuid === question.uuid;
          return (
            <li
              key={index}
              className={classNames(
                'flex p-4 hover:cursor-pointer',
                isSelected
                  ? 'border-y border-slate-300 bg-white'
                  : 'hover:bg-slate-100',
              )}
              onClick={() => selectQuestion(question.uuid)}
            >
              {isSelected && (
                <div className="mr-3 flex items-center justify-items-center font-bold">
                  <VerticalDots size={18} className="text-slate-300" />
                </div>
              )}
              <div className="inline-block w-52">
                <h3 className="overflow-hidden text-ellipsis whitespace-nowrap text-base">
                  {question.title || 'Untitled Question'}
                </h3>
                <p className="text-sm">{question.type}</p>
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default QuestionList;
