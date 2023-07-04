'use client';

import { useTransition } from 'react';
import { createSurveyAction } from '@/lib/actions';

export const CreateSurveyButton = () => {
  const [isPending, startTransition] = useTransition();

  return (
    <button
      disabled={isPending}
      className="btn bg-purple-500"
      onClick={() => startTransition(() => createSurveyAction())}
    >
      {isPending ? 'Creating...' : 'Create Survey'}
    </button>
  );
};
