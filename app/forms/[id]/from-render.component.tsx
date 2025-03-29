/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import { Form } from "../../types/form.type";
import ParagraphRender from "./paragraph-render.component";
import ShortAnswerRender from "./short-answer-render.component";
import { useForm } from "react-hook-form";
import { Form as UIForm } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
export default function QuestionRender({ form }: { form: Form }) {
  const formdata = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 bg-background rounded-lg p-6  w-6xl mx-auto">
      <h1>{form.title}</h1>
      <Separator orientation="horizontal" />
      <UIForm {...formdata}>
        <form onSubmit={formdata.handleSubmit(onSubmit)}>
          {form.questions.map((question) => {
            const questionComponents: Record<string, React.ComponentType<any>> = {
              short_answer: ShortAnswerRender,
              paragraph: ParagraphRender,
            };

            const QuestionComponent = questionComponents[question.type];
            return (
              <div key={question.id}>
                <QuestionComponent question={question} form={formdata} />
              </div>
            );
          })}
          <Button type="submit">Submit</Button>
        </form>
      </UIForm>
    </div>
  );
}

