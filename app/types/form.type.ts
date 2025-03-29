import { FormQuestion } from "./form-question.type";
import { FormResponse } from "./form-response.type";

export interface Form {
    id: number;
    thumbnail : string;
    title: string;
    createDate :string;
    questions: FormQuestion[];
    responses: FormResponse[];
}