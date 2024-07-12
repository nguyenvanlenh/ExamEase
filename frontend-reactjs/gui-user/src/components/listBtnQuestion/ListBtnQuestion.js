import React from "react";
import "./ListBtnQuestion.scss";

function ListBtnQuestion(props) {
  const handleClick = (questionId) => {
    const questionElement = document.getElementById(`q-${questionId}`);
    if (questionElement) {
      const targetPosition =
        questionElement.getBoundingClientRect().top +
        window.scrollY - 80;
      window.scrollTo({
        top: targetPosition,
        behavior: "smooth",
      });
    }
  };
  
  return (
    <div className="wrap-question">
      {props.listQuestion &&
        props.listQuestion.map((question) => (
          <span
            key={question.id}
            className={`question-item ${question.done && "done"} ${question.flag && "flag"}`}
            onClick={() => handleClick(question.id)}
          >
            {question.id}
          </span>
        ))}
    </div>
  );
}

export default ListBtnQuestion;
