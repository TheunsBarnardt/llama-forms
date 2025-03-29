import { Textarea } from "@/components/ui/textarea";
import { FormQuestion } from "../../types/form-question.type";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ParagraphRender({ question, form }: { question: FormQuestion; form: any }) {
  return (
	<FormField
	control={form.control}
	name={question.id.toString()}
	render={({ field }) => (
	  <FormItem>
		<FormLabel>{question.name}</FormLabel>
		<FormControl>
		  <Textarea		
			className="resize-none"
			{...field}
		  />
		</FormControl>
		<FormDescription>You can @mention other users and organizations.</FormDescription>
		<FormMessage />
	  </FormItem>
	)}
  />
  );
}
