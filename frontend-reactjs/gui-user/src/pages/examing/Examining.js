import React, { useEffect, useState } from "react";
import "./Examining.scss";
import Header from "../../components/header/Header";
import { Stack } from "@mui/material";
import { Button } from "react-bootstrap";
import ListQuestion from "../../components/listQuestion/ListQuestion";
import ListBtnQuestion from "../../components/listBtnQuestion/ListBtnQuestion";
function Examining() {
  const [move, setMove] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      window.scrollY > 32 ? setMove(true): setMove(false)
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);


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
                <Button className="btn-submit">NỘP BÀI</Button>
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
      </div>
    </>
  );
}

export default Examining;
