import React from 'react';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, Bar, Doughnut, Pie } from 'react-chartjs-2';
import { Container, Row, Col, Table } from 'react-bootstrap';

// Data for charts
const lineData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June'],
    datasets: [
        {
            label: 'Sales',
            data: [65, 59, 80, 81, 56, 55],
            fill: false,
            backgroundColor: 'rgb(75, 192, 192)',
            borderColor: 'rgba(75, 192, 192, 1)',
        },
    ],
};

const barData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
        {
            label: 'Votes',
            data: [12, 19, 3, 5, 2, 3],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
                'rgba(255, 159, 64, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

const doughnutData = {
    labels: ['Red', 'Blue', 'Yellow'],
    datasets: [
        {
            label: 'Population',
            data: [300, 50, 100],
            backgroundColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderColor: ['rgba(255, 99, 132, 1)', 'rgba(54, 162, 235, 1)', 'rgba(255, 206, 86, 1)'],
            borderWidth: 1,
        },
    ],
};

const pieData = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple'],
    datasets: [
        {
            label: 'Revenue',
            data: [300, 50, 100, 40, 120],
            backgroundColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(54, 162, 235, 1)',
                'rgba(255, 206, 86, 1)',
                'rgba(75, 192, 192, 1)',
                'rgba(153, 102, 255, 1)',
            ],
            borderWidth: 1,
        },
    ],
};

// Sample data for tables
const newUsers = [
    { id: 1, name: 'User 1', joined: '2024-01-15' },
    { id: 2, name: 'User 2', joined: '2024-01-16' },
    { id: 3, name: 'User 3', joined: '2024-01-17' },
];

const newExams = [
    { id: 1, title: 'Exam 1', created: '2024-01-15' },
    { id: 2, title: 'Exam 2', created: '2024-01-16' },
    { id: 3, title: 'Exam 3', created: '2024-01-17' },
];

const popularQuestions = [
    { id: 1, question: 'What is the capital of France?', answers: 150 },
    { id: 2, question: 'What is 2 + 2?', answers: 200 },
    { id: 3, question: 'What is the square root of 16?', answers: 180 },
];

export const Dashboard = () => {
    return (
        <Container fluid>
            <h2 className="my-4">Tổng quát</h2>
            <Row className="mb-4">
                <Col md={6} className="mb-4">
                    <Line data={lineData} />
                </Col>
                <Col md={6} className="mb-4">
                    <Bar data={barData} />
                </Col>
                <Col md={6} className="mb-4">
                    <Doughnut data={doughnutData} />
                </Col>
                <Col md={6} className="mb-4">
                    <Pie data={pieData} />
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={12}>
                    <h3>Người dùng mới</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Name</th>
                                <th>Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newUsers.map(user => (
                                <tr key={user.id}>
                                    <td>{user.id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.joined}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={12}>
                    <h3>Bài thi mới</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Title</th>
                                <th>Created Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {newExams.map(exam => (
                                <tr key={exam.id}>
                                    <td>{exam.id}</td>
                                    <td>{exam.title}</td>
                                    <td>{exam.created}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
            <Row className="mb-4">
                <Col md={12}>
                    <h3>Câu hỏi phổ biến</h3>
                    <Table striped bordered hover>
                        <thead>
                            <tr>
                                <th>ID</th>
                                <th>Question</th>
                                <th>Answers Count</th>
                            </tr>
                        </thead>
                        <tbody>
                            {popularQuestions.map(question => (
                                <tr key={question.id}>
                                    <td>{question.id}</td>
                                    <td>{question.question}</td>
                                    <td>{question.answers}</td>
                                </tr>
                            ))}
                        </tbody>
                    </Table>
                </Col>
            </Row>
        </Container>
    );
};
