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
                    <Card.Text className="card-item-content">
                        <div className="wrap">
                            <span> <AccessTimeIcon />{exam ? exam.time : "120 phút"} |</span>
                            <span> <PersonOutlineIcon /> {exam ? exam.quantityPractice : "14000"} |</span>
                            <span> <ChatBubbleOutlineIcon /> {exam ? exam.quantityComment : "30"}</span>
                        </div>
                        <div className="wrap">
                            <span>{exam ? exam.quantityExamNumber : "3 đề thi"} |</span>
                            <span> {exam ? exam.question : "40 câu hỏi"}</span>
                        </div>
                    </Card.Text>
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