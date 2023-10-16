'use client';
import { useContext } from 'react';
import { useSearchParams } from 'next/navigation';

import { ToolbarAction } from '@/types';
import { Empty } from '@/ui/illustrations';

import { QuestionsContext } from '../components/QuestionsProvider';
import TriggerConfiguration from './components/TriggerConfiguration';
import QuestionConfiguration from './components/QuestionConfiguration';

const SectionComponent: Record<ToolbarAction, () => JSX.Element> = {
  build: QuestionConfiguration,
  design: QuestionConfiguration,
  trigger: TriggerConfiguration,
};

const Page = () => {
  const searchParams = useSearchParams();
  const { selectedQuestion } = useContext(QuestionsContext);
  const currentToolbarTab = (searchParams.get('t') ?? 'build') as ToolbarAction;

  if (!selectedQuestion) {
    return (
      <article className="grid h-full place-items-center">
        <section className="flex flex-col items-center gap-1">
          <div className="p-15 flex-wrap rounded-full bg-cyan-50">
            <Empty />
          </div>

          <h1 className="mt-5 text-center">Start by creating a new question</h1>
          <p className="text-center text-sm">
            Click "Add your first question" to create your first question
          </p>
        </section>
      </article>
    );
  }

  const Component = SectionComponent[currentToolbarTab];
  return <Component />;
};

export default Page;
