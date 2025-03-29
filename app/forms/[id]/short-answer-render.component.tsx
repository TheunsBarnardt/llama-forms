import { Label } from "@/components/ui/label";
import { FormQuestion } from "@/app/types/form-question.type";
import { Input } from "@/components/ui/input";

export default function ShortAnswerRender(question: FormQuestion) {
  return (
    <>
      <Label>
        {question.name}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </Label>

      <Input placeholder="Your answer" />
    </>
  );
}
