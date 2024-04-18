import React from "react";
import { Container, Stack } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import "./home.scss";
import ListCardItem from "../../components/listCardItem/ListCardItem";
import { Link } from "react-router-dom";
import EqualizerIcon from '@mui/icons-material/Equalizer';

export default function Home() {
    const listExam = [
        {
            id: 1,
            title: "Practice Set 2023 TOEIC Test 10",
            time: "40",
            beginDay: "Thời gian bắt đầu: 12h30, 14/12/2024",
            endDay: "Thời gian kết thúc: 12h30, 14/12/2024",
            nameButton: "Làm bài"
        },
        {
            id: 2,
            title: "Practice Set 2023 TOEIC Test 10",
            time: "40",
            beginDay: "Thời gian bắt đầu: 12h30, 14/12/2024",
            endDay: "Thời gian kết thúc: 12h30, 14/12/2024",
            nameButton: "Làm bài"
        }
    ]
    const listResultExam = [
        {
            id: 1,
            title: "Practice Set 2023 TOEIC Test 10",
            time: "40",
            dateDone: "Ngày làm bài: 03/01/2024",
            timeDone: "Thời gian hoàn thành: 0:10:04",
            result: "Kết quả: 2/6",
            nameButton: "Xem chi tiết"
        },
        {
            id: 2,
            title: "Practice Set 2023 TOEIC Test 10",
            time: "40",
            dateDone: "Ngày làm bài: 03/01/2024",
            timeDone: "Thời gian hoàn thành: 0:10:04",
            result: "Kết quả: 2/6",
            nameButton: "Xem chi tiết"
        }
    ]
  return (
    <div id="id-home">
      <Header />
      <Container>
        <div className="wrap-welcom">
            <h1 className="title1">Xin chào, ndl22012002!</h1>
        </div>
        <div>
          <h2 className="title2">Lịch học hôm nay</h2>
            <ListCardItem 
                listCard={listExam}
            />
        </div>
        <div>
            <Stack direction="horizontal">
                <h2 className="title2">Kết quả luyện thi mới nhất</h2>
                <Link className="link-chart">
                    <EqualizerIcon /> 
                    <div className="text-chart">Thống kê kết quả luyện thi</div>   
                </Link>
            </Stack>
          
            <ListCardItem 
                listCard={listResultExam}
            />
        </div>
      </Container>
      <Footer />
    </div>
  );
}
