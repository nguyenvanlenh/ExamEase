import React, { useState } from 'react';
import { Container, Form, Button } from 'react-bootstrap';
import './ExaminingRules.scss';

function ExaminingRules() {
  const [agreed, setAgreed] = useState(false);

  const handleAgreeChange = () => {
    setAgreed(!agreed);
  };

  return (
    <Container className="examining-rules">
      <h2 className="exam-title">Thi cuối kỳ môn Toán</h2>
      <div className="exam-info">
        <p><strong>Họ và tên thí sinh:</strong> Nguyễn Văn A</p>
        <p><strong>Mã số sinh viên:</strong> 12345678</p>
        <p><strong>Thời gian làm bài:</strong> 90 phút</p>
        <p><strong>Ngày thi:</strong> 20/06/2024</p>
        <p><strong>Giờ thi:</strong> 9:00 AM</p>
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
        <Button variant="primary" type="button" disabled={!agreed} className="start-exam-btn">
          Làm bài thi
        </Button>
      </Form>
    </Container>
  );
}

export default ExaminingRules;
