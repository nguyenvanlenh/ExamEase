import React, { useState, useEffect } from 'react';
import { Col, FloatingLabel, Form } from 'react-bootstrap';

const FormOption = ({ questionNumber, handleQuestionSubmit, isSaving, handleQuestionSaved }) => {
    const [question, setQuestion] = useState('');
    const [correctAnswer, setCorrectAnswer] = useState('');
    const [incorrectAnswers, setIncorrectAnswers] = useState(['', '', '']);

    useEffect(() => {
        if (isSaving) {
            // Perform save action when isSaving is true
            saveQuestion();
        }
    }, [isSaving]); // Run effect when isSaving changes

    const saveQuestion = () => {
        // Prepare the question data to submit
        const questionData = {
            question: question,
            correctAnswer: correctAnswer,
            incorrectAnswers: incorrectAnswers.filter((answer) => answer.trim() !== '')
        };

        // Pass the questionData to the parent component for saving
        if (question.trim() !== '' && correctAnswer.trim() !== '' && incorrectAnswers.some((answer) => answer.trim() !== '')) {
            handleQuestionSubmit(questionData);
            // Notify parent component that the question has been saved
            handleQuestionSaved();
        }
    };


    return (
        <Col md={6}>
            <Form id={`option${questionNumber}`} >
                <Form.Group className="mb-3" controlId={`question${questionNumber}`}>
                    <FloatingLabel
                        controlId="floatingTextarea"
                        label={`Câu hỏi ${questionNumber}`}
                        className="mb-3"
                    >
                        <Form.Control as="textarea" style={{ maxHeight: '150px' }} placeholder={`Câu hỏi ${questionNumber}`} />
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
                    {[1].map((index) => (
                        <Form.Group key={index} className="mb-3" controlId={`incorrectAnswer${index}${questionNumber}`}>
                            <Form.Control
                                type="text"
                                placeholder={`Điền đáp án sai ${index}`}
                                value={incorrectAnswers[index - 1]}
                                onChange={(e) => {
                                    const updatedAnswers = [...incorrectAnswers];
                                    updatedAnswers[index - 1] = e.target.value;
                                    setIncorrectAnswers(updatedAnswers);
                                }}
                            />
                        </Form.Group>
                    ))}
                </div>
            </Form>
        </Col>
    );
};

export default FormOption;
