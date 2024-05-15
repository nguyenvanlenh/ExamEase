import { createSlice } from '@reduxjs/toolkit';

const listQuestionSlice = createSlice({
    name: 'listQuestion',
    initialState: [],
    reducers: {
        addListQuestion(state, action) {
            action.payload.map((question, index) => {
                state.push({
                    id: index+1,
                    idReal: question.id,
                    contentQuestion: question.nameQuestion,
                    done: false,
                    idAnswerSelected: undefined,
                    listAnswers: question.options.map(option => ({
                        id: option.id,
                        value: option.nameOption,
                      }))
                  })
            })
        },
        updateQuestion(state, action) {
            const { idQuestion, idAnswer } = action.payload;
            console.log(idAnswer);
            const question = state.find(question => question.id === idQuestion);
            if (question) {
                question.done = true;
                question.idAnswerSelected = Number(idAnswer)
            }
        }
    }
})

export const { addListQuestion, updateQuestion } = listQuestionSlice.actions
export default listQuestionSlice

