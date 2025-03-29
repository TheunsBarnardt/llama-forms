import { FormQuestion } from "@/app/types/form-question.type";
import { Input } from "@/components/ui/input";
import { FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function ShortAnswerRender({ question, form }: { question: FormQuestion; form: any }) {
  return (

    <FormField
          control={form.control}
          name={question.id.toString()}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{question.name}</FormLabel>
              <FormControl>
                <Input                
                type=""
                {...field} />
              </FormControl>
              <FormDescription>This is your public display name.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        
  );
}
