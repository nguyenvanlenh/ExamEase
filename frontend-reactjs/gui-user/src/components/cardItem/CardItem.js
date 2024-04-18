import React from "react";
import { Button, Card, Col, Stack } from "react-bootstrap";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import "./cardItem.scss";
function CardItem(prop) {
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
          <Card.Text className="text-sub text-end-day">{prop.dateDone}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.timeDone}</Card.Text>
          <Card.Text className="text-sub text-end-day">{prop.result}</Card.Text>
          <Button className="card-button">{prop.nameButton}</Button>
        </Card.Body>
      </Card>
    </Col>
  );
}

export default CardItem;
