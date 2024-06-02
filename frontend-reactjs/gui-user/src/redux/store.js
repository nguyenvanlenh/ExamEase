import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/counterSlice'
import examSlice from './slices/examSlice'
import listQuestionSlice from './slices/listQuestionSlice'
import authSlice from './slices/authSlice'
import examWorkedSlice from './slices/examWorkedSlice'

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        listQuestion: listQuestionSlice.reducer,
        exams: examSlice.reducer,
        auth: authSlice.reducer,
        examWorkeds: examWorkedSlice.reducer
    },
})