import { createSlice } from '@reduxjs/toolkit';
import { RequestData } from '../../utils/request';
const requestData = RequestData();
const examSlice = createSlice({
    name: 'exams',
    initialState: [],
    reducers: {
        createExamRequest(state, action) {
            const exam = requestData.ExamRequest(
                action.payload.teacherId,
                action.payload.title,
                action.payload.shortDescription,
                action.payload.description,
                Number(action.payload.quantityQuestion),
                Number(action.payload.timeId),
                Number(action.payload.categoryId),
                action.payload.startTime,
                action.payload.endTime,
                action.payload.isPublic,
                action.payload.listExamNumberRequests,
                []
            )
            state.push(exam)
        },
        updateCreateExamRequest(state, action) {
            const updatedQuestions = state[0].listQuestionRequests.map(q =>
                q.id === action.payload.id ? action.payload : q
            );

            const questionExists = updatedQuestions.some(q => q.id === action.payload.id);
            if (!questionExists) {
                updatedQuestions.push(action.payload);
            }

            const updatedState = [{
                ...state[0],
                listQuestionRequests: updatedQuestions
            }];

            return updatedState;
        },

        addQuestionsIntoExamRequest(state, action) {

            const updatedState = [{
                ...state[0],
                listQuestionRequests: action.payload
            }];

            return updatedState;
        },

        removeExamRequest() {
            return [];
        }
    }
})

export const { createExamRequest, updateCreateExamRequest,
    addQuestionsIntoExamRequest,
    removeExamRequest
} = examSlice.actions
export default examSlice;