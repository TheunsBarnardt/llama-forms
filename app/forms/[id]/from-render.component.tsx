"use client"
/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxQuestionRender } from "./checkbox-question-render.component";
import { DropdownQuestionRender } from "./dropdown-question-render.component";
import { MultipleChoiceQuestionRender } from "./multiple-choice-question-render.component";
import { ParagraphRender } from "./paragraph-render.component";
import { Form } from "../../types/form.type";
import { ShortAnswerRender } from "./short-answer-render.component";
import { FormProvider, useForm } from "react-hook-form";

const questionComponents: { [key: string]: React.ComponentType<any> } = {
  short_answer: ShortAnswerRender,
  paragraph: ParagraphRender,
  multiple_choice: MultipleChoiceQuestionRender,
  checkboxes: CheckboxQuestionRender,
  dropdown: DropdownQuestionRender,
};

export default function QuestionRender(form: Form) {
  const methods = useForm();
  const onSubmit = (data: any) => {
    console.log("Form submitted:", data);
  };

  return (
    <FormProvider {...methods}>  
      <form onSubmit={methods.handleSubmit(onSubmit)}>

      <h2>{form.title}</h2>
      <div className="fields">
        {form.questions.map((question) => {
          const QuestionComponent = questionComponents[question.type];
          return (
            <div key={question.id} className="question">
              <label>{question.name}</label>
              <QuestionComponent required={question.required} />
            </div>
          );
        })}
      </div>
      </form>
      </FormProvider>
  );
}
