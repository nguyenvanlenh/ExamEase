import React, { useEffect, useState } from 'react';
import { Alert, Button, Card, Col, Modal, ProgressBar, Row, Stack } from 'react-bootstrap';
import FormOption from '../../components/FormOption/FormOption';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
import { RequestData } from '../../utils/request';
import { useSelector, useDispatch } from 'react-redux';
import { scrollToElement, setDataByKeyLS } from '../../utils/common';
import { removeExamRequest, updateCreateExamRequest } from '../../redux/slices/examSlice';
import { examService } from '../../services/examService';
export const FormQuestion = () => {
    const now = 60;
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [isSaving, setIsSaving] = useState(false);
    const [error, setError] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const requestData = RequestData();
    const dispatch = useDispatch();
    const examRequest = useSelector(state => state.exams);
    let examTemp = examRequest[0];

    const arr = new Array(examRequest[0]?.quantityQuestion).fill(0);
    // biến đánh dấu đã xong 1 câu hỏi
    const [completedQuestions, setCompletedQuestions] = useState(new Array(arr.length).fill(false));
    const [isAllQuestionsCompleted, setIsAllQuestionsCompleted] = useState(false); // Trạng thái để kiểm tra hoàn thành tất cả câu hỏi


    useEffect(() => {
        console.log(examRequest)
        if (!examRequest || !examRequest?.length)
            navigate("/create-exam")
        setIsAllQuestionsCompleted(completedQuestions.every(isCompleted => isCompleted));
    }, [completedQuestions]);
    // Xử lý khi xong 1 câu hỏi . Thêm vào danh sách câu hỏi
    const handleQuestionSubmit = (questionData) => {
        const question = requestData.QuestionRequest(
            questionData.question,
            [requestData.OptionRequest(questionData.correctAnswer, true),
            requestData.OptionRequest(questionData.incorrectAnswers[0] ?? "", false),
            requestData.OptionRequest(questionData.incorrectAnswers[1] ?? "", false),
            requestData.OptionRequest(questionData.incorrectAnswers[2] ?? "", false),
            ]
        );
        setQuestions((prevQuestions) => [...prevQuestions, question]);

        console.log(questions);
    };



    // Xử lý lưu tất cả câu hỏi vào redux
    const handleSaveAllQuestions = async () => {
        examTemp = {
            ...examTemp,
            listQuestionRequests: questions
        }
        setIsSaving(true);
        if (questions.length === examRequest[0]?.quantityQuestion)
            dispatch(updateCreateExamRequest(questions))

        const data = await examService.createExam(examTemp);
        if (data?.status < 400) {
            setDataByKeyLS("examSaved", data.data);
            dispatch(removeExamRequest())
            setShowModal(true);
        } else {
            setError(data.data.message);
        }

    };
    // thông báo cho FormOption biết đã lưu
    const handleQuestionSaved = () => {
        setIsSaving(false);
    };


    return (
        <>
            <Header />
            <div id="form-question" className="pt-5 pb-5">
                <div className="container">
                    <ProgressBar animated now={now} label={`${now}%`} className="mr-1 mb-4" />
                    {error && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {error}
                        </Alert>
                    )}
                    <h1 className="text-center mb-4">
                        Tạo câu hỏi bài thi
                    </h1>
                    <Row className='pt-1 pb-3'>
                        <Stack direction="horizontal" gap={3}>
                            <Button variant="outline-primary" className="p-2"><FileUploadIcon /> Tải lên file word</Button>
                            <Button variant="outline-danger" className="p-2"><FileUploadIcon /> Tải lên file pdf</Button>
                            <Button variant="outline-success" className="p-2"><FileUploadIcon /> Tải lên file excel</Button>
                        </Stack>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <Row>
                                {
                                    arr?.map((item, index) => {
                                        return (
                                            <FormOption
                                                key={index}
                                                questionNumber={index + 1}
                                                handleQuestionSubmit={handleQuestionSubmit}
                                                isSaving={isSaving}
                                                handleQuestionSaved={handleQuestionSaved}
                                                setCompleted={(isComplete) => {
                                                    const updatedCompletedQuestions = [...completedQuestions];
                                                    updatedCompletedQuestions[index] = isComplete;
                                                    setCompletedQuestions(updatedCompletedQuestions);
                                                }}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col md={3}>
                            <Row className='p-2 shadow-lg p- mb-5 bg-white rounded'>
                                {arr?.map((item, index) => {
                                    const formId = `option${index + 1}`;
                                    return (
                                        <Col md={3} className="mb-3" key={index}>
                                            <Link to={`#${formId}`} onClick={() => scrollToElement(formId)}>
                                                <Card
                                                    border={completedQuestions[index] ? "success" : "secondary"}
                                                    className={`p-3 d-flex flex-column justify-content-center align-items-center ${completedQuestions[index] ? "bg-success text-light" : "secondary"}`}
                                                >
                                                    <Card.Subtitle>
                                                        {index + 1}
                                                    </Card.Subtitle>
                                                </Card>
                                            </Link>
                                        </Col>
                                    );
                                })}
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pt-4'>
                        <Col md={6}>
                            <Button
                                type="button"
                                className="w-100 pl-5 pr-5 mb-2"
                                variant="outline-secondary"
                                onClick={() => navigate('/create-exam')}
                            >
                                Quay lại
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button
                                type="button"
                                className="w-100 pl-5 pr-5"
                                variant="outline-success"
                                onClick={handleSaveAllQuestions}
                                disabled={!isAllQuestionsCompleted}
                            >
                                Lưu tất cả câu hỏi
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
            <Modal show={showModal} onHide={() => setShowModal(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Thông báo</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <h5>Đề thi đã được tạo thành công!</h5>
                    <p>Bạn có muốn <strong>tạo danh sách học sinh</strong> dành riêng cho đề thi này không?</p>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={() => navigate('/list-exams')}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => navigate('/create-student')}>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
        </>
    );
};

