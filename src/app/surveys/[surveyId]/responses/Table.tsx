'use client';

import 'react-data-grid/lib/styles.css';

import { useMemo } from 'react';
import DataGrid, { Column as TColumn } from 'react-data-grid';

import { Answer, Question, QuestionType, SurveyResponse } from '@/types';
import { QuestionDefinitionMap } from '@/utils/constants';

export const formatAnswerToString = <T extends QuestionType>(
  answer: Answer<T>,
) => QuestionDefinitionMap[answer.type].formatAnswerToString(answer.value);

const getColumns = (
  questions: Question[],
): TColumn<SurveyResponse['answers']>[] =>
  questions.map((question) => ({
    key: question.uuid,
    name: question.title,
    renderCell: ({ column, row }) => (
      <>{formatAnswerToString(row[column.key])}</>
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
