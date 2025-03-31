import { Form, Question } from "@/prisma/interfaces";
import { LucideIcon } from "lucide-react";
import React from "react";

export interface IAddons {
  render: ({ question, form }: { form: Form; question: Question }) => React.JSX.Element;
  design: ({ question }: { question?: Question }) => React.JSX.Element;
  icon: LucideIcon; // Add the icon property
  renderDropdown: ({ question }: { question: Question }) => React.JSX.Element; // Add the renderDropdown property
}