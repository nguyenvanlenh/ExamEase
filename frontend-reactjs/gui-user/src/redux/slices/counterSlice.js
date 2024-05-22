import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
const initialState = {
    status: 'idle',
    todos: []
}

const todoSlice = createSlice({
    name: 'todos',
    initialState,
    reducers: {
        addTodo(state, action) {
            state.todos.push(action.payload)
        },

    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchTodos.pending, (state, action) => {
                state.status = 'loading';
            })
            .addCase(fetchTodos.fulfilled, (state, action) => {
                state.todos = action.payload;
                state.status = 'idle';
            })
            .addCase(fetchTodos.rejected, (state, action) => {
                state.status = 'error';
            })
    }
})

export const { addUser } = todoSlice.actions
export default todoSlice

// ở UI chúng ta dispach vào đây
// sau đó hàm này sẽ gọi lên counterSlice của nó để xử lý state ở trong hàm addCase
export const fetchTodos = createAsyncThunk('todos/fetchTodos', async () => {
    const res = await fetch('https://jsonplaceholder.typicode.com/todos');
    const data = await res.json();
    return data;
});

/*
link code ví dụ
https://github.com/holetexvn/todo-app-redux/blob/redux-thunk/src/components/TodoList/todosSlice.js
*/
