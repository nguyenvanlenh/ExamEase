import React from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import './ResultStudent.scss'; // Import SCSS
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';

export default function ResultStudent() {
  // Dữ liệu giả lập cho ví dụ
  const examResult = {
    examName: 'Đề thi Toán 101',
    studentName: 'Nguyễn Văn A',
    studentId: 'SV001',
    totalScore: 85,
    correctAnswers: 17,
    totalQuestions: 20,
    totalTime: '45 phút'
  };
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const auth = useSelector(state => state.auth)
  const handleLogout = () => {
    dispatch(removeAuth())
    navigate("/login-student")

  }

  return (
    <Container className="mt-5 result-container">
      <Row className="mb-3">
        <Col>
          <h2>Kết quả thi</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center correct-answers">
          <h3>{examResult.correctAnswers} / {examResult.totalQuestions}</h3>
        </Col>
      </Row>
      <Table striped bordered hover className="result-table">
        <tbody>
          <tr>
            <td><strong>Đề thi</strong></td>
            <td>{auth?.title}</td>
          </tr>
          <tr>
            <td><strong>Họ và tên</strong></td>
            <td>{auth?.fullname}</td>
          </tr>
          <tr>
            <td><strong>Mã số sinh viên</strong></td>
            <td>{auth?.code}</td>
          </tr>
          <tr>
            <td><strong>Tổng số điểm</strong></td>
            <td>{examResult.totalScore}</td>
          </tr>
          <tr>
            <td><strong>Tổng thời gian đã làm</strong></td>
            <td>{examResult.totalTime}</td>
          </tr>
        </tbody>
      </Table>
      <Row className="mt-3 text-center">
        <Col>
          <Button variant="danger" size="lg" onClick={handleLogout}>Đăng xuất</Button>
        </Col>
      </Row>
    </Container>
  );
}
