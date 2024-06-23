import React, { useState } from 'react';
import { Container, Form, Button, Col, Row } from 'react-bootstrap';
import './ExaminingRules.scss';
import { useDispatch, useSelector } from 'react-redux';
import { formatdMYFromString, formatTime } from '../../utils/common';
import { examNumberService } from '../../services/examNumberService';
import { addListQuestion } from '../../redux/slices/listQuestionSlice';
import { useNavigate } from 'react-router-dom';
import { outSideExamSwal } from '../../utils/mySwal';
import { removeAuth } from '../../redux/slices/authSlice';

function ExaminingRules() {
  const [agreed, setAgreed] = useState(false);
  const navigate = useNavigate()
  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };
  const dispatch = useDispatch()
  const auth = useSelector(state => state.auth)
  const handleSubmit = async () => {
    const data = await examNumberService.getExamNumberStudent(auth?.studentId);
    if (data.data && data.status === 200) {
      const selectedExam = data.data?.examNumbers[0];
      const listQuestions = selectedExam?.listQuestions;
      dispatch(addListQuestion(listQuestions));

      navigate("/examining-student")
    } else {
      outSideExamSwal()
    }


  }
  const handleLogout = () => {
    dispatch(removeAuth())
    navigate("/login-student")
  }
  return (
    <Container id="examining-rules">
      <h2 className="exam-title">{auth?.title}</h2>
      <div className="exam-info">
        <p><strong>Họ và tên thí sinh:</strong> {auth?.fullname}</p>
        <p><strong>Mã số sinh viên:</strong> {auth?.code}</p>
        <p><strong>Thời gian làm bài:</strong> {auth?.timeExam} phút</p>
        <p><strong>Ngày thi:</strong> {formatdMYFromString(auth?.dateExam)}</p>
        <p><strong>Thông tin nội quy khi thi:</strong></p>
        <ul className="rules-list">
          <li>Thí sinh phải có mặt trước giờ thi ít nhất 15 phút.</li>
          <li>Thí sinh không được mang tài liệu vào phòng thi.</li>
          <li>Thí sinh phải tuân thủ các quy định của giám thị.</li>
          <li>Thí sinh không được rời khỏi phòng thi khi chưa được phép.</li>
          <li>Thí sinh phải nộp bài đúng giờ.</li>
        </ul>
      </div>
      <Form>
        <Form.Group controlId="agreeRules" className="mt-4">
          <Form.Check
            type="checkbox"
            label="Tôi đồng ý với nội quy"
            checked={agreed}
            onChange={handleAgreeChange}
            className="agree-checkbox"
          />
        </Form.Group>
        <Row>
          <Col sm={6}>
            <Button variant="primary" type="button" disabled={!agreed} className="start-exam-btn" onClick={handleSubmit}>
              Làm bài thi
            </Button>
          </Col>
          <Col sm={6}>
            <Button variant="danger" type="button" className="start-exam-btn" onClick={handleLogout}>
              Đăng xuất
            </Button>
          </Col>
        </Row>



      </Form>
    </Container>
  );
}

export default ExaminingRules;
