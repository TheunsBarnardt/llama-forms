import { FormGridItem } from './form-grid-item.component';
import rawData from './../../_resources/formsdata.json';

const data: Question[] = rawData.map((item) => ({
  ...item,
  fields: item.fields.map((field) => ({
    ...field,
    type: field.type as Question['fields'][number]['type'], // Cast type to match the union
  })),
}));
import { Question } from '../types/question.type';

export default function Page() {
  return (
    <div className="inline-grid grid-cols-3 gap-4">
      {data.map((form: Question) => {
        return <FormGridItem key={form.id} {...form} />;
      })}
    </div>
  );
}