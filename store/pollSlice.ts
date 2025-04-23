import { createSelector, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Poll } from '../models/Poll';

interface PollState {
    polls: Poll[];
}

const initialState: PollState = {
    polls: [
        {
            pollId: "12345678",
            question: "What's your favorite Animal?",
            options: ["Duck", "Dog", "Cat", "Lion"]
        }
    ],
};

const pollSlice = createSlice({
    name: 'poll',
    initialState,
    reducers: {
    addPoll(state, action: PayloadAction<Poll>) {
        state.polls.push(action.payload);
    },
    updateAnswer(state, action: PayloadAction<{ pollId: string; answer: string }>) {
        const { pollId, answer } = action.payload;
        const poll = state.polls.find((p) => p.pollId === pollId);
        if (poll) {
          poll.answer = answer;
        }
    },
  },
});

export const selectAllPolls = (state: { poll: PollState }) => state.poll.polls;

export const selectPollById = (pollId: string) =>
    createSelector([selectAllPolls], (polls) =>
      polls.find((poll) => poll.pollId === pollId)
    );

export const { addPoll, updateAnswer } = pollSlice.actions;
export default pollSlice.reducer;