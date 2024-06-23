import React, { useEffect, useState } from "react";
import "./Examining.scss";
import Header from "../../components/header/Header";
import { Button, CloseButton } from "react-bootstrap";
import ListQuestion from "../../components/listQuestion/ListQuestion";
import ListBtnQuestion from "../../components/listBtnQuestion/ListBtnQuestion";
import { useDispatch, useSelector } from "react-redux";
import { removeQuestion } from "../../redux/slices/listQuestionSlice";
import { examiningLocalStorage, idExamNumberLocalStorage } from "../../utils/localStorage";
import { exitExamSwal, submitExaminingSwal } from "../../utils/mySwal";
import { useNavigate } from "react-router-dom";
import { calculateDurationInSeconds, formatTimeMS } from "../../utils/utilsFunction";
import { workTimeService } from "../../services/workTimeService";

function Examining() {
  const auth = useSelector(state => state.auth);
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [move, setMove] = useState(false);
  const [part, setPart] = useState(false);
  // set time vao day, 100 la phut mac dinh
  const [time, setTime] = useState(100 * 60);
  const [examNumber, setExamNumber] = useState()
  const listQuestion = useSelector((state) => state.listQuestion)
  // const questions = listQuestionLocalStorage.get();
  const data = examiningLocalStorage.get();
  const idExamNumber = idExamNumberLocalStorage.get();
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 32 ? setMove(true) : setMove(false);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleHidden = () => {
    setPart(!part);
  };

  const handleSubmit = async () => {
    const isConfirmed = await submitExaminingSwal();
    if (isConfirmed) {
      // update endExam workTime
      await workTimeService.updateWorkTimeUser(auth, idExamNumber, new Date().toISOString())
      navigate('/result', { state: { idExamNumber: idExamNumber } });
      examiningLocalStorage.remove();
      dispatch(removeQuestion())
    }
  };

  async function getTime(authObject, idExamNumber) {
    const workTime = await workTimeService.getWorkTimeUser(authObject, idExamNumber);
    if (workTime.status === 200) {
      const now = new Date();
      setTime(calculateDurationInSeconds(now, workTime?.data.endExam))
    } else {
      console.log("lỗi")
    }

  }

  useEffect(() => {
    getTime(auth, idExamNumber)
    setExamNumber(data)
  }, [])

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);

      // Clear interval khi component unmount hoặc khi time thay đổi
      return () => clearInterval(timerId);
    } else {

      navigate('/result', { state: { idExamNumber: idExamNumber } });
      examiningLocalStorage.remove();
      dispatch(removeQuestion())
    }
  }, [time]);

  const handleExit = async () => {
    const isConfirmed = await exitExamSwal();
    if (isConfirmed) {
      await workTimeService.removeWorkTimeAndUserAnswerUser(
        idExamNumber,
        auth
      );
      dispatch(removeQuestion())
      navigate(-1)
    }
  }

  return (
    <>
      <Header />
      <div id="examining">
        <div direction="horizontal" className="wrap-title">
          <h1 className="title">
            {examNumber?.title}
          </h1>
          <Button onClick={handleExit} className="btn-custom">Thoát</Button>
        </div>
        <i className="note-top">
          Chú ý: bạn có thể click vào Part sau đó chọn câu mà bạn muốn làm.
        </i>
        <div className="wrap-content">
          <div className="container-left">
            <div className="content">
              <ListQuestion listQuestion={listQuestion} />
            </div>
          </div>
          <div className="container-right d-b">
            <div className={`wrap ${move && "set-top"}`}>
              <div className="content">
                <h3 className="text-time">Thời gian làm bài:</h3>
                <span id="timeelapsed">{formatTimeMS(time)}</span>
                <Button className="btn-submit" onClick={handleSubmit}>
                  NỘP BÀI
                </Button>
                <i className="note">
                  Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để
                  cắm cờ nếu chưa chắc chắc
                </i>
                <strong>Part</strong>
                <ListBtnQuestion listQuestion={listQuestion} />
              </div>
            </div>
          </div>
        </div>
        <div className="contaner-bottom">
          <div className="content">
            <h3 className="text-time">Thời gian làm bài:</h3>
            <span id="timeelapsed">{formatTimeMS(time)}</span>
            <Button className="btn-submit" onClick={handleSubmit}>
              NỘP BÀI
            </Button>
          </div>
        </div>
        <div
          className={`center-part ${part && "d-none"}`}
          onClick={() => handleHidden()}
        >
          Part
        </div>
        <div className={`center-part-content ${part || "d-none"}`}>
          <div className="wrap-part">
            <strong>Part</strong>
            <CloseButton onClick={() => handleHidden()} />
          </div>
          <ListBtnQuestion listQuestion={listQuestion} />
        </div>
      </div>
    </>
  );
}

export default Examining;
