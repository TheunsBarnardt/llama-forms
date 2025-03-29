/* eslint-disable @typescript-eslint/no-explicit-any */
import { ShortAnswerRender } from "./short-answer-render.component";
import { Form } from "@/app/types/form.type";
import { UseFormReturn } from "react-hook-form";

interface QuestionRenderProps{
    form: Form,
    methods: UseFormReturn<any>,
    onSubmit: (data: any) => void
}

const questionComponents: { [key: string]: React.ComponentType<any> } = {
    short_answer: ShortAnswerRender,
};

export default function QuestionRender({ form, methods, onSubmit }: QuestionRenderProps) {

    return (
        <form onSubmit={methods.handleSubmit(onSubmit)}>
            <h2>{form.title}</h2>
            <div className="fields">
                {form.questions.map((question) => {
                    const QuestionComponent = questionComponents[question.type];
                    return (
                        <div key={question.id} className="question">
                            <label>{question.name}</label>
                            <QuestionComponent {...question} />
                        </div>
                    );
                })}
            </div>
        </form>
    );
}