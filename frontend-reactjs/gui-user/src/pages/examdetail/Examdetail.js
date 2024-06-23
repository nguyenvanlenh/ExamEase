import React, { useEffect, useState } from "react";
import {
  Badge,
  Button,
  Col,
  Container,
  Form,
  Image,
  Row,
  Stack,
  Tab,
  Tabs,
} from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import UserImage from "../../data/imgs/user_icon.webp";
// import "./Examdetail.scss";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import PersonIcon from "@mui/icons-material/Person";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link, useLocation, useNavigate } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { examNumberService } from "../../services/examNumberService";
import { workTimeService } from "../../services/workTimeService";
import {
  examiningLocalStorage,
  idExamNumberLocalStorage,
} from "../../utils/localStorage";
import './examdetail.scss'
import { checkExaminingSwal } from "../../utils/mySwal";
import { useDispatch, useSelector } from "react-redux";
import { addListQuestion, removeQuestion } from "../../redux/slices/listQuestionSlice";
function Examdetail() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const auth = useSelector(state => state.auth)
  const location = useLocation();
  const id = location.state?.idExamNumber;
  const times = {
    timeExam: [10, 15, 20, 25, 30, 40, 50, 60],
  };

  const [tabNumber, setTabNumber] = useState(0);
  const handleTabNumber = (number) => {
    setTabNumber(number);
  };

  const [examNumber, setExamNumber] = useState();
  const [time, setTime] = useState(45);
  const [idExamNumber, setIdExamNumber] = useState(0);

  async function dataExamNumber(id) {
    const data = await examNumberService.getExamNumberUser(id);
    setExamNumber(data.data);
    setIdExamNumber(data.data?.examNumbers[0]?.id);
  }


  useEffect(() => {
    if (!id) {
      // Xử lý khi không có idExamNumber trong state
      console.log("idExamNumber không tồn tại trong state");
    } else {
      dataExamNumber(id);
      dispatch(removeQuestion())
    }

  }, []);

  const handleSubmit = async () => {
    try {
      // Directly call the service and handle the result
      const data = await examNumberService.getExamNumberUser(id);
      const workTime = await workTimeService.addWorkTimeUser(
        auth,
        idExamNumber,
        time
      );
      // kiểm tra đề đã thi chưa thi lại
      if (workTime?.data) {
        setData(data);
        navigate("/examining");
      } else {

        const isConfirmed = await checkExaminingSwal();
        if (isConfirmed) {
          // gọi api xóa dữ liệu
          await workTimeService.removeWorkTimeAndUserAnswerUser(
            idExamNumber,
            auth
          );
          await workTimeService.addWorkTimeUser(auth, idExamNumber, time);
          setData(data);
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
    idExamNumberLocalStorage.save(idExamNumber)
    // dispatch listQuestion chuẩn bị dữ liệu thi
    const selectedExam = data.data?.examNumbers.find((exam) => exam.id === idExamNumber);
    const listQuestions = selectedExam?.listQuestions;
    dispatch(addListQuestion(listQuestions));
  }
  const handleRadioChange = (id) => {
    setIdExamNumber(id);
  };
  return (
    <div id="id-examdetail">
      <Header />
      <Container className="wrap" fluid>
        <Row className="mg">
          <Col md={9} xs={12}>
            <div className="content-block">
              <Stack direction="horizontal" gap={2}>
                <Badge pill bg="secondary">
                  # {examNumber?.category}
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
                          {examNumber?.examNumbers.map((e, index) => (
                            <Form.Check
                              type="radio"
                              id={`exam${e.id}`}
                              name="examNumber"
                              label={`Đề thi ${index + 1} (${examNumber?.quantityQuestion} câu)`}
                              defaultChecked={index === 0}
                              key={index}
                              onChange={() => handleRadioChange(e.id)}
                            />
                          ))}
                        </Form>

                        <span className="note">
                          Giới hạn thời gian( để trống mặc định là 45 phút )
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
                    {examNumber?.examNumbers.map((e, index) => (
                      <li key={index}>
                        <Link to={`/test/${e.id}`} className="p-2">Đề {index + 1}</Link>
                      </li>
                    ))}
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
