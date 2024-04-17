
import "./ListExams.scss"
import UserImage from "../../data/imgs/user_icon.webp"

import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Badge, Button, Card, Col, Form, Image, InputGroup, Row, Stack } from "react-bootstrap"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
export const ListExams = () => {
    const handleSearch = () => {
        // Xử lý logic tìm kiếm ở đây khi người dùng nhấn nút "Search"
        console.log('Perform search...');
    };
    return (
        <>
            <Header />
            <div className="site-content-wrapper pt-4" id="list-exams-wrapper">
                <div className="content-header pd-0 gray-bg">
                    <div className="container pb-0">
                        <div className="row">
                            <div className="col-12 col-md-3 order-md-2">

                                <div className="user-target-info-box">
                                    <div className="user-target-user">
                                        <Image src={UserImage} roundedCircle height={70} />
                                        <div className="text-center font-weight-bold">
                                            <strong>20130303</strong>
                                        </div>
                                    </div>
                                    <div className="divider sm"></div>
                                    <div className="user-target-info">
                                        <p className="user-target-text-sm">
                                            <span className="far fa-exclamation-circle"></span>
                                            <i>Bạn chưa tạo mục tiêu cho quá trình luyện thi của mình.
                                                <a href="/" >Tạo ngay</a>.
                                            </i>
                                        </p>

                                        <div className="mt-3">
                                            <Button className="w-100 mt-3"
                                                variant="outline-secondary"><StackedLineChartIcon /> Thống kê kết quả</Button>
                                        </div>

                                    </div>
                                </div>
                                <br />


                            </div>

                            <div className="col-12 col-md-9 order-md-1">
                                <h1 id="thư-viện-đề-thi">
                                    Thư viện đề thi
                                </h1>
                                {/* <br />
                                <div className="test-exams">
                                    <ul className="nav nav-pills flex-wrap">

                                        <li className="nav-item w-auto">
                                            <a className="nav-link " href="/tests/ielts/">IELTS Academic</a>
                                        </li>

                                        <li className="nav-item w-auto">
                                            <a className="nav-link " href="/tests/ielts-general/">IELTS General</a>
                                        </li>

                                        <li className="nav-item w-auto">
                                            <a className="nav-link" href="/tests/toeic/">TOEIC</a>
                                        </li>

                                    </ul>
                                </div> */}
                                <Stack direction="horizontal" gap={3}>
                                    <div className="p-2"><a className="nav-link " href="/tests/ielts/">IELTS Academic</a></div>
                                    <div className="p-2"><a className="nav-link " href="/tests/ielts/">IELTS Academic</a></div>
                                    <div className="p-2"><a className="nav-link " href="/tests/ielts/">IELTS Academic</a></div>

                                </Stack>

                                <br />

                                <div className="test-books nav-horizontal nav-horizontal-twolevels">

                                    <a className="test-book " href="/">2024</a>

                                    <a className="test-book " href="/">2023</a>

                                    <a className="test-book " href="/">2022</a>


                                </div>
                                <br />

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên sách, dạng câu hỏi ..."
                                        aria-label="Search exam"
                                        aria-describedby="basic-addon2"
                                    />
                                    <Button variant="secondary" id="basic-addon2" onClick={handleSearch}>
                                        Search
                                    </Button>
                                </InputGroup>

                            </div>
                        </div>

                        <ul className="nav nav-tabs">
                            <li className="nav-item">
                                <a className="nav-link active" href="/tests/toeic/">Tất cả</a>
                            </li>

                            <li className="nav-item">
                                <a className="nav-link " href="/tests/toeic/mini/">Đề rút gọn</a>
                            </li>
                        </ul>
                    </div>

                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row pt-3 pb-3">
                            {/* <div className="col-12 col-md-9 d-flex"> */}
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                            <Col md={3} className="pb-2">
                                <Card>
                                    <Card.Body>
                                        <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                                        <Card.Text className="card-item-content">
                                            <div className="wrap">
                                                <span> <AccessTimeIcon /> 120 phút |</span>
                                                <span> <PersonOutlineIcon /> 14000 |</span>
                                                <span> <ChatBubbleOutlineIcon /> 30</span>
                                            </div>
                                            <div className="wrap">
                                                <span>3 đề thi |</span>
                                                <span> 40 câu hỏi</span>
                                            </div>
                                        </Card.Text>
                                        <Badge pill bg="secondary">
                                            #TOÁN
                                        </Badge>

                                        <Button className="w-100 mt-3"
                                            variant="outline-secondary">Chi tiết</Button>
                                    </Card.Body>
                                </Card>
                            </Col>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )



}