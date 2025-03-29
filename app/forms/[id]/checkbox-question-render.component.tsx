import { useFormContext } from "react-hook-form";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { FormQuestion } from "@/app/types/form-question.type";


export function CheckboxQuestionRender(question: FormQuestion) {
	const {
	  register,
	  formState: { errors },
	} = useFormContext();
  
	return (
	  <div className="space-y-2">
		<Label className="font-medium">
		  {question.name} {question.required && <span className="text-red-500">*</span>}
		</Label>
  
		<div className="space-y-1">
		  {question.options?.map((option, index) => (
			<div key={index} className="flex items-center gap-2">
			  <Checkbox id={`${question.id}-${index}`} {...register(question.id.toString())} value={String(option)} />
			  <Label htmlFor={`${question.id}-${index}`} className="cursor-pointer">
				{option}
			  </Label>
			</div>
		  ))}
		</div>
  
		{errors[question.id] && (
		  <p className="text-red-500 text-sm">{errors[question.id]?.message?.toString()}</p>
		)}
	  </div>
	);
  }
