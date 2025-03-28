/* eslint-disable @typescript-eslint/no-explicit-any */
import { CheckboxQuestionRender } from "./checkbox-question-render.component";
import { DropdownQuestionRender } from "./dropdown-question-render.component";
import { MultipleChoiceQuestionRender } from "./multiple-choice-question-render.component";
import { ParagraphRender } from "./paragraph-render.component";
import { Question } from "../../types/question.type";
import { ShortAnswerRender } from "./short-answer-render.component";

const questionComponents: { [key: string]: React.ComponentType<any> } = {
  short_answer: ShortAnswerRender,
  paragraph: ParagraphRender,
  multiple_choice: MultipleChoiceQuestionRender,
  checkboxes: CheckboxQuestionRender,
  dropdown: DropdownQuestionRender,
};

export default function QuestionRender(question: Question) {
  return (
    <div>
      <h2>{question.title}</h2>
      <div className="fields">
        {question.fields.map((field) => {
          const FieldComponent = questionComponents[field.type];
          return (
            <div key={field.id} className="field">
              <label>{field.name}</label>
              <FieldComponent required={field.required} />
            </div>
          );
        })}
      </div>
    </div>
  );
}
