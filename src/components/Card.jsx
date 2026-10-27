
import { Link, useNavigate } from "react-router-dom";
import { formatTaskDate } from "../services/tasks.js";
import {
  CardWrapper,
  CardGroup,
  CardTopic,
  CardLink,
  CardContent,
  CardTitle,
  CardDate,
} from "./Card.styled";

export default function Card({ card, animationIndex = 0 }) {
  const navigate = useNavigate();
  const routeId = encodeURIComponent(card.id);

  return (
    <CardWrapper $animationIndex={animationIndex}>
      <CardGroup>
        <CardTopic $topic={card.topic}>
          <p>{card.topic}</p>
        </CardTopic>

        <CardLink
          type="button"
          aria-label={`Редактировать задачу «${card.title}»`}
          onClick={() => navigate(`/edit-card/${routeId}`)}
        >
          <div />
          <div />
          <div />
        </CardLink>
      </CardGroup>

      <CardContent>
        <Link to={`/card/${routeId}`}>
          <CardTitle>{card.title}</CardTitle>
        </Link>

        <CardDate>
          <p>{formatTaskDate(card.date)}</p>
        </CardDate>
      </CardContent>
    </CardWrapper>
  );
}
