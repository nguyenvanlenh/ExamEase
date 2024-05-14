import React, { useState } from 'react';
import { Button, Card, Col, ProgressBar, Row, Stack } from 'react-bootstrap';
import FormOption from '../../components/FormOption/FormOption';
import Header from '../../components/header/Header';
import Footer from '../../components/footer/Footer';
import { Link, useNavigate } from "react-router-dom";
import FileUploadIcon from '@mui/icons-material/FileUpload';
export const FormQuestion = () => {
    const arr = new Array(40).fill(0);
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

    const [completedQuestions, setCompletedQuestions] = useState(new Array(arr.length).fill(false));



    const scrollToElement = (id) => {
        const element = document.getElementById(id);
        if (element) {
            const { top, height } = element.getBoundingClientRect();
            const windowHeight = window.innerHeight;
            const offset = top - (windowHeight - height) / 2;

            window.scrollTo({
                top: offset,
                behavior: 'smooth'
            });
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
                        <Col md={9}
                        // style={{ maxHeight: '400px', overflowY: 'auto', marginBottom: '20px' }}
                        >
                            <Row>
                                {
                                    arr.map((item, index) => {
                                        return (
                                            <FormOption
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

