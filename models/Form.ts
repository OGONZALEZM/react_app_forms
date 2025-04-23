import { Question } from "./Question";

export interface Form {
    formId: string;
    name: string;
    questions: Question[];
    answers?: Answer[];
}