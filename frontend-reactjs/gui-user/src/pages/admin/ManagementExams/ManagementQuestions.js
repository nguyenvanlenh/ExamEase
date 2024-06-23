import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Nav, Row, Table, Modal, Form, Stack } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { examService } from '../../../services/examService';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import '../../ManagementQuestion/ManagementQuestion.scss';
import { questionService } from '../../../services/questionService';
import { ErrorModal, SendMailModal, SuccessModal } from '../../../components/Modal/ModalComponent';
import { RequestData } from '../../../utils/request';
import { resultService } from '../../../services/resultService';
import FileDownloadIcon from '@mui/icons-material/FileDownload';
import StackedLineChartIcon from '@mui/icons-material/StackedLineChart';
import { caculatorScore } from '../../../utils/common';
import { Chart as ChartJS } from 'chart.js/auto';
import { Line, PolarArea } from 'react-chartjs-2';

export const Questions = () => {
    const location = useLocation();
    const id = location.state;
    const [dataExam, setDataExam] = useState();
    const [dataResult, setDataResult] = useState();
    const [activeTab, setActiveTab] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [showMailModal, setShowMailModal] = useState(false);
    const [showChartsModal, setShowChartsModal] = useState(false);
    const [editableQuestion, setEditableQuestion] = useState(null);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);
    const [showSuccessAlertSendMail, setShowSuccessAlertSendMail] = useState(false);
    const [showErrorAlertSendMail, setShowErrorAlertSendMail] = useState(false);

    const fetchingDataExam = async (id) => {
        const data = await examService.getExamById(id);
        setDataExam(data?.data);
        if (data.data && data.data.examNumbers && data.data.examNumbers.length > 0) {
            setActiveTab(data.data.examNumbers[0].id);
        }
    };
    const fetchingDataResultOfStudents = async (codeGroup) => {
        const data = await resultService.getAllResultOfStudentByCodeGroup(codeGroup);
        console.log(data.data.listResult);
        setDataResult(data.data.listResult);
    };

    useEffect(() => {
        fetchingDataExam(id);
    }, [id, showSuccessAlert]);

    useEffect(() => {
        if (activeTab === "student-list")
            fetchingDataResultOfStudents(dataExam?.codeGroup);
    }, [activeTab]);

    const handleShowModal = (question) => {
        setEditableQuestion({ ...question });
        setShowModal(true);
    };

    const handleCloseModal = () => {
        setShowModal(false);
        setEditableQuestion(null);
    };

    const handleInputChange = (e, optionIdx) => {
        const { name, value } = e.target;
        if (name === 'question') {
            setEditableQuestion({ ...editableQuestion, nameQuestion: value });
        } else {
            const updatedOptions = editableQuestion.options?.map((option, idx) =>
                idx === optionIdx ? { ...option, nameOption: value } : option
            );
            setEditableQuestion({ ...editableQuestion, options: updatedOptions });
        }
    };

    const handleSaveChanges = async () => {
        const listOptionOfQuestion = editableQuestion.options?.map(option => {
            return RequestData().OptionRequest(option.id, option.nameOption, option.correct)
        })
        const questionRequest = RequestData().QuestionRequest(editableQuestion.id, editableQuestion.nameQuestion, listOptionOfQuestion)
        console.log(questionRequest);
        const response = await questionService.updateQuestion(questionRequest, editableQuestion.id)
        if (response.status < 400) {
            handleCloseModal();
            setShowSuccessAlert(true);
        } else {
            console.error("Error updating exam:", response.statusText);
            setShowErrorAlert(true);
        }
    };

    const handleExport = async () => {
        return await resultService.exportFileResultByCodeGroup(dataExam?.codeGroup);
    };

    const processResultsForCharts = () => {
        const scoreCounts = new Array(21).fill(0); // Array to hold counts for each 0.5 increment from 0 to 10
        if (dataResult) {
            dataResult.forEach((result) => {
                const score = caculatorScore(result.totalQuestion, result.totalCorrect);
                const index = Math.round(score * 2);
                scoreCounts[index]++;
            });
        }
        return scoreCounts;
    };

    const generateLineChartData = () => {
        const scoreCounts = processResultsForCharts();
        return {
            labels: Array.from({ length: 21 }, (_, i) => (i / 2).toString()),
            datasets: [
                {
                    label: 'Số học sinh',
                    data: scoreCounts,
                    fill: false,
                    backgroundColor: 'rgba(75,192,192,1)',
                    borderColor: 'rgba(75,192,192,1)',
                    tension: 0.1
                }
            ]
        };
    };

    const generatePolarAreaChartData = () => {
        const scoreCounts = processResultsForCharts();
        return {
            labels: Array.from({ length: 21 }, (_, i) => (i / 2).toString()),
            datasets: [
                {
                    label: 'Số học sinh',
                    data: scoreCounts,
                    backgroundColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)',
                        'rgba(54, 162, 235, 1)',
                        'rgba(255, 206, 86, 1)',
                        'rgba(75, 192, 192, 1)',
                        'rgba(153, 102, 255, 1)',
                        'rgba(255, 159, 64, 1)'
                    ],
                    borderWidth: 1
                }
            ]
        };
    };

    const handleSendMail = async () => {
        const codeGroup = dataExam?.codeGroup;
        const response = await resultService.sendMailResultForStudent(codeGroup);
        if (response.status < 400) {
            setShowMailModal(false)
            setShowSuccessAlertSendMail(true)
        } else {
            console.error("Error updating exam:", response.statusText);
            setShowErrorAlertSendMail(true);

        }
    }

    return (
        <>
            <Container fluid="md">
                <div className="manage-question mt-3 mb-3">
                    <Row>
                        <h1 className="title mt-2 mb-4">{dataExam?.title}</h1>
                    </Row>
                    <Row className="d-flex">
                        <Nav variant="tabs" activeKey={activeTab}>
                            {
                                dataExam && dataExam.examNumbers?.map((examNumber, index) => (
                                    <Nav.Item key={examNumber.id}>
                                        <Nav.Link
                                            eventKey={examNumber.id}
                                            onClick={() => {
                                                setActiveTab(examNumber.id);
                                                setTabIndex(index);
                                            }}
                                        >
                                            Đề {examNumber.name}
                                        </Nav.Link>
                                    </Nav.Item>
                                ))
                            }
                            <Nav.Item>
                                <Nav.Link
                                    eventKey="student-list"
                                    onClick={() => {
                                        setActiveTab("student-list");
                                    }}
                                >
                                    Danh sách người dùng đã làm
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col>

                            {activeTab === "student-list" ? (<>
                                <Stack direction="horizontal" gap={3}>
                                    <Button variant="outline-danger" className="p-2 ms-auto"
                                        onClick={() => setShowChartsModal(true)}
                                    >
                                        <StackedLineChartIcon />
                                        Thống kê kết quả</Button>
                                    <Button variant="outline-success" className="p-2"
                                        onClick={handleExport}
                                    >
                                        <FileDownloadIcon />
                                        Xuất file Excel</Button>
                                </Stack>
                                <hr />
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th className="text-center">#</th>
                                            <th>Họ và Tên</th>
                                            <th>Email</th>
                                            <th>Đề thi</th>
                                            <th className="text-center">Tổng số câu</th>
                                            <th className="text-center">Số câu đúng</th>
                                            <th className="text-center">Số câu sai</th>
                                            <th className="text-center">Điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataResult && dataResult?.map((rs, index) => {
                                                return (
                                                    <tr key={index}>
                                                        <td>{rs.studentCode}</td>
                                                        <td>{rs.fullName}</td>
                                                        <td>{rs.email}</td>
                                                        <td>{rs.examNumberName}</td>
                                                        <td className="text-center">{rs.totalQuestion}</td>
                                                        <td className="text-center text-success">{rs.totalCorrect}</td>
                                                        <td className="text-center text-danger">{rs.totalWrong}</td>
                                                        <td className="text-center"><strong>{caculatorScore(rs.totalQuestion, rs.totalCorrect)}</strong></td>
                                                    </tr>
                                                )
                                            })
                                        }<tr>
                                            <td ><strong>Tổng sỉ số:</strong></td>
                                            <td colSpan={7}>{dataResult?.length}</td>
                                        </tr>


                                    </tbody>
                                </Table>
                            </>
                            ) : (
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th style={{ width: '90%' }}>Câu hỏi</th>
                                            <th style={{ width: '10%' }}>Kiểm tra</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {
                                            dataExam && dataExam?.examNumbers[tabIndex].listQuestions?.map((question, index) => (
                                                <tr key={index}>
                                                    <td style={{ width: '90%' }}>Câu {index + 1}: {question.nameQuestion}</td>
                                                    <td style={{ width: '10%' }}>
                                                        <Button variant="link" onClick={() => handleShowModal(question)}>
                                                            <VerifiedUserIcon color="success" />
                                                        </Button>
                                                    </td>
                                                </tr>
                                            ))
                                        }
                                        <tr>
                                            <td colSpan={2}><strong>Tổng số câu:{dataExam?.examNumbers[tabIndex]?.listQuestions?.length}</strong></td>
                                        </tr>
                                    </tbody>
                                </Table>)}
                        </Col>
                    </Row>
                </div>
            </Container >

            <Modal show={showModal} onHide={handleCloseModal}>
                <Modal.Header closeButton>
                    <Modal.Title>Kiểm tra câu hỏi (<span className="text-success">Đúng</span> | <span className="text-danger">Sai</span>)</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    {editableQuestion && (
                        <>
                            <Form.Group className="mb-3">
                                <Form.Label>Câu hỏi</Form.Label>
                                <Form.Control
                                    as="textarea"
                                    type="text"
                                    name="question"
                                    value={editableQuestion.nameQuestion}
                                    onChange={handleInputChange}
                                />
                            </Form.Group>
                            {editableQuestion.options?.map((option, idx) => (
                                <Form.Group className="mb-3" key={option.id}>
                                    <Form.Label>Đáp án {idx + 1}</Form.Label>
                                    <Form.Control
                                        type="text"
                                        name={`option-${idx}`}
                                        value={option.nameOption}
                                        onChange={(e) => handleInputChange(e, idx)}
                                        className={`border-${option.correct ? 'success' : 'danger'}`}
                                    />
                                </Form.Group>
                            ))}
                        </>
                    )}
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleCloseModal}>
                        Đóng
                    </Button>
                    <Button variant="primary" onClick={handleSaveChanges}>
                        Cập nhật
                    </Button>
                </Modal.Footer>
            </Modal>

            <Modal show={showChartsModal} onHide={() => setShowChartsModal(false)} size="lg">
                <Modal.Header closeButton>
                    <Modal.Title>Thống kê kết quả</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className="d-flex flex-column flex-md-row align-items-center">
                        <div className="flex-fill mb-3 mb-md-0" style={{ minWidth: '300px' }}>
                            <Line
                                data={generateLineChartData()}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Biểu đồ đường',
                                            font: {
                                                size: 14,
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                        <div className="flex-fill" style={{ minWidth: '300px' }}>
                            <PolarArea
                                data={generatePolarAreaChartData()}
                                options={{
                                    plugins: {
                                        title: {
                                            display: true,
                                            text: 'Biểu đồ Polar',
                                            font: {
                                                size: 14,
                                            },
                                        },
                                    },
                                }}
                            />
                        </div>
                    </div>
                </Modal.Body>


                <Modal.Footer>
                    <Button variant="secondary" onClick={() => setShowChartsModal(false)}>
                        Đóng
                    </Button>
                </Modal.Footer>
            </Modal>

            <SuccessModal show={showSuccessAlert}
                notice={"Đã cập nhật câu hỏi thành công."}
                onClose={() => setShowSuccessAlert(false)} />
            <ErrorModal show={showErrorAlert}
                notice={"Đã xảy ra lỗi khi cập nhật câu hỏi. Vui lòng thử lại sau."}
                onClose={() => setShowErrorAlert(false)} />

            <SendMailModal
                show={showMailModal}
                notice="Bạn có muốn gửi kết quả bài thi này cho toàn bộ học sinh trong lớp này hay không?"
                onClose={() => setShowMailModal(false)}
                handleSendMail={handleSendMail}
            />
            <SuccessModal show={showSuccessAlertSendMail}
                notice={"Đã gửi mail thành công."}
                onClose={() => setShowSuccessAlertSendMail(false)} />
            <ErrorModal show={showErrorAlertSendMail}
                notice={"Đã xảy ra lỗi khi gửi. Vui lòng thử lại sau."}
                onClose={() => setShowErrorAlertSendMail(false)} />
        </>
    );
};
