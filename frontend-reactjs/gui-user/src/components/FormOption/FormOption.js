import React, { useState, useEffect } from 'react';
import { Accordion, Button, Col, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { flushSync } from 'react-dom';
import { useSelector } from 'react-redux';

const FormOption = ({
    questionNumber,
    handleQuestionSubmit,
    isSaving,
    handleQuestionSaved,
    setCompleted,
    values }) => {
    const [question, setQuestion] = useState("");
    const [correctAnswer, setCorrectAnswer] = useState("");
    const [incorrectAnswers, setIncorrectAnswers] = useState(["", "", ""]);
    const [modalShow, setModalShow] = useState(false);
    const examRequest = useSelector(state => state.exams);
    useEffect(() => {
        if (isSaving) {
            saveQuestion();
        }
    }, [isSaving]);

    useEffect(() => {
        autoCheckCompletion();
    }, [question, correctAnswer, incorrectAnswers]);

    const autoCheckCompletion = () => {
        const isQuestionFilled = question.trim() !== '';
        const isCorrectAnswerFilled = correctAnswer.trim() !== '';
        const areIncorrectAnswersFilled = incorrectAnswers.every(answer => answer.trim() !== '');

        if (isQuestionFilled && isCorrectAnswerFilled && areIncorrectAnswersFilled) {
            setCompleted(true);
        } else {
            setCompleted(false);
        }
    };

    const saveQuestion = () => {
        const questionData = {
            question: question,
            correctAnswer: correctAnswer,
            incorrectAnswers: incorrectAnswers.filter((answer) => answer.trim() !== '')
        };

        if (question.trim() !== '' && correctAnswer.trim() !== '' && incorrectAnswers.some((answer) => answer.trim() !== '')) {
            handleQuestionSubmit(questionData);
            handleQuestionSaved();
            setCompleted(true);
        }
    };


    return (
        <Col md={6}>
            <Accordion id={`option${questionNumber}`} activeKey={modalShow ? `${questionNumber}` : null}>
                <Accordion.Item eventKey={`${questionNumber}`} >
                    <Accordion.Header onClick={() => setModalShow(true)}>Câu hỏi {questionNumber}</Accordion.Header>
                </Accordion.Item>
            </Accordion>

            <Modal
                size="lg"
                aria-labelledby="contained-modal-title-vcenter"
                centered
                show={modalShow}
                onHide={() => setModalShow(false)}
            >
                <Modal.Header closeButton>
                    <Modal.Title id="contained-modal-title-vcenter">
                        Câu hỏi {questionNumber}
                    </Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <Form>
                        <Form.Group className="mb-3" controlId={`question${questionNumber}`}>
                            <FloatingLabel
                                controlId="floatingTextarea"
                                label={`Câu hỏi ${questionNumber}`}
                                className="mb-3"
                            >
                                <Form.Control
                                    as="textarea"
                                    style={{ height: '100px', maxHeight: '250px' }}
                                    placeholder={`Câu hỏi ${questionNumber}`}
                                    value={
                                        examRequest[0]?.listQuestionRequests[questionNumber - 1]?.question ||
                                        question
                                    }
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <div className="ml-3">
                            <Form.Group className="mb-3" controlId={`correctAnswer${questionNumber}`}>
                                <Form.Control
                                    type="text"
                                    placeholder="Điền đáp án đúng"
                                    value={
                                        examRequest[0]?.listQuestionRequests[questionNumber - 1]?.listOptionRequests[0].content ||
                                        correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {[1, 2, 3].map((content, index) => (
                                <Form.Group key={index} className="mb-3" controlId={`incorrectAnswer${index}${questionNumber}`}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Điền đáp án sai`}
                                        value={
                                            examRequest[0]?.listQuestionRequests[questionNumber - 1]?.listOptionRequests[content].content ||
                                            incorrectAnswers[content]}
                                        onChange={(e) => {
                                            const updatedAnswers = [...incorrectAnswers];
                                            updatedAnswers[content] = e.target.value;
                                            setIncorrectAnswers(updatedAnswers);
                                        }}
                                    />
                                </Form.Group>
                            ))}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button className='w-100' onClick={() => {
                        setModalShow(false)
                        saveQuestion()
                    }}>Xong</Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default FormOption;