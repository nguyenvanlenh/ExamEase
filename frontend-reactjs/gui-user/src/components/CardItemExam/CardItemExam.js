import { Badge, Button, Card, Col } from "react-bootstrap"
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import PersonOutlineIcon from '@mui/icons-material/PersonOutline';
import ChatBubbleOutlineIcon from '@mui/icons-material/ChatBubbleOutline';
import { useState } from "react";
export const CardItemExam = (data) => {
    const [exam, setExam] = useState(null)
    return (
        <Col md={3} className="pb-4">
            <Card>
                <Card.Body>
                    <Card.Title>Đề thi môn Toán THPT 2023</Card.Title>
                    <Card.Subtitle className="card-item-content">
                        <div className="wrap d-flex">
                            <div> <AccessTimeIcon />{exam ? exam.time : "120 phút"} |</div>
                            <div> <PersonOutlineIcon /> {exam ? exam.quantityPractice : "14000"} |</div>
                            <div> <ChatBubbleOutlineIcon /> {exam ? exam.quantityComment : "30"}</div>
                        </div>
                        <div className="wrap d-flex">
                            <div>{exam ? exam.quantityExamNumber : "3 đề thi"} |</div>
                            <div> {exam ? exam.question : "40 câu hỏi"}</div>
                        </div>
                    </Card.Subtitle>
                    <Badge pill bg="secondary">
                        # {exam ? exam.category : "TOÁN"}
                    </Badge>

                    <Button className="w-100 mt-3"
                        variant="outline-secondary">Chi tiết</Button>
                </Card.Body>
            </Card>
        </Col>
    )
}