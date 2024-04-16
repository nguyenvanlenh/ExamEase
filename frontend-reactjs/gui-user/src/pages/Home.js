import React from 'react'
import { Button, Col, Container, Row, Stack } from 'react-bootstrap';
import { useSelector } from 'react-redux'
import Header from '../components/Header';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons'
import Footer from '../components/Footer';

export default function Home() {

    const status = useSelector((state) => state.todos.status)
    console.log(status);
    const todoList = useSelector(state => state.todos.todos)
    console.log(todoList);
    return (
        <div>
            <Header/>
            <Stack direction="horizontal" gap={2}>
                <Button as="a" variant="primary">
                    Button as link
                </Button>
                <Button as="a" variant="success">
                    Button as link
                </Button>
                <FontAwesomeIcon icon={fas.bars} />
            </Stack>
            {status === 'loading' ? <div>Đang load</div> :
                todoList.map((todo) => (
                    <div key={todo.id}>{todo.title}</div>
                ))
            }
            <Footer/>
        </div>
    )
}
