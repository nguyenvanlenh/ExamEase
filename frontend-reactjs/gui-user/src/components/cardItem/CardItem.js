import React from "react";
import { Button, Card, Col, Stack } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./cardItem.scss";
import { useNavigate } from "react-router-dom";
function CardItem(prop) {
  const navigate = useNavigate()
  const handleButton = () => {
    const type = prop.type
    switch (type) {
      case "OBLIGATE_EXAM":
        navigate("/today")
        break;
      case "TOOK_EXAM":
        navigate("/result", {state: {idExamNumber: prop.idExamNumber}})
        break;
      default: break;
    }

  }
  return (
    <Col sm={6} md={3}>
      <Card id="id-card">
        <Card.Body className="card-body">
          <Card.Title className="card-title">{prop.title}</Card.Title>
          <Card.Subtitle className="mb-2 text-muted card-subtitle">
            <Stack direction="horizontal">
              <AccessTimeIcon fontSize="14" />
              <div className="text">{prop.time} phút</div>
            </Stack>
          </Card.Subtitle>
          <Card.Text className="text-sub text-begin-day">{prop.beginDay}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.endDay}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.dateDone && prop.dateDone + 's'}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.timeDone}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.result}</Card.Text>
          <Button onClick={handleButton} className="card-button">{prop.nameButton}</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardItem;
