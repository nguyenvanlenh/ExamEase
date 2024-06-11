import React, { useState, useEffect } from 'react';
import { Button, Col, Container, Nav, Row, Table, Modal, Form } from 'react-bootstrap';
import { useLocation } from 'react-router-dom';
import { examService } from '../../services/examService';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import VerifiedUserIcon from '@mui/icons-material/VerifiedUser';
import './ManagementQuestion.scss';
import { questionService } from '../../services/questionService';
import { ErrorModal, SuccessModal } from '../../components/Modal/ModalComponent';
import { RequestData } from '../../utils/request';

export const ManagementQuestion = () => {
    const location = useLocation();
    const id = location.state;
    const [dataExam, setDataExam] = useState();
    const [activeTab, setActiveTab] = useState(null);
    const [tabIndex, setTabIndex] = useState(0);
    const [showModal, setShowModal] = useState(false);
    const [editableQuestion, setEditableQuestion] = useState(null);

    const [showSuccessAlert, setShowSuccessAlert] = useState(false);
    const [showErrorAlert, setShowErrorAlert] = useState(false);

    const fetchingDataExam = async (id) => {
        const data = await examService.getExamById(id);
        setDataExam(data.data);
        if (data.data && data.data.examNumbers && data.data.examNumbers.length > 0) {
            setActiveTab(data.data.examNumbers[0].id);
        }
    };

    useEffect(() => {
        fetchingDataExam(id);
    }, [id, showSuccessAlert]);

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
            const updatedOptions = editableQuestion.options.map((option, idx) =>
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

    return (
        <>
            <Header />
            <Container fluid="md">
                <div className="manage-question mt-3">
                    <Row>
                        <h1 className="title mt-2 mb-4">{dataExam?.title}</h1>
                    </Row>
                    <Row className="d-flex">
                        <Nav variant="tabs" activeKey={activeTab}>
                            {
                                dataExam && dataExam.examNumbers.map((examNumber, index) => (
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
                                        // Set any specific actions you need when this tab is clicked
                                    }}
                                >
                                    Danh sách sinh viên
                                </Nav.Link>
                            </Nav.Item>
                        </Nav>
                    </Row>
                    <Row className="mt-4 mb-4">
                        <Col>
                            {activeTab === "student-list" ? (
                                <Table striped>
                                    <thead>
                                        <tr>
                                            <th>#</th>
                                            <th>Họ và Tên</th>
                                            <th>Email</th>
                                            <th>Đề thi</th>
                                            <th>Số câu đúng</th>
                                            <th>Số câu sai</th>
                                            <th>Điểm</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>1</td>
                                            <td>Mark</td>
                                            <td>Otto</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                            <td>@mdo</td>
                                        </tr>

                                    </tbody>
                                </Table>
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
                                            dataExam && dataExam.examNumbers[tabIndex].listQuestions?.map((question, index) => (
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
                                    </tbody>
                                </Table>)}
                        </Col>
                    </Row>
                </div>
            </Container>
            <Footer />

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
                            {editableQuestion.options.map((option, idx) => (
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
            <SuccessModal show={showSuccessAlert}
                notice={"Đã cập nhật câu hỏi thành công."}
                onClose={() => setShowSuccessAlert(false)} />
            <ErrorModal show={showErrorAlert}
                notice={"Đã xảy ra lỗi khi cập nhật câu hỏi. Vui lòng thử lại sau."}
                onClose={() => setShowErrorAlert(false)} />
        </>
    );
};
