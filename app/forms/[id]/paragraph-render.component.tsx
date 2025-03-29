import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { FormQuestion } from "../../types/form-question.type";

export default function ParagraphRender(question: FormQuestion) {
  return (
    <div className="flex flex-col gap-2">
      <Label htmlFor={question.id.toString()} className="font-medium">
        {question.name}{" "}
        {question.required && <span className="text-red-500">*</span>}
      </Label>
      <Textarea id={question.id.toString()} placeholder="Your answer" />
    </div>
  );
}
