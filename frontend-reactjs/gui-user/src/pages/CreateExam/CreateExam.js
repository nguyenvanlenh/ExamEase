import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { RequestData } from "../../utils/request";
import { createExamRequest, removeExamRequest } from "../../redux/slices/examSlice";
import { formatDate, parseDateString } from "../../utils/common";
export const CreateExam = () => {
    const dispatch = useDispatch();
    const requestData = RequestData();
    const now = 30;
    const navigate = useNavigate();


    const [validated, setValidated] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    const examRequest = useSelector(state => state.exams || []);

    const [title, setTitle] = useState("");
    const [shortDescription, setShortDescription] = useState("");
    const [description, setDescription] = useState("");
    const [quantityQuestion, setQuantityQuestion] = useState(1);
    const [timeId, setTimeId] = useState(10);
    const [categoryId, setCategoryId] = useState(1);
    const [endTime, setEndTime] = useState(null);
    const [quantityExamNumber, setQuantityExamNumber] = useState(1);

    useEffect(() => {
        if (examRequest[0]) {
            setTitle(examRequest[0]?.title ?? "");
            setShortDescription(examRequest[0]?.shortDescription ?? "");
            setDescription(examRequest[0]?.description ?? "");
            setQuantityQuestion(examRequest[0]?.quantityQuestion ?? 1);
            setTimeId(examRequest[0]?.timeId);
            setCategoryId(examRequest[0]?.categoryId);
            setEndTime(examRequest[0]?.endTime ?? null);
            setQuantityExamNumber(examRequest[0]?.quantityExamNumber ?? 1);
        }
    }, [examRequest]);
    useEffect(() => {
        const checkFormValidity = () => {
            if (title && description && categoryId && timeId && quantityQuestion) {
                setIsFormValid(true);
            } else {
                setIsFormValid(false);
            }
        };
        checkFormValidity();
    }, [title, description, endTime, categoryId, timeId, quantityQuestion]);

    const handleSubmit = (event) => {
        if (!isFormValid) {
            setValidated(event.currentTarget.checkValidity())
        } else {
            setValidated(true)
            const listExamNumberRequests = Array.from({ length: quantityExamNumber }, (v, i) => ({ name: `${i + 1}` }));
            const request = requestData.ExamRequest(
                1, title,
                shortDescription,
                description,
                quantityQuestion,
                timeId,
                categoryId,
                formatDate(new Date()),
                endTime,
                true,
                listExamNumberRequests,
                []
            );
            if (examRequest[0]) {
                dispatch(removeExamRequest());
            }
            dispatch(createExamRequest(request));

            navigate('/form-question')
        };
    }

    return (
        <>
            <Header />
            <div id="create-exam" className=" pt-5 pb-5">
                <div className="container">

                    <ProgressBar animated now={now} label={`${now}%`} className="mr-1 mb-4" />
                    <h1 className="text-center mb-4">
                        Tạo bài thi
                    </h1>
                    <Form noValidate validated={validated} onSubmit={handleSubmit}>
                        <Row>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="title">
                                    <Form.Label>Tiêu đề</Form.Label>
                                    <Form.Control type="text" placeholder="Tiêu đề" required
                                        onChange={(e) => setTitle(e.target.value)
                                        }
                                        value={title ?? ""}
                                    />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập tiêu đề</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="shortDescription">
                                    <Form.Label>Ghi chú</Form.Label>
                                    <Form.Control type="text" placeholder=""
                                        onChange={(e) => setShortDescription(e.target.value)}
                                        value={shortDescription ?? ""}
                                    />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control type="text" placeholder="Mô tả bài thi ..." required
                                        onChange={(e) => setDescription(e.target.value)}
                                        value={description ?? ""}
                                    />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập mô tả</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="timeExpiry">
                                    <Form.Label>Ngày hết hạn</Form.Label>
                                    <Form.Control type="date" placeholder="" required min={formatDate(new Date())}
                                        onChange={(e) =>
                                            setEndTime(e.target.value)
                                        }
                                        value={endTime ?? ""}
                                    />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải chọn thời hạn</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="course">
                                    <Form.Label>Môn học</Form.Label>
                                    <Form.Select aria-label="Default select example" required
                                        onChange={(e) => setCategoryId(e.target.value)}
                                        value={categoryId}
                                    >
                                        {/* <option>Chọn môn học</option> */}
                                        <option value="1">Toán</option>
                                        <option value="2">Văn</option>
                                        <option value="3">Anh</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Bạn cần phải chọn môn học</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="timeExam">
                                    <Form.Label>Thời gian</Form.Label>
                                    <Form.Select aria-label="Default select example" required
                                        onChange={(e) => setTimeId(e.target.value)}
                                        value={timeId}
                                    >
                                        {/* <option>Chọn thời gian làm bài</option> */}
                                        <option value="10">10 phút</option>
                                        <option value="20">20 phút</option>
                                        <option value="30">30 phút</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Bạn cần phải thời gian làm bài</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="quantityQuestion">
                                    <Form.Label>Số câu hỏi</Form.Label>
                                    <Form.Control type="number" placeholder="" required min={0}
                                        onChange={(e) => setQuantityQuestion(e.target.value)}
                                        value={quantityQuestion ?? 0}
                                    />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập số câu hỏi</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="quantityExam">
                                    <Form.Label>Số đề</Form.Label>
                                    <Form.Control type="number" placeholder="" min={1}
                                        onChange={(e) => setQuantityExamNumber(e.target.value)}
                                        value={quantityExamNumber}
                                    />
                                </Form.Group>
                            </Col>

                        </Row>
                    </Form>
                    <Row>
                        <Col md={12}>
                            <Button type="submit"
                                className="w-100 pl-5 pr-5"
                                variant="outline-success"
                                onClick={handleSubmit}>Tạo câu hỏi</Button>
                        </Col>
                    </Row>
                </div>

            </div>
            <Footer />
        </>
    )
}