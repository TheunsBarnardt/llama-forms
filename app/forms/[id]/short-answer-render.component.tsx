import { useFormContext } from "react-hook-form";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { z } from "zod";
import { useMemo } from "react";
import { Field } from "../../types/field.type";

export function ShortAnswerRender(field:Field) {
	const {
	  register,
	  formState: { errors },
	} = useFormContext();
  
	const validationSchema = useMemo(() => {
		let schema = z.string();
	
		if (field.required) {
		  schema = schema.min(1, "This field is required");
		}
	
		if (field.validation) {
		  try {
			const regex = new RegExp(field.validation);
			schema = schema.refine((value) => regex.test(value), {
				message: "Invalid format",
			}) as unknown as z.ZodString;
		  } catch (error) {
			console.error("Invalid regex pattern", error);
		  }
		}
	
		return schema;
	}, [field.required, field.validation]);

	return (
	  <div className="flex flex-col gap-2">
		<Label htmlFor={field.id.toString()} className="font-medium">
		  {field.name} {field.required && <span className="text-red-500">*</span>}
		</Label>
		<Input
		  id={field.id.toString()}
		  placeholder="Your answer"
		  {...register(field.id.toString(), { required: field.required, validate: (value) => {
			const parsed = validationSchema.safeParse(value);
			return parsed.success ? true : parsed.error.errors[0]?.message;
		  } })}
		/>
		{errors[field.id] && <p className="text-red-500 text-sm">{errors[field.id]?.message?.toString()}</p>}
	  </div>
	);
}
