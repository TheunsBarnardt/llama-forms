import { Field } from "./field.type";

export interface Question {
    id: number;
    thumbnail : string;
    title: string;
    createDate :string;
    fields: Field[];
}