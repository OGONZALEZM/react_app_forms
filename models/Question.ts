import { Option } from "./Option";

export enum QuestionType {
    SHORT_ANSWER = 'short-answer',
    LONG_ANSWER = 'long-answer',
    NUMBER = 'number',
    RADIO = 'radio',
}

export interface Question {
    questionId: number; 
    text: string;
    type: QuestionType; 
    options?: Option[];
    required: boolean;
}