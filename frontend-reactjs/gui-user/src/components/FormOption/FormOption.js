import React, { useState, useEffect } from 'react';
import { Accordion, Button, Col, FloatingLabel, Form, Modal } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { updateCreateExamRequest } from '../../redux/slices/examSlice';
import { RequestData } from '../../utils/request';


const FormOption = ({ questionParent, questionNumber, setCompleted }) => {
    const dispatch = useDispatch();

    const [question, setQuestion] = useState(questionParent?.question || "");
    const [correctAnswer, setCorrectAnswer] = useState(questionParent?.listOptionRequests.find(option => option.isCorrect)?.content || "");
    const [incorrectAnswers, setIncorrectAnswers] = useState(
        questionParent?.listOptionRequests
            .filter(option => !option.isCorrect)
            .map(option => option.content) || ["", "", ""]
    );
    const [modalShow, setModalShow] = useState(false);
    const [isFormValid, setIsFormValid] = useState(false);

    useEffect(() => {
        setQuestion(questionParent?.question || "");
        setCorrectAnswer(questionParent?.listOptionRequests.find(option => option.isCorrect)?.content || "");
        setIncorrectAnswers(
            questionParent?.listOptionRequests
                .filter(option => !option.isCorrect)
                .map(option => option.content) || ["", "", ""]
        );
    }, [questionParent]);


    useEffect(() => {
        autoCheckCompletion();
    }, [question, correctAnswer, incorrectAnswers]);
    const autoCheckCompletion = () => {
        const isQuestionFilled = question.trim() !== '';
        const isCorrectAnswerFilled = correctAnswer.trim() !== '';
        const areIncorrectAnswersFilled = incorrectAnswers.every(answer => answer.trim() !== '');
        const isComplete = isQuestionFilled && isCorrectAnswerFilled && areIncorrectAnswersFilled;
        setIsFormValid(isComplete); // Update form validity
        setCompleted(isComplete);
    };

    const saveQuestion = () => {
        const questionSaved = RequestData().QuestionRequest(
            questionNumber,
            question,
            [
                RequestData().OptionRequest(0, correctAnswer, true),
                ...incorrectAnswers.map(answer =>
                    RequestData().OptionRequest(0, answer ?? "", false)
                )
            ]
        );
        dispatch(updateCreateExamRequest(questionSaved));
        setCompleted(true);
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
                                    value={question}
                                    onChange={(e) => setQuestion(e.target.value)}
                                />
                            </FloatingLabel>
                        </Form.Group>
                        <div className="ml-3">
                            <Form.Group className="mb-3" controlId={`correctAnswer${questionNumber}`}>
                                <Form.Control
                                    type="text"
                                    placeholder="Điền đáp án đúng"
                                    value={correctAnswer}
                                    onChange={(e) => setCorrectAnswer(e.target.value)}
                                    required
                                />
                            </Form.Group>
                            {incorrectAnswers.map((answer, index) => (
                                <Form.Group key={index} className="mb-3" controlId={`incorrectAnswer${index}${questionNumber}`}>
                                    <Form.Control
                                        type="text"
                                        placeholder={`Điền đáp án sai`}
                                        value={answer}
                                        onChange={(e) => {
                                            const updatedAnswers = [...incorrectAnswers];
                                            updatedAnswers[index] = e.target.value;
                                            setIncorrectAnswers(updatedAnswers);
                                        }}
                                    />
                                </Form.Group>
                            ))}
                        </div>
                    </Form>
                </Modal.Body>
                <Modal.Footer>
                    <Button
                        className='w-100'
                        onClick={() => {
                            if (isFormValid) { // Only save the question if the form is valid
                                setModalShow(false);
                                saveQuestion();
                            }
                        }}
                        disabled={!isFormValid} // Disable the button if the form is invalid
                    >
                        Xong
                    </Button>
                </Modal.Footer>
            </Modal>
        </Col>
    );
};

export default FormOption;
