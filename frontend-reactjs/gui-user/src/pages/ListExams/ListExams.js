import axios from 'axios';
import "./ListExams.scss"
import UserImage from "../../data/imgs/user_icon.webp"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Button, Form, Image, InputGroup, Nav, NavDropdown, Pagination, Row, Stack } from "react-bootstrap"
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { CardItemExam } from "../../components/CardItemExam/CardItemExam"
import { useState } from "react"
import { Link } from "react-router-dom"
import { RequestData } from "../../utils/request"
import { authService } from '../../services/authService';
import { URL_PATH } from '../../utils/constants';
import { examService } from '../../services/examService';
export const ListExams = () => {
    const requestData = RequestData();
    const listExam = [1, 2, 3, 4, 5, 6];
    const [activeTab, setActiveTab] = useState(0);
    const tabs = [
        { label: "Tất cả", data: "" },
        { label: "Đề rút gọn", data: "" },
    ];



    const loginRequest = requestData.LoginRequest("teacher", "12345678")

    const handleLogin = async (requestData) => {
        const data = await authService.login(requestData)
        if (data?.status < 400) {
            console.log(data.data)
        } else {
            console.error(data.data)
        }
    }

    // handleLogin(loginRequest)

    const registerRequest = requestData.RegisterRequest(
        "nguyenvanlenh",
        "123456789",
        "vanlenh2k@gmail.com",
        []);
    const handleRegister = async (requestData) => {
        const data = await authService.register(requestData);
        if (data?.status < 400) {
            console.log(data.data.data)
        } else {
            console.table(data.data)
        }
    }

    // handleRegister(registerRequest)
    const [isPublic, setPublic] = useState(false);
    const handleUpdatePublic = async (isPublic) => {
        const data = await examService.updatePublic("ds", isPublic)
        if (data?.status < 400) {
            console.log(data)
        } else {
            console.error(data.data)
        }
    }
    handleUpdatePublic(isPublic)

    const handleSearch = () => {
        console.log('Perform search...');
    };

    const handleTabChange = (tabIndex) => {
        setActiveTab(tabIndex);
    };
    return (
        <>
            <Header />
            <div className="site-content-wrapper" id="list-exams-wrapper">
                <div className="content-header pt-5">
                    <div className="container pb-0">
                        <Row>
                            <div className="col-12 col-md-3 order-md-2">
                                <div className="user-target-info-box">
                                    <Image src={UserImage} roundedCircle height={70} />
                                    <div className="text-center">
                                        <strong>20130303</strong>
                                    </div>
                                    <div className="user-target-info">
                                        <p>
                                            <i>Bạn chưa tạo mục tiêu cho quá trình luyện thi của mình.
                                                <Link to="/" href="/" >Tạo ngay</Link>.
                                            </i>
                                        </p>
                                        <div className="mt-3">
                                            <Link to="/statistics" className="w-100 mt-3 btn btn-outline-secondary"
                                            ><StackedLineChartIcon /> Thống kê kết quả</Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-9 order-md-1">
                                <h1>
                                    Thư viện đề thi
                                </h1>
                                <Nav className="nav-pills flex-wrap" style={{ gap: '10px' }}>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Toán</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Vật lý</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Hóa học</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Tiếng anh</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Ngữ văn</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Sinh học</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Lịch sử</Nav.Link>
                                    </Nav.Item>
                                    <Nav.Item>
                                        <Nav.Link href="/tests/ielts/">Khác</Nav.Link>
                                    </Nav.Item>
                                </Nav>

                                <div className="
                                test-books nav-horizontal nav-horizontal-twolevels
                                pt-3 pb-3">
                                    <Link to="/" className="test-book " href="/">2024</Link>
                                    <Link to="/" className="test-book " href="/">2023</Link>
                                    <Link to="/" className="test-book " href="/">2022</Link>
                                    <Link to="/" className="test-book " href="/">2021</Link>
                                </div>

                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi ..."
                                    />
                                    <Button variant="secondary" onClick={handleSearch}>
                                        Tìm kiếm
                                    </Button>
                                </InputGroup>

                            </div>
                        </Row>
                        <Stack direction="horizontal" className="nav nav-tabs" gap={3}>
                            {tabs.map((tab, index) => (
                                <div key={index} className={`nav-item`}>
                                    <button
                                        className={`nav-link ${activeTab === index ? 'active' : ''}`}
                                        onClick={() => handleTabChange(index)}
                                    >
                                        {tab.label}
                                    </button>
                                </div>
                            ))}
                        </Stack>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row pt-3 pb-3">
                            {listExam.map((exam, index) => {
                                return <CardItemExam key={index} />;
                            })}
                            <Pagination>
                                <Pagination.First />
                                <Pagination.Prev />
                                <Pagination.Item>{1}</Pagination.Item>
                                <Pagination.Ellipsis />

                                <Pagination.Item>{10}</Pagination.Item>
                                <Pagination.Item>{11}</Pagination.Item>
                                <Pagination.Item active>{12}</Pagination.Item>
                                <Pagination.Item>{13}</Pagination.Item>
                                <Pagination.Item disabled>{14}</Pagination.Item>

                                <Pagination.Ellipsis />
                                <Pagination.Item>{20}</Pagination.Item>
                                <Pagination.Next />
                                <Pagination.Last />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )



}