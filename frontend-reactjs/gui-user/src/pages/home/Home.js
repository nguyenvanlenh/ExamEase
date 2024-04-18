import React from "react";
import { Col, Container, Row, Stack } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./home.scss";
import ListCardItem from "../../components/listCardItem/ListCardItem";
import { Link } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CardItemExam } from "../../components/CardItemExam/CardItemExam";

export default function Home() {
  const listExam = [
    {
      id: 1,
      title: "Practice Set 2023 TOEIC Test 10",
      time: "40",
      beginDay: "Thời gian bắt đầu: 12h30, 14/12/2024",
      endDay: "Thời gian kết thúc: 12h30, 14/12/2024",
    },
    {
      id: 2,
      title: "Practice Set 2023 TOEIC Test 10",
      time: "40",
      beginDay: "Thời gian bắt đầu: 12h30, 14/12/2024",
      endDay: "Thời gian kết thúc: 12h30, 14/12/2024",
    },
  ];
  const objectExams = {
    type: "OBLIGATE_EXAM",
    nameButton: "Làm bài",
    listExam: listExam,
  };
  const listResultExam = [
    {
      id: 1,
      title: "Practice Set 2023 TOEIC Test 10",
      time: "40",
      dateDone: "Ngày làm bài: 03/01/2024",
      timeDone: "Thời gian hoàn thành: 0:10:04",
      result: "Kết quả: 2/6",
    },
    {
      id: 2,
      title: "Practice Set 2023 TOEIC Test 10",
      time: "40",
      dateDone: "Ngày làm bài: 03/01/2024",
      timeDone: "Thời gian hoàn thành: 0:10:04",
      result: "Kết quả: 2/6",
    },
  ];
  const objectTookExams = {
    type: "TOOK_EXAM",
    nameButton: "Xem chi tiết",
    listExam: listResultExam,
  };
  const listExams = [1, 2, 3, 4, 5, 6];
  return (
    <div id="id-home">
      <Header />
      <Container>
        <div className="wrap-welcom">
          <h1 className="title1">Xin chào, ndl22012002!</h1>
        </div>
        <div className="part">
          <h2 className="title2">Lịch học hôm nay</h2>
          <ListCardItem objectExams={objectExams} />
        </div>
        <div className="part">
          <Stack direction="horizontal">
            <h2 className="title2">Kết quả luyện thi mới nhất</h2>
            <Link className="link-chart">
              <EqualizerIcon />
              <div className="text-chart">Thống kê kết quả luyện thi</div>
            </Link>
          </Stack>

          <ListCardItem objectExams={objectTookExams} />
          <div className="view-all">
            <Link>
              <b>Xem tất cả</b>
              <KeyboardDoubleArrowRightIcon fontSize="16" />
            </Link>
          </div>
        </div>
      </Container>
      <div className="exam-bottom">
        <Container>
          <h1 className="title">Đề thi mới nhất</h1>
          <div className="row pt-3 pb-3">
            {listExams.map((exam, index) => {
              return <CardItemExam key={exam} />;
            })}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
