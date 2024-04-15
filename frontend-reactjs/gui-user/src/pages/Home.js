import React from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux'

export default function Home() {

    const status = useSelector((state) => state.todos.status)
    console.log(status);
    const todoList = useSelector(state => state.todos.todos)
    console.log(todoList);
    return (
        <div>
            <div>
            <Stack direction="horizontal" gap={2}>
                <Button as="a" variant="primary">
                    Button as link
                </Button>
                <Button as="a" variant="success">
                    Button as link
                </Button>
            </Stack>
            </div>
            {status === 'loading' ? <div>Đang load</div> :
                todoList.map((todo) => (
                    <div key={todo.id}>{todo.title}</div>
                ))
            }
        </div>
    )
}
