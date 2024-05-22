import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/counterSlice'
import examSlice from './slices/examSlice'
import listQuestionSlice from './slices/listQuestionSlice'

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        listQuestion: listQuestionSlice.reducer,
        exams: examSlice.reducer
    },
})