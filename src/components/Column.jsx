import Card from "./Card";
import {
  ColumnWrapper,
  ColumnTitle,
  CardsList,
} from "./Column.styled";

function Column({ title, cards }) {
  return (
    <ColumnWrapper>
      <ColumnTitle>
        <p>{title}</p>
      </ColumnTitle>

      <CardsList>
        {cards.map((card, index) => (
          <Card
            key={card.id}
            card={card}
            animationIndex={index}
          />
        ))}
      </CardsList>
    </ColumnWrapper>
  );
}

export default Column;