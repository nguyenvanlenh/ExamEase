import React, { useState } from "react";
import "./Question.scss";
import { Form } from "react-bootstrap";

function Question(prop) {
  const [selectedExam, setSelectedExam] = useState(""); // State để lưu trữ giá trị của radio button được chọn

  const handleExamChange = (event) => {
    setSelectedExam(event.target.value); // Cập nhật giá trị của state khi người dùng thay đổi radio button
    console.log("selectedExam", event.target.value);
  };
  return (
    <div id={"q-"+prop.id} className="question-container">
      <div className="wrap-number">
        <span className="number">{prop.numberSentence + 1}</span>
      </div>
      <div className="content">
        <div className="content-question">{prop.contentQuestion}</div>
        <Form className="list-answers">
          {
              prop.listAnswers.map((answer)=> (
                <Form.Check
                key={answer.id}
                type="radio"
                value={answer.id}
                name="answers"
                id={answer.id}
                label={answer.value}
                // checked={answer.select}s
                onChange={handleExamChange}
                />
              ))
          }
        </Form>
      </div>
    </div>
  );
}

export default Question;
