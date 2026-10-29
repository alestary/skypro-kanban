
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
  CalendarIcon,
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
            <CalendarIcon
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.8"
              strokeLinecap="round"
              strokeLinejoin="round"
              aria-hidden="true"
            >
              <rect x="3" y="5" width="18" height="16" rx="2" />
              <path d="M16 3v4M8 3v4M3 11h18" />
            </CalendarIcon>
          <p>{formatTaskDate(card.date)}</p>
        </CardDate>
      </CardContent>
    </CardWrapper>
  );
}
