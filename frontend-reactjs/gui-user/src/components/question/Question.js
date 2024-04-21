import React, { useState } from "react";
import "./Question.scss";
import { Form } from "react-bootstrap";

function Question() {
  const [selectedExam, setSelectedExam] = useState(""); // State để lưu trữ giá trị của radio button được chọn

  const handleLog = () => {
    console.log("selectedExam", selectedExam);
  };
  const handleExamChange = (event) => {
    setSelectedExam(event.target.value); // Cập nhật giá trị của state khi người dùng thay đổi radio button
    handleLog();
  };
  return (
    <div id="question">
      <div className="wrap-number">
        <span className="number">12</span>
      </div>
      <div className="content">
        <div className="content-question">
          Xác định ý đúng: Ở một loài thực vật lưỡng bội có 6 nhóm gen liên kết.
          Xét 3 thể đột biến số lượng nhiễm sắc thể là thể một, thể ba và thể
          tam bội. Số lượng nhiễm sắc thể có trong mỗi tế bào của mỗi thể đột
          biến khi các tế bào đang ở kỳ sau nguyên phân theo thứ tự là:
        </div>
        <Form className="list-answers">
          <Form.Check
            type="radio"
            id="exam1"
            value={1}
            name="examNumber"
            label="Đề thi 1 (40 câu)"
            // checked={selectedExam === '1'}
            onChange={handleExamChange}
          />
          <Form.Check
            type="radio"
            id="exam2"
            value={2}
            name="examNumber"
            label="Đề thi 2 (40 câu)"
            // checked={selectedExam === '2'}
            onChange={handleExamChange}
          />
          <Form.Check
            type="radio"
            id="exam3"
            value={3}
            name="examNumber"
            label="Đề thi 3 (40 câu)"
            // checked={selectedExam === '2'}
            onChange={handleExamChange}
          />
          <Form.Check
            type="radio"
            id="exam4"
            value={4}
            name="examNumber"
            label="Đề thi 4 (40 câu)"
            // checked={selectedExam === '2'}
            onChange={handleExamChange}
          />
        </Form>
      </div>
    </div>
  );
}

export default Question;
