import { Form, Question } from "@/prisma/interfaces";
import React from "react";

export interface IAddons {
  render: ({ question, form }: { form: Form; question: Question }) => React.JSX.Element;
  design: ({ question }: { question?: Question }) => React.JSX.Element;
  options: ({ question }: { question: Question }) => React.JSX.Element; 
  menu?: React.FC; 
}