import React from 'react'
import Question from '../question/Question'

function ListQuestion(props) {
  return (
    <>
      {
        props.listQuestion.length>0 && props.listQuestion.map((question, index) => (
          <Question
            key={question.id}
            numberSentence={index}
            id={question.id}
            contentQuestion={question.contentQuestion}
            listAnswers={question.listAnswers}
            idAnswerSelected={question.idAnswerSelected}
          />
        ))
      }
    </>
  )
}

export default ListQuestion
