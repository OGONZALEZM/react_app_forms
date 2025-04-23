import { createSelector, createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Question, QuestionType } from "../models/Question";
import { Form } from "../models/Form";
import { Answer } from "../models/Answer";

interface FormState {
    forms: Form[];
    isSubmitted: boolean;
}

const initialState: FormState = {
    forms: [
      {
        formId: "124236587659567",
        name: "Register Form",
        questions: [
          {
            questionId: 1000,
            text: "Name",
            type: QuestionType.SHORT_ANSWER,
            required: true
          },
          {
            questionId: 1001,
            text: "age",
            type: QuestionType.NUMBER,
            required: true
          },
          {
            questionId: 1002,
            text: "Would you like to receive our newsletter?",
            type: QuestionType.RADIO,
            options: [
              {
                optionId: 1,
                questionId: 1001,
                value: "Yes"
              },
              {
                optionId: 2,
                questionId: 1001,
                value: "No"
              }
            ],
            required: true
          },
          {
            questionId: 1003,
            text: "Where did you hear about us?",
            type: QuestionType.LONG_ANSWER,
            required: false
          },
        ]
      }
    ],
    isSubmitted: false,
};

const formSlice = createSlice({
    name: 'form',
    initialState,
    reducers: {
      addForm: (state, action: PayloadAction<Form>) => {
          state.forms.push(action.payload);
      },
      updateForm: (state, action: PayloadAction<{formId: string, answers: Answer[]}>) => {
        const { formId, answers } = action.payload;
        const from = state.forms.find((p) => p.formId === formId);
        if (from) {
          from.answers = answers;
        }
      },
    },
  });
  
export const selectAllForms = (state: { form: FormState }) => state.form.forms;

export const selectFormById = (formId: string) =>
  createSelector([selectAllForms], (forms) =>
    forms.find((form) => form.formId === formId)
  );

export const { addForm, updateForm } = formSlice.actions;
export default formSlice.reducer;