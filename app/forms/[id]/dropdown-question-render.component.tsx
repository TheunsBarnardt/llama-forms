import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Field } from "../../types/field.type";


// Dropdown Render Component (For Form Submission)
export function DropdownQuestionRender(field: Field) {
  const {
    setValue,
    formState: { errors },
  } = useFormContext();

  return (
    <div className="space-y-2">
      <Label className="font-medium">
        {field.name} {field.required && <span className="text-red-500">*</span>}
      </Label>

      <Select onValueChange={(value) => setValue(field.id.toString(), value)}>
        <SelectTrigger className="w-full">
          <SelectValue placeholder="Select an option" />
        </SelectTrigger>
        <SelectContent>
          {field.options?.map((option, index) => (
            <SelectItem key={index} value={option}>
              {option}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      {errors[field.id] && (
        <p className="text-red-500 text-sm">{errors[field.id]?.message?.toString()}</p>
      )}
    </div>
  );
}
