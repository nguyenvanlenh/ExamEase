import React from 'react'
import { useSelector } from 'react-redux'

export default function Home() {

    const status = useSelector((state) => state.todos.status)
    console.log(status);
    const todoList = useSelector(state => state.todos.todos)
    console.log(todoList);
    return (
        <div>
            {status === 'loading' ? <div>Đang load</div> :
                todoList.map((todo) => (
                    <div key={todo.id}>{todo.title}</div>
                ))
            }
        </div>
    )
}
