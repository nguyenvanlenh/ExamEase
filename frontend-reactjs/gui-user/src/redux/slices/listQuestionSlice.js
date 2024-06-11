import { createSlice } from '@reduxjs/toolkit';
import { listQuestionLocalStorage } from '../../utils/localStorage';

const initialState = listQuestionLocalStorage.get() || [];
const listQuestionSlice = createSlice({
    name: 'listQuestion',
    initialState,
    reducers: {
        addListQuestion(state, action) {
            action.payload.map((question, index) => {
                return state.push({
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
            listQuestionLocalStorage.save(state)
        },
        addedListQuestion(state, action) {
            return action.payload;
        },
        updateQuestion(state, action) {
            const { idQuestion, idAnswer } = action.payload;
            const question = state.find(question => question.id === idQuestion);
            if (question) {
                question.done = true;
                question.idAnswerSelected = Number(idAnswer)
            }
            listQuestionLocalStorage.update(idQuestion, idAnswer, state)
        },
        removeQuestion() {
            listQuestionLocalStorage.remove()
            return []
        }
        
    }
})

export const { addListQuestion, updateQuestion, addedListQuestion, removeQuestion } = listQuestionSlice.actions
export default listQuestionSlice

