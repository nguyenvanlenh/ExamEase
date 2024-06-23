import React, { useEffect, useState } from 'react';
import {
    Alert, Button, Card, Col, Form, FormControl, InputGroup, Modal, ProgressBar, Row, Stack, OverlayTrigger, Tooltip, Container
} from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from 'react-redux';
import FileUploadIcon from '@mui/icons-material/FileUpload';
import FormOption from '../../components/FormOption/FormOption';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { RequestData } from '../../utils/request';
import { scrollToElement, setDataByKeyLS } from '../../utils/common';
import { addQuestionsIntoExamRequest, removeExamRequest } from '../../redux/slices/examSlice';
import { examService } from '../../services/examService';
import { questionService } from '../../services/questionService';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';
import imgGUI from "../../data/imgs/Guide-upload.png"
import imgExcel from "../../data/imgs/Guide-excel.png"
export const FormQuestion = () => {
    const now = 60;
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const examRequest = useSelector(state => state.exams);
    const [error, setError] = useState(null);
    const [errorFile, setErrorFile] = useState(null);
    const [showModal, setShowModal] = useState(false);
    const [file, setFile] = useState("");
    const [fileType, setFileType] = useState("");
    const [answerFile, setAnswerFile] = useState("");
    const [showModalUpload, setShowModalUpload] = useState(false);
    const [showModalUploadGuide, setShowModalUploadGuide] = useState(false);
    const [showModalUploadExcel, setShowModalUploadExcel] = useState(false);
    const MAX_FILE_SIZE = 4 * 1024 * 1024; // 4MB
    const [examData, setExamData] = useState(examRequest[0]);
    useEffect(() => {
        setExamData(examRequest[0]);
        if (!examRequest || !examRequest.length) {
            navigate("/create-exam");
        }
    }, [examRequest, navigate]);

    const [isAllQuestionsCompleted, setIsAllQuestionsCompleted] = useState(false);
    const [completedQuestions, setCompletedQuestions] = useState(new Array(examData?.quantityQuestion).fill(false));
    const handleQuestionCompletion = (index, isComplete) => {
        setCompletedQuestions(prevCompletedQuestions => {
            const updatedCompletedQuestions = [...prevCompletedQuestions];
            updatedCompletedQuestions[index] = isComplete;
            return updatedCompletedQuestions;
        });
    };


    useEffect(() => {
        setIsAllQuestionsCompleted(completedQuestions.every(isCompleted => isCompleted));
    }, [completedQuestions]);

    const handleUploadFileQuestion = async () => {
        const data = await questionService.uploadFileQuestion(file, answerFile);
        if (data?.status < 400) {
            const listQuestionsCustom = data?.data?.map((q, index) => {
                return RequestData().QuestionRequest(
                    index + 1,
                    q.question,
                    q.listOptionRequests.map(o => {
                        return RequestData().OptionRequest(o.id ?? 0, o.content, o.isCorrect)
                    })
                )
            })
            dispatch(addQuestionsIntoExamRequest(listQuestionsCustom));
            setShowModalUpload(false)
        } else {
            setError(data.data.message);
        }
    };

    const handleFileChange = (event, setFile, fileType) => {
        const selectedFile = event.target.files[0];
        if (selectedFile) {
            if (selectedFile.size > MAX_FILE_SIZE) {
                setErrorFile('Kích thước tệp vượt quá 4 MB. Vui lòng chọn một tập tin nhỏ hơn.');
                setFile(null);
            } else if (!selectedFile.name.endsWith(fileType)) {
                setErrorFile(`Loại tệp không hợp lệ. Vui lòng chọn file ${fileType}`);
                setFile(null);
            } else {
                setErrorFile(null);
                setFile(selectedFile);
            }
        }
    };

    const handleSaveAllQuestions = async () => {
        const data = await examService.createExam(examData);
        if (data?.status < 400) {
            setDataByKeyLS("examSaved", data.data);
            setShowModal(true); // Hiển thị modal thông báo khi thành công
        } else {
            setError(data.data.message);
        }
    };



    const FileUploadButton = ({ fileType, setShowModalUpload }) => (
        <Button
            onClick={() => {
                setFileType(fileType);
                setShowModalUpload(true);
            }}
            variant={`outline-${fileType === 'xlsx' ? 'success' : fileType === 'pdf' ? 'danger' : 'primary'}`}
            className="p-2"
        >
            <FileUploadIcon /> Tải lên file {fileType}
        </Button>
    );

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
                            {['docx', 'pdf', 'xlsx'].map(type => (
                                <FileUploadButton key={type} fileType={type} setShowModalUpload={setShowModalUpload} />
                            ))}
                        </Stack>
                    </Row>
                    <Row>
                        <Col md={9}>
                            <Row>
                                {completedQuestions.map((_, index) => (
                                    <FormOption
                                        key={index}
                                        questionParent={examData?.listQuestionRequests[index]}
                                        questionNumber={index + 1}
                                        setCompleted={isComplete => handleQuestionCompletion(index, isComplete)}
                                    />
                                ))}
                            </Row>
                        </Col>
                        <Col md={3}>
                            <Row className='p-2 shadow-lg mb-5 bg-white rounded'>
                                {completedQuestions.map((_, index) => (
                                    <Col md={3} className="mb-3" key={index}>
                                        <Link to={`#option${index + 1}`} onClick={() => scrollToElement(`option${index + 1}`)}>
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
                                ))}
                            </Row>
                        </Col>
                    </Row>
                    <Row className='pt-4'>
                        <Col md={6}>
                            <Button
                                className="w-100 mb-2"
                                variant="outline-secondary"
                                onClick={() => navigate('/create-exam')}
                            >
                                Quay lại
                            </Button>
                        </Col>
                        <Col md={6}>
                            <Button
                                className="w-100"
                                variant="outline-success"
                                onClick={handleSaveAllQuestions}
                                disabled={false}
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
                    <Button variant="secondary" onClick={() => {
                        dispatch(removeExamRequest())
                        navigate('/list-exams')
                    }}>
                        Không
                    </Button>
                    <Button variant="primary" onClick={() => {
                        dispatch(removeExamRequest())
                        navigate('/create-student')
                    }
                    }>
                        Có
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={showModalUpload} onHide={() => setShowModalUpload(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Tải lên file câu hỏi</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    {errorFile && (
                        <Alert variant="danger" onClose={() => setError(null)} dismissible>
                            {errorFile}
                        </Alert>
                    )}
                    <Form>
                        <Form.Label>Tải lên danh sách câu hỏi:
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Hướng dẫn upload </Tooltip>}
                            >
                                <HelpOutlineIcon style={{ cursor: "pointer" }} onClick={() => setShowModalUploadGuide(true)} />
                            </OverlayTrigger>
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <FileUploadIcon style={{ fontSize: "38px" }} />
                            <FormControl
                                type="file"
                                aria-label="Text input with file selection"
                                onChange={e => handleFileChange(e, setFile, fileType)}
                                placeholder="File câu hỏi"
                                title="File câu hỏi"
                                required
                            />
                            <Form.Control.Feedback type="invalid">Bạn cần phải chọn file phù hợp</Form.Control.Feedback>
                        </InputGroup>
                        <Form.Label>Tải lên file excel đáp án:
                            <OverlayTrigger
                                placement="top"
                                overlay={<Tooltip>Hướng dẫn upload </Tooltip>}
                            >
                                <HelpOutlineIcon style={{ cursor: "pointer" }} onClick={() => setShowModalUploadExcel(true)} />
                            </OverlayTrigger>
                        </Form.Label>
                        <InputGroup className="mb-3">
                            <FileUploadIcon style={{ fontSize: "38px" }} />
                            <FormControl
                                type="file"
                                aria-label="Text input with file selection"
                                onChange={e => handleFileChange(e, setAnswerFile, ".xlsx")}
                                placeholder="File đáp án"
                                title="File đáp án"
                                required
                            />
                            <Form.Control.Feedback type="invalid">Bạn cần phải chọn file excel</Form.Control.Feedback>
                        </InputGroup>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='w-100' variant="primary" onClick={handleUploadFileQuestion}>
                        Tải lên
                    </Button>
                </Modal.Footer>
            </Modal>
            <Modal className="modal-lg" show={showModalUploadGuide} onHide={() => setShowModalUploadGuide(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Hướng dẫn upload file docx</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Container>
                        <h5 className="mb-4">Định dạng câu hỏi và đáp án như mẫu:</h5>
                        <div>
                            Câu 1. Làm thế nào để upload file docx lên hệ thống?
                            <ol type="A">
                                <li>Mở trang web và chọn nút "Upload".</li>
                                <li>Kéo thả file vào khu vực được đánh dấu.</li>
                                <li>Chọn file từ máy tính và nhấn "Upload".</li>
                                <li>Tất cả các phương án trên.</li>
                            </ol>
                        </div>
                        <div>
                            <strong >Lưu ý: </strong>
                            <i>"A, B, C, D dùng định dạng Document Number Formarts, mỗi đáp án trên 1 hàng"</i>
                        </div>
                        <img src={imgGUI} alt="Ví dụ minh họa" className="img-fluid" />
                    </Container>
                </Modal.Body>
            </Modal>
            <Modal className="modal-lg" show={showModalUploadExcel} onHide={() => setShowModalUploadExcel(false)}>
                <Modal.Header closeButton>
                    <Modal.Title>Hướng dẫn upload file excel</Modal.Title>
                </Modal.Header>
                <Modal.Body className="d-flex flex-column justify-content-center align-items-center">
                    <Container>
                        <h5 className="mb-4">Tạo 2 cột như hình dưới</h5>
                        <div className="mb-2">
                            <strong >Lưu ý: </strong>
                            <i>Cột 1 thứ tự câu hỏi, cột 2 thứ đáp án đúng của câu hỏi đó</i>
                        </div>
                        <img src={imgExcel} alt="Ví dụ minh họa" className="img-fluid" />
                    </Container>
                </Modal.Body>
            </Modal>
        </>
    );
};

