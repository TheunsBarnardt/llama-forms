import { useFormContext } from "react-hook-form";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useMemo } from "react";
import { FormQuestion } from "../../types/form-question.type";

export function ParagraphRender(question:FormQuestion) {
	const {
	  register,
	  formState: { errors },
	} = useFormContext();
  
	const validationSchema = useMemo(() => {
		let schema = z.string();
	
		if (question.required) {
		  schema = schema.min(1, "This field is required");
		}
	
		if (question.validation) {
		  try {
			const regex = new RegExp(question.validation);
			schema = schema.refine((value) => regex.test(value), {
				message: "Invalid format",
			}) as unknown as z.ZodString;
		  } catch (error) {
			console.error("Invalid regex pattern", error);
		  }
		}
	
		return schema;
	}, [question.required, question.validation]);

	return (
	  <div className="flex flex-col gap-2">
		<Label htmlFor={question.id.toString()} className="font-medium">
		  {question.name} {question.required && <span className="text-red-500">*</span>}
		</Label>
		<Textarea
		  id={question.id.toString()}
		  placeholder="Your answer"
		  {...register(question.id.toString(), { required: question.required, validate: (value) => {
			const parsed = validationSchema.safeParse(value);
			return parsed.success ? true : parsed.error.errors[0]?.message;
		  } })}
		/>
		{errors[question.id] && <p className="text-red-500 text-sm">{errors[question.id]?.message?.toString()}</p>}
	  </div>
	);
}
