import React, { useEffect, useState } from "react";
import "./Examining.scss";
import Header from "../../components/header/Header";
import { Button, CloseButton } from "react-bootstrap";
import ListQuestion from "../../components/listQuestion/ListQuestion";
import ListBtnQuestion from "../../components/listBtnQuestion/ListBtnQuestion";
import { examNumberService } from "../../services/examNumberService";
import { useDispatch, useSelector } from "react-redux";
import {  addListQuestion, addedListQuestion } from "../../redux/slices/listQuestionSlice";
import { examiningLocalStorage, listQuestionLocalStorage } from "../../utils/localStorage";
import { submitExaminingSwal } from "../../utils/mySwal";
import { useLocation, useNavigate } from "react-router-dom";
import { formatTimeMS } from "../../utils/utilsFunction";
function Examining() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [move, setMove] = useState(false);
  const [part, setPart] = useState(false);
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
    const totalTime = timeExam*60 - time
    const isConfirmed = await submitExaminingSwal();
    if (isConfirmed) {
      navigate('/result', { state: { idExamNumber: id ,totalTime: totalTime} });
      examiningLocalStorage.remove();
      listQuestionLocalStorage.remove(); 
    }
  };

  const location = useLocation();
  const { id, timeExam } = location.state || {};

  const [examNumber, setExamNumber] = useState()
  const listQuestion = useSelector((state) => state.listQuestion)
  // console.log(listQuestion);
  async function dataExamNumber(id) {
    console.log("goi api")

    const data = await examNumberService.getExamNumberUser(id);
    // setData cho useState, redux, localStorage
    setExamNumber(data.data);
    examiningLocalStorage.save(data.data);

    // fix chỗ này sau
    dispatch(addListQuestion(data.data?.examNumbers[0]?.listQuestions));
  }
  useEffect(() => {
    const questions = listQuestionLocalStorage.get();
    const data = examiningLocalStorage.get();
    if (questions && data && data.id === id) {
      setExamNumber(data)
      dispatch(addedListQuestion(questions))
    }else {
      dataExamNumber(id)
    }
  }, [])
  const [time, setTime] = useState(timeExam * 60);

  useEffect(() => {
    if (time > 0) {
      const timerId = setInterval(() => {
        setTime(time => time - 1);
      }, 1000);

      // Clear interval khi component unmount hoặc khi time thay đổi
      return () => clearInterval(timerId);
    } else {
      // Hiển thị thông báo khi hết thời gian
      console.log("Hết giờ");
      navigate('/result', { state: { idExamNumber: id ,totalTime: timeExam*60} });
      examiningLocalStorage.remove();
      listQuestionLocalStorage.remove();
    }
  }, [time]);

  return (
    <>
      <Header />
      <div id="examining">
        <div direction="horizontal" className="wrap-title">
          <h1 className="title">
            {examNumber?.title}
          </h1>
          <Button className="btn-custom">Thoát</Button>
        </div>
        <i className="note-top">
          Chú ý: bạn có thể click vào Part sau đó chọn câu mà bạn muốn làm.
        </i>
        <div className="wrap-content">
          <div className="container-left">
            <div className="content">
              <ListQuestion listQuestion={listQuestion}/>
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
                  đánh dấu review
                </i>
                <strong>Part</strong>
                <ListBtnQuestion listQuestion={listQuestion}/>
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
          <ListBtnQuestion listQuestion={listQuestion}/>
        </div>
      </div>
    </>
  );
}

export default Examining;
