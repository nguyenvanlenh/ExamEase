import { configureStore } from '@reduxjs/toolkit'
import todoSlice from './slices/counterSlice'

export const store = configureStore({
    reducer: {
        todos: todoSlice.reducer,
    },
})