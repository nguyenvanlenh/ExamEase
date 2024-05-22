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
            const update = [{
                ...state[0],
                listQuestionRequests: action.payload

            }]
            return update;
        },
        removeExamRequest() {
            return [];
        }
    }
})

export const { createExamRequest, updateCreateExamRequest,
    removeExamRequest
} = examSlice.actions
export default examSlice;