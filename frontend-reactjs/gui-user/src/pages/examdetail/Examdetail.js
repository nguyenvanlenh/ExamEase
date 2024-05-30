import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Image,
  InputGroup,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import UserImage from "../../data/imgs/user_icon.webp";
import "./examdetail.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { examNumberService } from "../../services/examNumberService";
import { workTimeService } from "../../services/workTimeService";
import {
  authLocalStorage,
  examiningLocalStorage,
} from "../../utils/localStorage";
import { checkExaminingSwal } from "../../utils/mySwal";
import { useDispatch } from "react-redux";
import { addListQuestion } from "../../redux/slices/listQuestionSlice";
function Examdetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = authLocalStorage.get("auth");
  const times = {
    timeExam: [10, 15, 20, 25, 30, 40, 50, 60],
  };

  const [tabNumber, setTabNumber] = useState(0);
  const handleTabNumber = (number) => {
    setTabNumber(number);
  };

  const [examNumber, setExamNumber] = useState();
  const [time, setTime] = useState(45);
  const id = 2;

  async function dataExamNumber(id) {
    const data = await examNumberService.getExamNumberUser(id);
    setExamNumber(data.data);
    console.log(data.data);
  }
  useEffect(() => {
    dataExamNumber(id);
  }, []);

  const handleSubmit = async () => {
    try {
      // Directly call the service and handle the result
      const workTime = await workTimeService.addWorkTimeUser(auth?.userId, id, time);
      const data = await examNumberService.getExamNumberUser(id);

      if (workTime?.data) {
        console.log("tao thanh cong");
        setData(data)
        navigate("/examining");
      } else {
        console.log("Failed to add work time");
        const isConfirmed = await checkExaminingSwal();
        if (isConfirmed) {
          // gọi api xóa dữ liệu
          await workTimeService.removeWorkTimeAndUserAnswerUser(id, auth?.userId);
          await workTimeService.addWorkTimeUser(auth?.userId, id, time);
          setData(data)
          console.log("xóa");

          navigate("/examining");
        }
      }
    } catch (error) {
      console.error("Error adding work time:", error);
    }
  };

  function setData(data) {
    // setData cho redux, localStorage
    examiningLocalStorage.save(data.data);
    // fix chỗ này sau
    dispatch(addListQuestion(data.data?.examNumbers[0]?.listQuestions));
  }

  return (
    <div id="id-examdetail">
      <Header />
      <Container className="wrap" fluid>
        <Row className="mg">
          <Col md={9} xs={12}>
            <div className="content-block">
              <Stack direction="horizontal" gap={2}>
                <Badge pill bg="secondary">
                  # IELTS Academic
                </Badge>
                <Badge pill bg="secondary">
                  # IELTS Academic
                </Badge>
              </Stack>
              <h1 className="title">{examNumber?.title}</h1>
              <div className="tab-container">
                <Stack direction="horizontal" gap={2}>
                  <Button
                    onClick={() => handleTabNumber(0)}
                    className={`tab-pill ${tabNumber === 0 && "active"}`}
                  >
                    Thông tin đề thi
                  </Button>
                  <Button
                    onClick={() => handleTabNumber(1)}
                    className={`tab-pill ${tabNumber === 1 && "active"}`}
                  >
                    Đáp án/scripts
                  </Button>
                </Stack>
                <div className={`tab-content ${tabNumber === 0 || "d-none"}`}>
                  <ul className="list-sub">
                    <li>
                      <AccessTimeIcon />
                    </li>
                    <li>Thời gian làm bài: </li>
                    <li>{examNumber?.timeExam} |</li>
                    {/* <li>4 phần thi |</li> */}
                    <li>{examNumber?.quantityQuestion} câu hỏi </li>
                    {/* <li>244 bình luận</li> */}
                  </ul>
                  <ul className="list-sub">
                    <li>
                      <PersonIcon />
                    </li>
                    <li>105537 người đã luyện tập đề thi này</li>
                  </ul>
                  {examNumber?.category === "Anh văn" && (
                    <div className="notify">
                      Chú ý: để được quy đổi sang scaled score (ví dụ trên thang
                      điểm 990 cho TOEIC hoặc 9.0 cho IELTS), vui lòng chọn chế
                      độ làm FULL TEST.
                    </div>
                  )}

                  <Tabs
                    defaultActiveKey="luyentap"
                    id="uncontrolled-tab-example"
                    className="mb-3 custom-tabs"
                    variant="underline"
                  >
                    <Tab eventKey="luyentap" title="Luyện tập">
                      <Stack>
                        <Form>
                          <Form.Check
                            type="radio"
                            id="exam1"
                            name="examNumber"
                            label="Đề thi 1 (40 câu)"
                            defaultChecked
                          />
                          <Form.Check
                            type="radio"
                            id="exam2"
                            name="examNumber"
                            label="Đề thi 2 (40 câu)"
                          />
                        </Form>
                        <span className="note">
                          Giới hạn thời gian để trống mặc định là 45 phút
                        </span>

                        <Form.Select
                          aria-label="Default select example"
                          onChange={(e) => setTime(e.target.value)}
                        >
                          <option>-- Chọn thời gian --</option>
                          {times.timeExam.map((item, index) => (
                            <option key={index} value={item}>
                              {item} phút
                            </option>
                          ))}
                        </Form.Select>

                        <Button className="btn-custom" onClick={handleSubmit}>
                          Luyện tập
                        </Button>
                      </Stack>
                    </Tab>
                    <Tab eventKey="Thảo luận" title="Thảo luận">
                      Tab content for Profile
                    </Tab>
                    <Tab eventKey="contact" title="Contact">
                      Tab content for Contact
                    </Tab>
                  </Tabs>
                </div>
                <div className={`tab-content ${tabNumber === 1 || "d-none"}`}>
                  <span>Các phần thi:</span>
                  <ul>
                    <li>
                      <Link className="p-2">Đề 1</Link>
                    </li>
                    <li>
                      <Link className="p-2">Đề 2</Link>
                    </li>
                    <li>
                      <Link className="p-2">Đề 3</Link>
                    </li>
                    <li>
                      <Link className="p-2">Đề 4</Link>
                    </li>
                  </ul>
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

export default Examdetail;
