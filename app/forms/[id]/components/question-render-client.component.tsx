import { Form } from "@/prisma/interfaces";
import QuestionRender from "./from-render.component";

export default function QuestionRenderClient({ form }: { form: Form | null }) {
  const id = form?.id ?? 0; // Replace with appropriate logic to derive `id`
  return <QuestionRender id={id} />;
}
