import React, { useState } from "react";
import { Button, Col, Container, Image, Row, Stack } from "react-bootstrap";
import StackedLineChartIcon from "@mui/icons-material/StackedLineChart";
import UserImage from "../../data/imgs/user_icon.webp";
import "./Result.scss";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import { Link } from "react-router-dom";
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import DoneIcon from "@mui/icons-material/Done";
import PublishedWithChangesIcon from "@mui/icons-material/PublishedWithChanges";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import ErrorIcon from "@mui/icons-material/Error";
import DangerousIcon from "@mui/icons-material/Dangerous";
function Result() {
  const handleTabNumber = (number) => {};
  return (
    <div id="id-result">
      <Header />
      <Container className="wrap" fluid>
        <Row className="mg">
          <Col md={9} xs={12}>
            <div className="content-block">
              <h1 className="title">
                Kết quả luyện tập: Practice Set 2023 TOEIC Test 10
              </h1>
              <div className="tab-container">
                <Stack direction="horizontal" gap={2}>
                  <Button
                    onClick={() => handleTabNumber(0)}
                    className={`tab-pill active `}
                  >
                    Xem đáp án
                  </Button>
                  <Button
                    onClick={() => handleTabNumber(1)}
                    className={`tab-pill active2`}
                  >
                    Quay về trang đề
                  </Button>
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
                              1/40
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-evenly mb-3">
                            <PublishedWithChangesIcon style={{ flex: 1 }} />
                            <div className="h6" style={{ flex: 3 }}>
                              Độ chính xác (#đúng/#tổng)
                            </div>
                            <div className="h6" style={{ flex: 1 }}>
                              25.0%
                            </div>
                          </div>
                          <div className="d-flex flex-row justify-content-evenly mb-3">
                            <AccessTimeIcon style={{ flex: 1 }} />
                            <div className="h6" style={{ flex: 3 }}>
                              Thời gian hoàn thành
                            </div>
                            <div className="h6" style={{ flex: 1 }}>
                              0:00:17
                            </div>
                          </div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <CheckCircleIcon className="w-100 my-2 color-done" />
                          <div className="h6 py-1 color-done">Trả lời đúng</div>
                          <div className="h4 py-1">1</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <DangerousIcon className="w-100 my-2 color-error" />
                          <div className="h6 py-1 color-error">Trả lời sai</div>
                          <div className="h4 py-1">1</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                      <Col xs={12} sm={12} md={3}>
                        <div className="d-flex flex-column justify-content-center c2">
                          <ErrorIcon className="w-100 my-2 color-pass" />
                          <div className="h6 py-1 color-pass">Bỏ qua</div>
                          <div className="h4 py-1">1</div>
                          <div className="h6 py-1">câu hỏi</div>
                        </div>
                      </Col>
                    </Row>
                  </Container>
                  <div className="title-center">Phân tích chi tiết</div>
                  <div class="table-wrapper">
                    <table class="table table-striped">
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
                          <td>1</td>
                          <td>3</td>
                          <td>36</td>
                          <td>25.00%</td>
                          <td className="d-flex flex-wrap">
                            <div className="wrap-question color-error">
                              <div className="question">1</div>
                            </div>
                            <div className="wrap-question color-correct">
                              <div className="question">2</div>
                            </div>
                            <div className="wrap-question color-pass">
                              <div className="question">3</div>
                            </div>
                            <div className="wrap-question color-error">
                              <div className="question">1</div>
                            </div>
                            <div className="wrap-question color-correct">
                              <div className="question">2</div>
                            </div>
                            <div className="wrap-question color-pass">
                              <div className="question">3</div>
                            </div>
                            <div className="wrap-question color-error">
                              <div className="question">1</div>
                            </div>
                            <div className="wrap-question color-correct">
                              <div className="question">2</div>
                            </div>
                            <div className="wrap-question color-pass">
                              <div className="question">3</div>
                            </div>
                            <div className="wrap-question color-error">
                              <div className="question">1</div>
                            </div>
                            <div className="wrap-question color-correct">
                              <div className="question">2</div>
                            </div>
                            <div className="wrap-question color-pass">
                              <div className="question">3</div>
                            </div>
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
