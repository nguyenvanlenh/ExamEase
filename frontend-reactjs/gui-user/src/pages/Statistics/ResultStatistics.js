import './ResultStatistics.scss';
import { Button, Card, Col, Form, InputGroup, Row, Table } from "react-bootstrap";
import Footer from "../../components/footer/Footer";
import Header from "../../components/header/Header";
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import ImportContactsIcon from '@mui/icons-material/ImportContacts';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import SportsScoreIcon from '@mui/icons-material/SportsScore';
import { Link } from "react-router-dom";
import { useSelector } from 'react-redux';
import { resultBest, selectTotalTimeSpent, totalExams } from '../../redux/slices/examWorkedSlice';
import { useState } from 'react';

export const ResultStatistics = () => {
    const totalTimeWorked = useSelector(selectTotalTimeSpent);
    const totalExamsWorked = useSelector(totalExams);
    const resultBestWorked = useSelector(resultBest);
    const examWorkeds = useSelector(state => state.examWorkeds);
    
    const [searchQuery, setSearchQuery] = useState("");

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    const filteredExamWorkeds = examWorkeds.filter(exam =>
        exam.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        exam.workDayHanle.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            <Header />
            <div className="result-statistics" id="result-statistics">
                <div className="content-header pt-5">
                    <div className="container pb-5">
                        <h1 className="mb-4"><StackedLineChartIcon accentHeight={60} /> Thống kê kết quả làm bài</h1>
                    </div>
                </div>
                <div className="content-wrapper">
                    <div className="container">
                        <div className="row pt-3 pb-3">
                            <Col md={9}>
                                <InputGroup className="mb-3">
                                    <Form.Control
                                        placeholder="Nhập từ khoá bạn muốn tìm kiếm: tên đề thi, ngày làm bài ..."
                                        value={searchQuery}
                                        onChange={handleSearch}
                                    />
                                    <Button className="btn-search" variant="primary" onClick={() => { }}>
                                        Tìm kiếm
                                    </Button>
                                </InputGroup>
                                <Row>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" className="card-statistics">
                                            <Card.Body className="rounded d-flex flex-column justify-content-center align-items-center">
                                                <Card.Title className="text-secondary"><ImportContactsIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Số đề đã làm</Card.Title>
                                                <Card.Title>{totalExamsWorked}</Card.Title>
                                                <Card.Subtitle>đề thi</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" className="card-statistics">
                                            <Card.Body className="rounded d-flex flex-column justify-content-center align-items-center">
                                                <Card.Title className="text-secondary"><AccessTimeIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Thời gian làm bài</Card.Title>
                                                <Card.Title>{totalTimeWorked}</Card.Title>
                                                <Card.Subtitle>phút</Card.Subtitle>
                                            </Card.Body>
                                        </Card>
                                    </Col>
                                    <Col md={4} className="mb-3">
                                        <Card border="light" className="card-statistics">
                                            <Card.Body className="rounded d-flex flex-column justify-content-center align-items-center">
                                                <Card.Title className="text-secondary"><SportsScoreIcon /> </Card.Title>
                                                <Card.Title className="text-secondary">Điểm cao nhất</Card.Title>
                                                <Card.Title>{resultBestWorked}</Card.Title>
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
                                            {
                                                filteredExamWorkeds.map(exam => (
                                                    <tr key={exam.id}>
                                                        <td>{exam.workDayHanle}</td>
                                                        <td>{exam.title}</td>
                                                        <td>{exam.resultHandle}</td>
                                                        <td>{exam.time} phút</td>
                                                        <td> <Link to={"/result"} state={{ idExamNumber: exam.idExamNumber }}>Xem chi tiết</Link> </td>
                                                    </tr>
                                                ))
                                            }
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
    );
};
