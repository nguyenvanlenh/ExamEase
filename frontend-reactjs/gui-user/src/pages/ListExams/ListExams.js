import { v4 as uuidv4 } from 'uuid';
import "./ListExams.scss"
import UserImage from "../../data/imgs/user_icon.webp"
import Footer from "../../components/footer/Footer"
import Header from "../../components/header/Header"
import { Button, Form, Image, InputGroup, ListGroup, Nav, Pagination, Row, Spinner, Stack } from "react-bootstrap"
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ErrorOutlineIcon from "@mui/icons-material/ErrorOutline";
import { CardItemExam } from "../../components/CardItemExam/CardItemExam"
import { useEffect, useState } from "react"
import { Link } from "react-router-dom"
import { examService } from '../../services/examService';
import { getDataByKeyLS, setDataByKeyLS } from '../../utils/common';
import { categoryService } from '../../services/categoryService';
import { useDispatch, useSelector } from 'react-redux';
import { removePage, setPage } from '../../redux/slices/pageSlice';
import { PaginationComponent } from '../../components/Pagination/Pagination';


export const ListExams = () => {
    const dispatch = useDispatch();
    const page = useSelector(state => state.page);
    const [listExams, setListExams] = useState([]);
    const [listCate, setListCate] = useState(getDataByKeyLS("category"));
    const [currentPage, setCurrentPage] = useState(!page ? 0 : page);
    const [totalPages, setTotalPages] = useState(1);
    const [searchQuery, setSearchQuery] = useState("");
    const [isSearch, setIsSearch] = useState(false)
    const [suggestions, setSuggestions] = useState();
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [category, setCategory] = useState("");
    const [selectedSuggestion, setSelectedSuggestion] = useState(-1);
    const [username, setUsername] = useState("user")
    useEffect(() => {
        const usernameLocal = JSON.parse(localStorage.getItem("username"));
        setUsername(usernameLocal);
    }, [])

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
    }, [currentPage, category, isSearch]);

    // xử lý khi click chọn category
    const [selectedCategory, setSelectedCategory] = useState(null);
    const handleCategoryClick = (cate) => {
        dispatch(removePage())
        setCurrentPage(0)
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
    const handleInputChange = (event) => {
        const query = event.target.value;
        setSearchQuery(query);
        if (query?.trim().length > 0) {
            setShowSuggestions(true);
            const fetching = async () => {
                const response = await examService.searching(query?.trim(), category);
                setSuggestions(response?.data.content);
                setSelectedSuggestion(-1);
            };
            fetching();
        } else {
            setShowSuggestions(false);
            setSelectedSuggestion(-1);
        }
    };

    const handleKeyDown = (event) => {
        if (event.key === 'ArrowUp') {
            setSelectedSuggestion((prev) => (prev > 0 ? prev - 1 : prev));
        } else if (event.key === 'ArrowDown') {
            setSelectedSuggestion((prev) =>
                prev < suggestions.length - 1 ? prev + 1 : prev
            );
        }
        else if (event.key === 'Enter') {
            if (selectedSuggestion !== -1) {
                handleSearchBySuggestion(suggestions[selectedSuggestion]);
                setIsSearch(true)
            } else {
                handleSearch();
            }
        }
    };

    // search core
    const handleSearch = async (title) => {
        if (!title && !searchQuery?.trim())
            return;
        dispatch(removePage())
        setCurrentPage(0)
        setShowSuggestions(false);
        const response = await examService.searching(
            title || searchQuery,
            category,
            currentPage
        );
        setListExams(response?.data.content);
        setTotalPages(response?.data.totalPage);
        setIsSearch(true)
    };
    // hủy search
    const handleCancelSearch = () => {
        setSearchQuery("");
        setIsSearch(false)
    }
    // search bằng gợi ý
    const handleSearchBySuggestion = (suggestion) => {
        setSearchQuery(suggestion.title);
        handleSearch(suggestion.title);
    };
    // xử lý phân trang
    const handlePageChange = (pageNumber) => {
        dispatch(setPage(pageNumber))
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
                                        <strong>{username}</strong>
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
                                <Nav className="nav-pills flex-wrap mt-4 mb-4" style={{ gap: '10px' }}>
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

                                <div className="position-relative">
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi ..."
                                            value={searchQuery}
                                            onChange={handleInputChange}
                                            onKeyDown={handleKeyDown}
                                        />
                                        {
                                            isSearch ?
                                                <Button className="btn-search" onClick={handleCancelSearch}>
                                                    Hủy
                                                </Button>
                                                :
                                                <Button className="btn-search" onClick={(e) => handleSearch(e.target.value)}>
                                                    Tìm kiếm
                                                </Button>
                                        }
                                    </InputGroup>
                                    {showSuggestions && (
                                        <ListGroup className="position-absolute w-100" style={{ zIndex: 9999 }}>
                                            {suggestions?.map((result, index) => (
                                                <ListGroup.Item
                                                    key={index}
                                                    onClick={() => {
                                                        setSearchQuery(result.title)
                                                        handleSearchBySuggestion(result)
                                                        // handleSearch(result.title)
                                                    }
                                                    }
                                                    className={index === selectedSuggestion ? 'selected' : ''}
                                                >
                                                    {result.title}
                                                </ListGroup.Item>
                                            ))}
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
                            <PaginationComponent
                                currentPage={currentPage}
                                totalPages={totalPages}
                                onPageChange={handlePageChange}
                            />
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>
    )
}