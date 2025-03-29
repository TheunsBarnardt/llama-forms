import { FormGridItem } from './form-grid-item.component';
import rawData from './../../_resources/formsdata.json';
import { Form } from '../types/form.type';

const data: Form[] = rawData.map((item) => ({
  ...item,
  questions: item.questions.map((question) => ({
    ...question,
    type: question.type as Form['questions'][number]['type'], // Cast type to match the union
  })),
  responses: [], // Add default empty array for responses
}));


export default function Page() {
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      {data.map((form: Form) => {		
        return <FormGridItem key={form.id} {...form} />;
      })}
    </div>
  );
}