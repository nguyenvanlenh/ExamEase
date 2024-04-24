import React from 'react'
import Question from '../question/Question'
import { dataListQuestion } from '../../data/SampleData'

function ListQuestion() {
  return (
    <>
      {
        dataListQuestion.length>0 && dataListQuestion.map((question, index) => (
          <Question
            key={question.id}
            numberSentence={index}
            id={question.id}
            contentQuestion={question.contentQuestion}
            listAnswers={question.listAnswers}
          />
        ))
      }
    </>
  )
}

export default ListQuestion
