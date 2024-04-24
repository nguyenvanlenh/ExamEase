import React, { useState } from 'react';
import { Button, Card, Col, ProgressBar, Row, Stack } from 'react-bootstrap';
import FormOption from '../../components/FormOption/FormOption';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FileUploadIcon from '@mui/icons-material/FileUpload';
export const FormQuestion = () => {
    const arr = new Array(20).fill(0);
    const now = 60;
    const navigate = useNavigate();
    const [questions, setQuestions] = useState([]);
    const [isSaving, setIsSaving] = useState(false);

    // Handler to collect form data from FormOption and add to questions array
    const handleQuestionSubmit = (questionData) => {
        setQuestions((prevQuestions) => [...prevQuestions, questionData]);
    };

    // Handler to save all questions
    const handleSaveAllQuestions = () => {
        // Update state to indicate saving process has started
        setIsSaving(true);
        navigate("/create-student")
    };

    // Handler to be called by FormOption components to notify that they have saved a question
    const handleQuestionSaved = () => {
        // Perform any additional actions after a question is saved
        // In this example, we can reset the isSaving state to false
        setIsSaving(false);
    };

    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <>
            <Header />
            <div id="form-question" className="pt-5 pb-5">
                <div className="container">
                    <ProgressBar animated now={now} label={`${now}%`} className="mr-1 mb-4" />
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
                        <Col md={8} style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}>
                            <Row>
                                {
                                    arr.map((item, index) => {
                                        return (
                                            <FormOption
                                                questionNumber={index + 1}
                                                handleQuestionSubmit={handleQuestionSubmit}
                                                isSaving={isSaving}
                                                handleQuestionSaved={handleQuestionSaved}
                                            />
                                        )
                                    })
                                }
                            </Row>
                        </Col>
                        <Col md={4}>
                            <Row>
                                {arr.map((item, index) => {
                                    const formId = `option${index + 1}`;
                                    return (
                                        <Col md={3} className="mb-3" key={index}>
                                            <Link to={`#${formId}`} onClick={() => scrollToElement(formId)}>
                                                <Card border="success" className="p-3 d-flex flex-column justify-content-center align-items-center
                                                text-success">
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
                    <Row>
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
                            >
                                Lưu tất cả câu hỏi
                            </Button>
                        </Col>
                    </Row>
                </div>
            </div>
            <Footer />
        </>
    );
};

