import React, { useEffect, useState } from "react";
import "./Examining.scss";
import Header from "../../components/header/Header";
import { Stack } from "@mui/material";
import { Button, CloseButton } from "react-bootstrap";
import ListQuestion from "../../components/listQuestion/ListQuestion";
import ListBtnQuestion from "../../components/listBtnQuestion/ListBtnQuestion";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
function Examining() {
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
  const MySwal = withReactContent(Swal);
  const handleSubmit = () => {
    MySwal.fire({
      title: "Xác nhận nộp bài",
      text: "Bạn có chắc chắn muốn nộp bài không?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonText: "Đồng ý",
      cancelButtonText: "Hủy",
      reverseButtons: true,
    }).then((result) => {
      if (result.isConfirmed) {
        // Xử lý logic khi người dùng đồng ý nộp bài
        console.log("Đã nộp bài");
      }
    });
  };
  return (
    <>
      <Header />
      <div id="examining">
        <div direction="horizontal" className="wrap-title">
          <h1 className="title">
            [2022-2023] Trường THPT Chu Văn An - Đề thi thử tốt nghiệp THPT môn
            Sinh học năm 2022-2023
          </h1>
          <Button className="btn-custom">Thoát</Button>
        </div>
        <i className="note-top">
          Chú ý: bạn có thể click vào Part sau đó chọn câu mà bạn muốn làm.
        </i>
        <div className="wrap-content">
          <div className="container-left">
            <div className="content">
              <ListQuestion />
            </div>
          </div>
          <div className="container-right d-b">
            <div className={`wrap ${move && "set-top"}`}>
              <div className="content">
                <h3 className="text-time">Thời gian làm bài:</h3>
                <span id="timeelapsed">14:30</span>
                <Button className="btn-submit" onClick={handleSubmit}>
                  NỘP BÀI
                </Button>
                <i className="note">
                  Chú ý: bạn có thể click vào số thứ tự câu hỏi trong bài để
                  đánh dấu review
                </i>
                <strong>Part</strong>
                <ListBtnQuestion />
              </div>
            </div>
          </div>
        </div>
        <div className="contaner-bottom">
          <div className="content">
            <h3 className="text-time">Thời gian làm bài:</h3>
            <span id="timeelapsed">14:30</span>
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
          <ListBtnQuestion />
        </div>
      </div>
    </>
  );
}

export default Examining;
