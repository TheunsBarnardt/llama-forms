import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { FormQuestion } from "@/app/types/form-question.type";



// Dropdown Render Component (For Form Submission)
export function DropdownQuestionRender(question: FormQuestion) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="font-medium">
        {question.name} {question.required && <span className="text-red-500">*</span>}
      </Label>

      <Select onValueChange={(value) => setValue(question.id.toString(), value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {question.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors[question.id] && (
        <p className="text-red-500 text-sm">{errors[question.id]?.message?.toString()}</p>
      )}
    </div>
  );
}
