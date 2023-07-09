'use client';

import { useMemo } from 'react';
import DataGrid, { Column } from 'react-data-grid';
import { Question, SurveyResponse } from '@/types';

import 'react-data-grid/lib/styles.css';

const getColumns = (
  questions: Question[],
): Column<SurveyResponse['answers']>[] =>
  questions.map((question) => ({
    key: question.uuid,
    name: question.title,
  }));

type Props = {
  questions: Question[];
  answers: SurveyResponse['answers'][];
};

export const Table = ({ questions, answers }: Props) => {
  const columns = useMemo(() => getColumns(questions), [questions]);

  return <DataGrid columns={columns} rows={answers} className="fill-grid" />;
};
