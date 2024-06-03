import React, { useEffect, useState } from "react";
import {
  Alert,
  Button,
  Col,
  Container,
  Image,
  Row,
  Stack,
} from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import UserImage from "../../data/imgs/user_icon.webp";
import "./Result.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import {
  Link,
  useLocation,
  useNavigate,
  useNavigation,
} from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DangerousIcon from "@mui/icons-material/Dangerous";
import { examNumberService } from "../../services/examNumberService";
import { authLocalStorage } from "../../utils/localStorage";
import {
  calculateDurationInSeconds,
  formatTimeHMS,
} from "../../utils/utilsFunction";
import { workTimeService } from "../../services/workTimeService";
import { questionService } from "../../services/questionService";

function Result({ navigation }) {
  const location = useLocation();
  const auth = authLocalStorage.get();
  const { idExamNumber } = location.state || {};
  const [result, setResult] = useState(null);
  const [totalTime, setTotalTime] = useState(0);
  const [questionRes, setQuestionRes] = useState([]);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await examNumberService.getResultExamNumberUser(
          idExamNumber,
          auth?.userId
        );
        setResult(data.data);
        const workTime = await workTimeService.getWorkTimeUser(
          auth?.userId,
          idExamNumber
        );
        setTotalTime(
          calculateDurationInSeconds(
            workTime?.data.beginExam,
            workTime?.data.endExam
          )
        );
        const questionResults = await questionService.getQuestionResult(
          idExamNumber
        );
        setQuestionRes(questionResults.data);
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    };
    fetchData();
  }, []);

  const handleTabNumber = (number) => {};
  return (
    <div id="id-result">
      <Header />
      <Container className="wrap" fluid>
        <Row className="mg">
          <Col md={9} xs={12}>
            <div className="content-block">
              <h1 className="title">Kết quả luyện tập: {result?.examName}</h1>
              <div className="tab-container">
                <Stack direction="horizontal" gap={2}>
                  <Button
                    onClick={() => handleTabNumber(0)}
                    className={`tab-pill active `}
                  >
                    Xem đáp án
                  </Button>
                  <Link
                    style={{ padding: "6px" }}
                    to={{
                      pathname: "/list-exams",
                    }}
                    className={`tab-pill active2`}
                  >
                    Quay về trang đề
                  </Link>
                </Stack>
                <div className={`tab-content`}>
                  <Container fluid>
                    <Row className="text-center">
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column c1">
                          <div className="d-flex flex-row justify-content-evenly mb-3">
                            <DoneIcon style={{ flex: 1 }} />
                            <div className="h6" style={{ flex: 3 }}>
                              Kết quả bài thi
                            </div>
                            <div className="h6" style={{ flex: 1 }}>
                              {result ? result?.totalCorrect : 0}/
                              {result ? result?.totalQuestion : 0}
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-evenly mb-3">
                            <PublishedWithChangesIcon style={{ flex: 1 }} />
                            <div className="h6" style={{ flex: 3 }}>
                              Độ chính xác (#đúng/#tổng)
                            </div>
                            <div className="h6" style={{ flex: 1 }}>
                              {result
                                ? (
                                    (result?.totalCorrect /
                                      result?.totalQuestion) *
                                    100.0
                                  ).toFixed(1)
                                : 0}
                              %
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-evenly mb-3">
                            <AccessTimeIcon style={{ flex: 1 }} />
                            <div className="h6" style={{ flex: 3 }}>
                              Thời gian hoàn thành
                            </div>
                            <div className="h6" style={{ flex: 1 }}>
                              {formatTimeHMS(totalTime)}
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <CheckCircleIcon className="w-100 my-2 color-done" />
                          <div className="h6 py-1 color-done">Trả lời đúng</div>
                          <div className="h4 py-1">{result?.totalCorrect}</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <DangerousIcon className="w-100 my-2 color-error" />
                          <div className="h6 py-1 color-error">Trả lời sai</div>
                          <div className="h4 py-1">{result?.totalWrong}</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <ErrorIcon className="w-100 my-2 color-pass" />
                          <div className="h6 py-1 color-pass">Bỏ qua</div>
                          <div className="h4 py-1">{result?.totalSkipped}</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <div className="title-center">Phân tích chi tiết</div>
                  <div className="table-wrapper">
                    <table className="table table-striped">
                      <thead>
                        <tr>
                          <th style={{ minWidth: "200px" }}>
                            Phân loại câu hỏi
                          </th>
                          <th>Số câu đúng</th>
                          <th>Số câu sai</th>
                          <th>Số câu bỏ qua</th>
                          <th>Độ chính xác</th>
                          <th style={{ minWidth: "300px" }}>
                            Danh sách câu hỏi
                          </th>
                        </tr>
                      </thead>
                      <tbody>
                        <tr>
                          <td>N/A</td>
                          <td>{result?.totalCorrect}</td>
                          <td>{result?.totalWrong}</td>
                          <td>{result?.totalSkipped}</td>
                          <td>
                            {result
                              ? (
                                  (result?.totalCorrect /
                                    result?.totalQuestion) *
                                  100.0
                                ).toFixed(1)
                              : 0}
                            %
                          </td>
                          <td className="d-flex flex-wrap">
                            {questionRes.length > 0 &&
                              questionRes.map((q, index) => {
                                let colorClass;
                                if (q.correct === true) {
                                  colorClass = "color-correct";
                                } else if (q.correct === false) {
                                  colorClass = "color-error";
                                } else {
                                  colorClass = "color-pass";
                                }
                                return (
                                  <div
                                    key={index}
                                    className={`wrap-question ${colorClass}`}
                                  >
                                    <div className="question">{index + 1}</div>
                                  </div>
                                );
                              })}
                          </td>
                        </tr>
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </Col>
          <Col md={3} xs={12}>
            <div className="user-target-info-box">
              <Image src={UserImage} roundedCircle height={70} />
              <div className="text-center">
                <strong>20130302</strong>
              </div>
              <div className="user-target-info">
                <p>
                  <i className="user-sub">
                    <ErrorOutlineIcon className="icon" />
                    <span>
                      Bạn chưa tạo mục tiêu cho quá trình luyện thi của mình.
                    </span>
                    <Link className="link" href="/">
                      Tạo ngay
                    </Link>
                    .
                  </i>
                </p>
                <div className="mt-3">
                  <Button
                    className="w-100 mt-3 btn-custom"
                    variant="outline-secondary"
                  >
                    <StackedLineChartIcon /> Thống kê kết quả
                  </Button>
                </div>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
      <Footer />
    </div>
  );
}

export default Result;
