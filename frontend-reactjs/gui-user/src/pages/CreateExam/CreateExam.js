import { Button, Col, Form, ProgressBar, Row } from "react-bootstrap"
import Header from "../../components/header/Header"
import Footer from "../../components/footer/Footer"
import { useNavigate } from "react-router-dom";
import { useState } from "react";
export const CreateExam = () => {
    const now = 30;
    const navigate = useNavigate();
    const today = new Date();
    const formatDate = (date) => {
        const year = date.getFullYear();
        const month = (date.getMonth() + 1).toString().padStart(2, '0'); // Thêm số 0 phía trước nếu cần
        const day = date.getDate().toString().padStart(2, '0'); // Thêm số 0 phía trước nếu cần
        return `${year}-${month}-${day}`;
        // Hàm để định dạng ngày thành chuỗi YYYY-MM-DD
    };
    const formattedToday = formatDate(today); // Định dạng ngày hôm nay thành YYYY-MM-DD

    const [validated, setValidated] = useState(false);

    const handleSubmit = (event) => {
        const form = event.currentTarget;
        if (form.checkValidity() === false) {
            event.preventDefault();
            event.stopPropagation();
        }
        if (validated) {
            navigate('/form-question')
        }
        setValidated(true);
    };
    const handleCreateQuestion = () => {
        // Navigate to the '/form-question' route when button is clicked
        navigate('/form-question');
    };

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
                                    <Form.Control type="text" placeholder="Tiêu đề" required />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập tiêu đề</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="shortDescription">
                                    <Form.Label>Ghi chú</Form.Label>
                                    <Form.Control type="text" placeholder="" />
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="description">
                                    <Form.Label>Mô tả</Form.Label>
                                    <Form.Control type="text" placeholder="Mô tả bài thi ..." required />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập mô tả</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="timeExpiry">
                                    <Form.Label>Ngày hết hạn</Form.Label>
                                    <Form.Control type="date" placeholder="" required min={formattedToday} />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải chọn thời hạn</Form.Control.Feedback>
                                </Form.Group>
                            </Col>
                            <Col md={6}>
                                <Form.Group className="mb-3" controlId="course">
                                    <Form.Label>Môn học</Form.Label>
                                    <Form.Select aria-label="Default select example" required>
                                        {/* <option>Chọn môn học</option> */}
                                        <option value="1">Toán</option>
                                        <option value="2">Văn</option>
                                        <option value="3">Anh</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Bạn cần phải chọn môn học</Form.Control.Feedback>
                                </Form.Group>

                                <Form.Group className="mb-3" controlId="timeExam">
                                    <Form.Label>Thời gian</Form.Label>
                                    <Form.Select aria-label="Default select example" required>
                                        {/* <option>Chọn thời gian làm bài</option> */}
                                        <option value="1">10 phút</option>
                                        <option value="2">20 phút</option>
                                        <option value="3">30 phút</option>
                                    </Form.Select>
                                    <Form.Control.Feedback type="invalid">Bạn cần phải thời gian làm bài</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="quantityQuestion">
                                    <Form.Label>Số câu hỏi</Form.Label>
                                    <Form.Control type="number" placeholder="" required min={0} />
                                    <Form.Control.Feedback type="invalid">Bạn cần phải nhập số câu hỏi</Form.Control.Feedback>
                                </Form.Group>
                                <Form.Group className="mb-3" controlId="quantityExam">
                                    <Form.Label>Số đề</Form.Label>
                                    <Form.Control type="number" placeholder="" min={0} />
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