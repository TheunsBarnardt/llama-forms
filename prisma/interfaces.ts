// This file was auto-generated by prisma-generator-typescript-interfaces

export type QuestionType = "short_answer" | "paragraph" | "multiple_choice" | "checkboxes" | "dropdown" | "file_upload" | "linear_scale" | "rating" | "multiple_choice_grid" | "checkbox_grid" | "date" | "time";

export interface User {
  id: string;
  email: string;
  name: string | null;
  image: string | null;
}

export interface Form {
  id: number;
  thumbnail: string;
  title: string;
  description: string | null;
  createDate: Date;
  changeDate: Date;
  questions?: Question[];
  responses?: Response[];
}

export interface Question {
  id: number;
  name: string;
  description: string | null;
  type: QuestionType;
  options: JsonValue | null;
  required: boolean;
  validation: string | null;
  message: JsonValue | null;
  createDate: Date;
  changeDate: Date;
  formId: number;
  form?: Form;
}

export interface Response {
  id: number;
  name: string;
  value: JsonValue;
  formId: number;
  form?: Form;
}

type JsonValue = string | number | boolean | { [key in string]?: JsonValue } | Array<JsonValue> | null;
