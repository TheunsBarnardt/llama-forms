export interface Field {
    id: number;
    name: string;
    type:
    | "short_answer"
    | "paragraph"
    | "multiple_choice"
    | "checkboxes"
    | "dropdown"
    | "file_upload"
    | "linear_scale"
    | "rating"
    | "multiple_choice_grid"
    | "checkbox_grid"
    | "date"
    | "time";
    options?: string[];
    required: boolean;
    validation?: string;
  }