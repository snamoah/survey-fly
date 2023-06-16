type QuestionType =
  | "multiple-choice"
  | "single-choice"
  | "yes-or-no"
  | "address"
  | "star-rating"
  | "signature"
  | "input-field";

type Question = {
  uuid: string;
  title: string;
  type: QuestionType;
  options?: string[];
};
