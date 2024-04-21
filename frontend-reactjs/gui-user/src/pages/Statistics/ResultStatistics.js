import './ResultStatistics.scss'
import { Button, Card, Col, Form, InputGroup, Nav, Row, Table } from "react-bootstrap"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Link } from "react-router-dom";
export const ResultStatistics = () => {
    return (
        <>
            <Header />
            <div className="result-statistics" id="result-statistics">
                <div className="content-header pt-5">

                    <div className="container">
                        <h1 className="mb-4"><StackedLineChartIcon accentHeight={60} /> Thống kê kết quả làm bài</h1>
                        <Nav variant="tabs" defaultActiveKey="#result-statistics">
                            <Nav.Item>
                                <Nav.Link href="#result-statistics">Toán</Nav.Link>
                            </Nav.Item>
                            <Nav.Item>
                                <Nav.Link eventKey="link-1">Hóa học</Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row pt-3 pb-3">
                            <Col md={9}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi ..."
                                    />
                                    <Button variant="primary" onClick={() => { }}>
                                        Tìm kiếm
                                    </Button>
                                </InputGroup>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" style={{ height: '13rem' }}>
                                            <Card.Body className="border 
                                    rounded 
                                    d-flex flex-column justify-content-center
                                    align-items-center">
                                                <Card.Title className="text-secondary"><ImportContactsIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Số đề đã làm</Card.Title>
                                                <Card.Title>1</Card.Title>
                                                <Card.Subtitle>đề thi</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" style={{ height: '13rem' }}>
                                            <Card.Body className="border 
                                    rounded 
                                    d-flex flex-column justify-content-center
                                    align-items-center">
                                                <Card.Title className="text-secondary"><AccessTimeIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Thời gian làm bài</Card.Title>
                                                <Card.Title>130</Card.Title>
                                                <Card.Subtitle>phút</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" style={{ height: '13rem' }}>
                                            <Card.Body className="border 
                                    rounded 
                                    d-flex flex-column justify-content-center
                                    align-items-center">
                                                <Card.Title className="text-secondary"><SportsScoreIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Điểm cao nhất</Card.Title>
                                                <Card.Title>97</Card.Title>
                                                <Card.Subtitle>điểm</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>

                                </Row>
                                <Row>
                                    <h5>Danh sách đề thi đã làm:</h5>
                                    <Table hover>
                                        <thead>
                                            <tr>
                                                <th>Ngày làm</th>
                                                <th>Đề thi</th>
                                                <th>Kết quả</th>
                                                <th>Thời gian làm bài</th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>03/04/2024</td>
                                                <td>Đề THPT môn Toán năm 2023</td>
                                                <td>35/50</td>
                                                <td>45 phút</td>
                                                <td> <Link to={"/"}>Xem chi tiết</Link> </td>
                                            </tr>
                                            <tr>
                                                <td>20/04/2024</td>
                                                <td>Đề Hóa học trường THPT Huỳnh Thúc Kháng</td>
                                                <td>30/40</td>
                                                <td>40 phút</td>
                                                <td> <Link to={"/"}>Xem chi tiết</Link> </td>
                                            </tr>
                                        </tbody>
                                    </Table>
                                </Row>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    )
}