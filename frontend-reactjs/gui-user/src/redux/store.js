import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/counterSlice'
import listQuestionSlice from './slices/listQuestionSlice'

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        listQuestion: listQuestionSlice.reducer
    },
})