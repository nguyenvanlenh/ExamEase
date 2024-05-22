import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/counterSlice'
import examSlice from './slices/examSlice'

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
        exams: examSlice.reducer
    },
})