import React, { useEffect, useState } from "react";
import "./Question.scss";
import { Form, OverlayTrigger, Tooltip } from "react-bootstrap";
import { TYPE_ANSWERS } from "../../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { updateFlag, updateQuestion } from "../../redux/slices/listQuestionSlice";
import { userAnswerService } from "../../services/userAnswerService";
import { listQuestionLocalStorage } from "../../utils/localStorage";
import { studentAnswerService } from "../../services/studentAnswerService";
import EmojiFlagsIcon from '@mui/icons-material/EmojiFlags';
function Question(prop) {
  const auth = useSelector(state => state.auth)
  const [flag, setFlag] = useState(false)
  useEffect(() => {
    setSelectedExam(prop.idAnswerSelected)
  }, []);
  const [selectedExam, setSelectedExam] = useState(null); // State để lưu trữ giá trị của radio button được chọn
  const dispatch = useDispatch()

  const handleExamChange = (event) => {
    const idOption = event.target.value
    const idQuestion = prop.id
     // Cập nhật giá trị của state khi người dùng thay đổi radio button
    
    handleUpdateRedux(idQuestion, idOption)
    handleRequest(idQuestion, idOption)
    setSelectedExam(idOption);
  };

  function handleUpdateRedux(idQuestion, idOption) {
    const selected = { idQuestion: idQuestion, idAnswer: idOption}
    dispatch(updateQuestion(selected))
  }

  function handleRequest(idQuestion, idOption) {
    const question = listQuestionLocalStorage.getById(idQuestion)
    // check account student?
    if(auth?.studentId) {
      if(question && selectedExam) {
        studentAnswerService.update(auth?.studentId, selectedExam, idOption)
      }else {
        studentAnswerService.post(auth?.studentId, idOption)
      }
    }else {
      if(question && selectedExam) {
        userAnswerService.updateAnswer(auth?.userId, selectedExam, idOption)
      }else {
        userAnswerService.postUserAnswer(auth?.userId, idOption)
      }
    }
  }
  const handleFlag = () => {
    setFlag(!flag)
    dispatch(updateFlag({idQuestion: prop.id}))
  }
  return (
    <div id={"q-"+prop.id} className="question-container">
      <OverlayTrigger
        placement="top"
        overlay={<Tooltip id={`tooltip-${prop.id}`}>{flag?`Bạn muốn hủy cắm cờ?`:`Bạn muốn cắm cờ?`}</Tooltip>}
      >
        <div className="wrap-number" onClick={handleFlag}>
          <span className="number">{prop.numberSentence + 1}</span>
          {flag && <EmojiFlagsIcon className="flag" />}
        </div>
      </OverlayTrigger>
      <div className="content">
        <div className="content-question">{prop.contentQuestion}</div>
        <Form className="list-answers">
          {
              prop.listAnswers.map((answer, index)=> (
                <Form.Check
                key={answer.id}
                type="radio"
                value={answer.id}
                name="answers"
                id={answer.id}
                label={TYPE_ANSWERS[index]+". "+ answer.value}
                checked={answer.id === prop.idAnswerSelected}
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
