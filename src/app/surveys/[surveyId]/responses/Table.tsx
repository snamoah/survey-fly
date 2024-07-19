'use client';

import 'react-data-grid/lib/styles.css';

import { useMemo } from 'react';
import DataGrid, { Column as TColumn } from 'react-data-grid';

import { Question, SurveyResponse } from '@/types';
import { QuestionDefinitionMap } from '@/utils/constants';

const getColumns = (
  questions: Question[],
): TColumn<SurveyResponse['answers']>[] =>
  questions.map((question) => ({
    key: question.uuid,
    name: question.title,
    renderCell: ({ column, row }) => (
      <>
        {/* Still unable to fix the types for this so resorting to any now*/}
        {(QuestionDefinitionMap[question.type].formatAnswerToString as any)(
          row[column.key] as any,
        )}
      </>
    ),
  }));

type Props = {
  questions: Question[];
  answers: SurveyResponse['answers'][];
};

export const Table = ({ questions, answers }: Props) => {
  const columns = useMemo(() => getColumns(questions), [questions]);

  return <DataGrid columns={columns} rows={answers} className="fill-grid" />;
};
