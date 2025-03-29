"use client";

import { FormProvider, useForm } from "react-hook-form";
import QuestionRender from "./from-render.component";
import { Form } from "@/app/types/form.type";

export default function QuestionRenderClient({ form }: { form: Form }) {
    const methods = useForm(); // Ensure methods is properly initialized

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const onSubmit = (data: any) => {
        console.log("Form submitted:", data);
    };

    return (
        <FormProvider {...methods}>
            <QuestionRender form={form} methods={methods} onSubmit={onSubmit} />
        </FormProvider>
    );
}
