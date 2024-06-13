import React, { useEffect, useState } from 'react';
import { Table, Button, Container, Row, Col } from 'react-bootstrap';
import './ResultStudent.scss'; // Import SCSS
import { useDispatch, useSelector } from 'react-redux';
import { removeAuth } from '../../redux/slices/authSlice';
import { useNavigate } from 'react-router-dom';
import { examNumberService } from '../../services/examNumberService';
import { workTimeService } from '../../services/workTimeService';
import { calculateDurationInSeconds, totalMins } from '../../utils/utilsFunction';

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
    const [resultExamNumber, setResultExamNumber] = useState({})
    const [timeWork, setTimeWork] = useState(0)
  const handleLogout = () => {
    dispatch(removeAuth())
    navigate("/login-student")

  }

  useEffect(() => {
    async function getResultExamNumberStudent() {
      const result = await examNumberService.getResultExamNumberStudent(auth.examNumberId, auth.studentId);
      const workTimeStudent = await workTimeService.getWorkTimeStudent(auth.studentId, auth.examNumberId);
      if(result.data && workTimeStudent.data) {
        setResultExamNumber(result.data)
        console.log(workTimeStudent)
        setTimeWork(totalMins(calculateDurationInSeconds(workTimeStudent.data.beginExam, workTimeStudent.data.endExam)))
      }
    }
    getResultExamNumberStudent()
  },[])

  const totalCorrect = resultExamNumber?.totalCorrect ?? 0;
  const totalQuestion = resultExamNumber?.totalQuestion ?? 1; // tránh chia cho 0

  const score = (totalCorrect / totalQuestion) * 10;
  const roundedScore = roundToTwoDecimalPlacesIfNecessary(score);
  function roundToTwoDecimalPlacesIfNecessary(value) {
    if (typeof value !== 'number') return value;
    
    const decimalPart = value.toString().split('.')[1];
    if (decimalPart && decimalPart.length > 2) {
      return value.toFixed(2);
    }
    
    return value;
  }
  return (
    <Container id='result-container' className="mt-5">
      <Row className="mb-3">
        <Col>
          <h2>Kết quả thi</h2>
        </Col>
      </Row>
      <Row className="mb-4">
        <Col className="text-center correct-answers">
          <h3>{resultExamNumber?.totalCorrect} / {resultExamNumber?.totalQuestion}</h3>
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
            <td>{roundedScore}</td>
          </tr>
          <tr>
            <td><strong>Tổng thời gian đã làm</strong></td>
            <td>{timeWork + ' phút' }</td>
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
