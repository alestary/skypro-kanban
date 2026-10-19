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
        {cards.map((card) => (
          <Card key={card.id} card={card} />
        ))}
      </CardsList>
    </ColumnWrapper>
  );
}

export default Column;