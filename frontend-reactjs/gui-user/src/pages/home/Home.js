import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner, Stack } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./home.scss";
import ListCardItem from "../../components/listCardItem/ListCardItem";
import { Link } from "react-router-dom";
import EqualizerIcon from "@mui/icons-material/Equalizer";
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight";
import { CardItemExam } from "../../components/CardItemExam/CardItemExam";
import { examService } from "../../services/examService";
import { useDispatch, useSelector } from "react-redux";
import { workTimeService } from "../../services/workTimeService";
import { addExamWorked, removexamWorked } from "../../redux/slices/examWorkedSlice";

export default function Home() {
  const [username, setUsername] = useState(null);
  const [listExams, setListExams] = useState([]);
  const [sizePage, setSizePage] = useState(8);
  const listResultExam = useSelector((state) => state.examWorkeds)
  const auth = useSelector((state) => state.auth)
  const dispatch = useDispatch()
  useEffect(() => {
    const usernameLocal = JSON.parse(localStorage.getItem('username'))
    if (usernameLocal) {
      setUsername(usernameLocal);
    } else {
      setUsername(null)
    }
  }, []);
  // double chỗ này
  useEffect(() => {
    const fetching = async () => {
      const response = await examService.searching("", "", 0, 8);
      setListExams(response?.data.content);
      if(auth && Object.keys(auth).length > 0) {
        const listWorkTime = await workTimeService.getAllWorkTimeUser(auth);
        dispatch(removexamWorked())
        dispatch(addExamWorked(listWorkTime?.data))
      }
    };
    fetching();
  }, []);
  // xử lý loading Spinner sau 2,5s không có kết quả thì trả về not found
  const [timeoutReached, setTimeoutReached] = useState(false);
  useEffect(() => {
    const timer = setTimeout(() => {
      if (!listExams || listExams.length === 0) {
        setTimeoutReached(true);
      }
    }, 2500);

    return () => clearTimeout(timer);
  }, [listExams]);

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
  const objectTookExams = {
    type: "TOOK_EXAM",
    nameButton: "Xem chi tiết",
    listExam: listResultExam,
  };
  return (
    <div id="id-home">
      <Header />
      <Container>
        <div className="wrap-welcom">
          <h1 className="title1">Xin chào, {username || "bạn"}!</h1>
        </div>
        <div className="part">
          <h2 className="title2">Lịch học hôm nay</h2>
          <ListCardItem objectExams={objectExams} />
        </div>
        <div className="part">
          <Stack direction="horizontal">
            <h2 className="title2">Kết quả luyện thi mới nhất</h2>
            <Link to={"/statistics"} className="link-chart">
              <EqualizerIcon />
              <div className="text-chart">Thống kê kết quả luyện thi</div>
            </Link>
          </Stack>
          
          <ListCardItem objectExams={objectTookExams} />
          {
            listResultExam && listResultExam.length > 0 &&
            (<div className="view-all">
            <Link to={"/statistics"}>
              <b>Xem tất cả</b>
              <KeyboardDoubleArrowRightIcon fontSize="16" />
            </Link>
          </div>)
          }
          
        </div>
      </Container>
      <div className="exam-bottom">
        <Container>
          <h1 className="title">Đề thi mới nhất</h1>
          <div className="row pt-3 pb-3">
            {listExams && listExams.length > 0 ? (
              listExams.map((exam) => (
                <CardItemExam key={exam.id} exam={exam} />
              ))
            ) : (
              timeoutReached ? (
                <div className="d-flex justify-content-center">
                  Not found
                </div>
              ) : (
                <div className="d-flex justify-content-center">
                  <Spinner animation="border" />
                </div>
              )
            )}
          </div>
        </Container>
      </div>
      <Footer />
    </div>
  );
}
