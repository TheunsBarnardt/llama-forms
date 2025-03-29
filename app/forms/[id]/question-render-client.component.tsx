import QuestionRender from "./question-render.component";
import { Form } from "@/app/types/form.type";

export default function QuestionRenderClient({ form }: { form: Form | null }) {
  const safeForm = form ?? { title: "Untitled Form", questions: [] };

  return <QuestionRender form={safeForm} methods={methods} />;
}
