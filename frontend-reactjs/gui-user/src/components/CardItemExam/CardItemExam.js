import { Badge, Button, Card, Col } from "react-bootstrap"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import "./CardItemExam.scss"
import { useState } from "react";
import { Link } from "react-router-dom";
export const CardItemExam = (data) => {
    const [exam, setExam] = useState(data.exam)
    const [examId, setExamId] = useState(data.exam.id)
    const [time, setTime] = useState(data.exam.timeExam.trim().split(" ")[0])
    return (
        <Col md={3} className="pb-4">
            <Card className="card-parent">
                <Card.Body className="card-item d-flex align-content-around flex-wrap">
                    <div>

                        <Card.Title className="card-item-title-exam mb-3">{exam?.title}</Card.Title>
                        <Card.Subtitle className="card-item-content">
                            <div className="wrap d-flex">
                                <span> <AccessTimeIcon />{exam ? exam.timeExam : "120 phút"} |</span>
                                <span> <PersonOutlineIcon /> {exam ? exam.quantityQuestion : 40} |</span>
                                <span> <ChatBubbleOutlineIcon /> {30}</span>
                            </div>
                            <div className="wrap d-flex">
                                <span>{exam ? exam.examNumbers.length : 1} đề thi |</span>
                                <span> {exam ? exam.quantityQuestion : 1} câu hỏi</span>
                            </div>
                        </Card.Subtitle>
                        <Badge pill className="badge-course">
                            # {exam ? exam.category : "TOÁN"}
                        </Badge>
                    </div>

                    <div className="btn-detail w-100 mt-3 ">
                        <Link to="/exam-detail" state={{idExamNumber :data?.exam?.id}} className="w-100 btn detail-button"
                        >Chi tiết</Link>
                    </div>
                </Card.Body>
            </Card>
        </Col>
    )
}