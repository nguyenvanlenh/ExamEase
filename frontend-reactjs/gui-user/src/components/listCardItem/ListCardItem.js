import React from "react";
import CardItem from "../cardItem/CardItem";
import { Col, Row } from "react-bootstrap";

function ListCardItem(prop) {
  const objectExams = prop.objectExams;
  const type = objectExams && objectExams.type;
  let notification;
  if(type) {
    switch (type) {
      case "OBLIGATE_EXAM":
        notification = <Col className="fst-italic">Bạn không có lịch thi hôm nay!</Col>;
        break;
      case "TOOK_EXAM":
        notification = <Col className="fst-italic">Bạn chưa luyện thi bài nào!</Col>
        break;
      default:
        notification = null;
        break;
    }
  }

  return (
    <Row className="wrap-cards">
      {objectExams && objectExams.listExam && objectExams.listExam.length > 0 ?
        objectExams.listExam.slice(0, 4).map((card) => (
          <CardItem
            key={card.id}
            idExamNumber={card.idExamNumber}
            title={card.title}
            time={card.time}
            beginDay={card.beginDay}
            endDay={card.endDay}
            dateDone={card.dateDone}
            timeDone={card.timeDone}
            result={card.result}
            nameButton={objectExams.nameButton}
            type={objectExams?.type}
          />
        )) :
        notification
      }
    </Row>
  );
}

export default ListCardItem;
