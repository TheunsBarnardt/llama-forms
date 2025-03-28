import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { Field } from "../../types/field.type";

// Multiple Choice Render Component (For Form Submission)

// Multiple Choice Render Component (For Form Submission)
export function CheckboxQuestionRender(field: Field) {
	const {
	  register,
	  formState: { errors },
	} = useFormContext();
  
	return (
	  <div className="space-y-2">
		<Label className="font-medium">
		  {field.name} {field.required && <span className="text-red-500">*</span>}
		</Label>
  
		<div className="space-y-1">
		  {field.options?.map((option, index) => (
			<div key={index} className="flex items-center gap-2">
			  <Checkbox id={`${field.id}-${index}`} {...register(field.id.toString())} value={String(option)} />
			  <Label htmlFor={`${field.id}-${index}`} className="cursor-pointer">
				{option}
			  </Label>
			</div>
		  ))}
		</div>
  
		{errors[field.id] && (
		  <p className="text-red-500 text-sm">{errors[field.id]?.message?.toString()}</p>
		)}
	  </div>
	);
  }
