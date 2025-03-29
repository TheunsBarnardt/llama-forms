/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { Form } from "../../types/form.type";
import  ParagraphRender  from "./paragraph-render.component";
import ShortAnswerRender from "./short-answer-render.component";


export default function QuestionRender(form: Form) {
  return (
    <div className="flex flex-col gap-4 bg-background rounded-lg p-6  w-6xl mx-auto">
    <h1>{form.title}</h1>
    <Separator orientation="horizontal" />

  
    {form.questions.map((question) => {
      const questionComponents: Record<string, React.ComponentType<any>> = {
        short_answer: ShortAnswerRender,
        paragraph: ParagraphRender      
      };

      const QuestionComponent = questionComponents[question.type];
      return (
        <div key={question.id} >
              <QuestionComponent {...question} />
          </div>
      );
    })}
    </div>
  );
}
