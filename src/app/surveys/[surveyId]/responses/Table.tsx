'use client';

import 'react-data-grid/lib/styles.css';

import { useMemo } from 'react';
import DataGrid, { Column } from 'react-data-grid';

import { Question, SurveyResponse } from '@/types';
import { QuestionDefinitionMap } from '@/utils/constants';

const getColumns = (
  questions: Question[],
): Column<SurveyResponse['answers']>[] =>
  questions.map((question) => ({
    key: question.uuid,
    name: question.title,
    renderCell({ column, row }) {
      return (
        <>
          {QuestionDefinitionMap[question.type].formatAnswerToString(
            row[column.key],
          )}
        </>
      );
    },
  }));

type Props = {
  questions: Question[];
  answers: SurveyResponse['answers'][];
};

export const Table = ({ questions, answers }: Props) => {
  const columns = useMemo(() => getColumns(questions), [questions]);

  return <DataGrid columns={columns} rows={answers} className="fill-grid" />;
};
