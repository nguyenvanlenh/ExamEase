import { v4 as uuidv4 } from 'uuid';
import "./ListExams.scss"
import UserImage from "../../data/imgs/user_icon.webp"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Button, Form, Image, InputGroup, ListGroup, Nav, NavDropdown, Pagination, Row, Spinner, Stack } from "react-bootstrap"
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CardItemExam } from "../../components/CardItemExam/CardItemExam"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { examService } from '../../services/examService';
import { getDataByKeyLS, setDataByKeyLS } from '../../utils/common';
import { categoryService } from '../../services/categoryService';


export const ListExams = () => {
    const [listExams, setListExams] = useState([]);
    const [listCate, setListCate] = useState(getDataByKeyLS("category"));
    const [currentPage, setCurrentPage] = useState(0);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [suggestions, setSuggestions] = useState();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [category, setCategory] = useState("");



    // tải dữ liệu lúc đầu và theo dõi khi chuyển trang hoặc là chọn danh mục
    useEffect(() => {
        const fetching = async () => {
            const response = await examService.searching(searchQuery, category, currentPage);
            setListExams(response?.data.content);
            setTotalPages(response?.data.totalPage);

            if (!getDataByKeyLS("category")) {
                const categoryData = await categoryService.getAll()
                setListCate(categoryData?.data)
                setDataByKeyLS("category", categoryData?.data)
            }
        };
        fetching();
    }, [currentPage, category]);

    // xử lý khi click chọn category
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (cate) => {
        if (category == cate) {
            setCategory("")
            setSelectedCategory(null);
        }
        else {
            setCategory(cate)
            setSelectedCategory(cate);
        }
    };
    // xử lý tìm kiếm
    const handleSearch = async () => {
        setShowSuggestions(false)
        setSearchQuery(searchQuery)
        const response = await examService.searching(searchQuery, category, currentPage);
        setListExams(response?.data.content);
        setTotalPages(response?.data.totalPage);
    };

    // xử lý auto complete search
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query.length > 0) {
            setShowSuggestions(true);
            const fetching = async () => {
                const response = await examService.searching(query, category);
                setSuggestions(response?.data.content)
            }
            fetching();
        } else {
            setShowSuggestions(false);
        }
    };
    // xử lý phân trang
    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    // xử lý loading Spinner sau 2,5s không có kết quả thì trả về not found
    const [timeoutReached, setTimeoutReached] = useState(false);
    useEffect(() => {
        const timer = setTimeout(() => {
            if (!listExams || listExams.length === 0) {
                setTimeoutReached(true);
            }
        }, 4500);

        return () => clearTimeout(timer);
    }, [listExams]);

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
                                            <Link to={"/statistics"}
                                                className="w-100 mt-3 btn btn-custom"
                                                variant="outline-secondary"
                                            >
                                                <StackedLineChartIcon /> Thống kê kết quả
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="col-12 col-md-9 order-md-1">
                                <h1>
                                    Thư viện đề thi
                                </h1>
                                <Nav className="nav-pills flex-wrap mt-2 mb-3" style={{ gap: '10px' }}>
                                    {listCate?.map((item, index) => (
                                        <Nav.Item key={index}>
                                            <Nav.Link
                                                onClick={() => handleCategoryClick(item.name)}
                                                style={{
                                                    border: item.name === selectedCategory ? '1px solid gray' : 'none'
                                                }}
                                            >
                                                {item.name}
                                            </Nav.Link>
                                        </Nav.Item>
                                    ))}
                                </Nav>

                                {/* <div className="
                                test-books nav-horizontal nav-horizontal-twolevels
                                pt-3 pb-3">
                                    <Link to="/" className="test-book " href="/">2024</Link>
                                    <Link to="/" className="test-book " href="/">2023</Link>
                                    <Link to="/" className="test-book " href="/">2022</Link>
                                    <Link to="/" className="test-book " href="/">2021</Link>
                                </div> */}
                                <div className="position-relative">
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi ..."
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                        />
                                        <Button className="btn-search" onClick={handleSearch}>
                                            Tìm kiếm
                                        </Button>
                                    </InputGroup>
                                    {showSuggestions && (
                                        <ListGroup className="position-absolute w-100" style={{ zIndex: 9999 }}>
                                            {suggestions?.map((result) => {
                                                return <ListGroup.Item> <Link to={"/"}  >{result.title}</Link></ListGroup.Item>
                                            })}
                                        </ListGroup>
                                    )}
                                </div>

                            </div>
                        </Row>
                        <Stack direction="horizontal" className="nav nav-tabs" gap={3}>
                            <div className={`nav-item`}>
                                <button className={`nav-link active`}>
                                    Tất cả
                                </button>
                            </div>
                        </Stack>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row pt-3 pb-3">
                            {listExams && listExams.length > 0 ? (
                                listExams.map((exam) => (
                                    <CardItemExam key={exam.id || uuidv4()} exam={exam} />
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
                            <Pagination className="pagination">
                                <Pagination.First onClick={() => handlePageChange(0)} />
                                <Pagination.Prev
                                    onClick={() => handlePageChange(Math.max(0, currentPage - 1))}
                                    disabled={currentPage === 0}
                                />
                                {Array.from({ length: totalPages }, (_, index) => (
                                    <Pagination.Item
                                        key={index}
                                        active={index === currentPage}
                                        onClick={() => handlePageChange(index)}
                                    >
                                        {index + 1}
                                    </Pagination.Item>
                                ))}
                                <Pagination.Next
                                    onClick={() => handlePageChange(Math.min(totalPages - 1, currentPage + 1))}
                                    disabled={currentPage === totalPages - 1}
                                />
                                <Pagination.Last onClick={() => handlePageChange(totalPages - 1)} />
                            </Pagination>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}