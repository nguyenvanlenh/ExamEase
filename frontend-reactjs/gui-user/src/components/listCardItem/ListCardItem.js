import React from "react";
import CardItem from "../cardItem/CardItem";
import { Row } from "react-bootstrap";

function ListCardItem(prop) {
  const listCard = prop.listCard;
  return (
    <Row className="wrap-cards">
      {listCard &&
        listCard.map((card) => (
          <CardItem
            key={card.id}
            title={card.title}
            time={card.time}
            beginDay={card.beginDay}
            endDay={card.endDay}
            dateDone={card.dateDone}
            timeDone={card.timeDone}
            result={card.result}
            nameButton={card.nameButton}
          />
        ))}
    </Row>
  );
}

export default ListCardItem;
