import React from "react";
import "./ListBtnQuestion.scss";
import { dataListQuestion } from "../../data/SampleData";

function ListBtnQuestion() {
  const handleClick = (questionId) => {
    const questionElement = document.getElementById(`q-${questionId}`);
    if (questionElement) {
      const headerHeight = document.getElementById("id-header").offsetHeight; // Lấy chiều cao của thanh header
      const targetPosition =
        questionElement.getBoundingClientRect().top +
        window.scrollY -
        headerHeight +
        -20;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  return (
    <div className="wrap-question">
      {dataListQuestion &&
        dataListQuestion.map((question) => (
          <span
            key={question.id}
            className={`question-item ${question.done && "done"}`}
            onClick={() => handleClick(question.id)}
          >
            {question.id}
          </span>
        ))}
    </div>
  );
}

export default ListBtnQuestion;
