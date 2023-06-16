type QuestionType =
  | "multiple-choice"
  | "single-choice"
  | "yes-or-no"
  | "address"
  | "star-rating"
  | "signature"
  | "input-field";

type Question = {
  title: string;
  type: QuestionType;
};
