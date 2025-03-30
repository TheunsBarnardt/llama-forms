/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { Separator } from "@/components/ui/separator";
import ParagraphRender from "./paragraph-render.component";
import ShortAnswerRender from "./short-answer-render.component";
import { useForm } from "react-hook-form";
import { Form as UIForm } from "@/components/ui/form";
import { Button } from "@/components/ui/button";
import { Form, Question } from "@/prisma/interfaces";
import { useEffect, useState } from "react";
import { getForm } from "../actions";
export default function QuestionRender({ id }: { id: number }) {

  const [form, setForm] = useState<Form | undefined>(undefined);
  const [questions, setQuestions] = useState<Question[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      const response = await getForm(id);
      setForm(response);
      if(response) {
        setQuestions(response.questions || []);
      }
    };
    fetchData();
  }, [id]);



  const formdata = useForm();

  function onSubmit(values: any) {
    console.log(values);
  }

  return (
    <div className="flex flex-col gap-4 bg-background rounded-lg p-6  w-6xl mx-auto">
      <h1>{form?.title}</h1>
      <Separator orientation="horizontal" />
      <UIForm {...formdata}>
        <form onSubmit={formdata.handleSubmit(onSubmit)}>
          {(questions ?? []).map((question) => {
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

