import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Question } from "@/prisma/interfaces";




// Multiple Choice Render Component (For Form Submission)
export function MultipleChoiceQuestionRender(question:Question) {
  const {
    register,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="font-medium">
        {question.name} {question.required && <span className="text-red-500">*</span>}
      </Label>

      <RadioGroup className="space-y-1">
        {question.options?.map((option, index) => (
          <div key={index} className="flex items-center gap-2">
            <RadioGroupItem id={`${question.id}-${index}`} value={option.value} {...register(question.id.toString())} />
            <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
              {option.value}
            </Label>
          </div>
        ))}
      </RadioGroup>

      {errors[question.id] && (
        <p className="text-red-500 text-sm">{errors[question.id]?.message?.toString()}</p>
      )}
    </div>
  );
}
