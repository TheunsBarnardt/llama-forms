import { Form } from "@/prisma/interfaces";
import QuestionRender from "./from-render.component";


export default function QuestionRenderClient({ form }: { form: Form | null }) {
  const safeForm = form ?? { title: "Untitled Form", questions: [] } as unknown as Form;

  return <QuestionRender form={safeForm}  />;
}
