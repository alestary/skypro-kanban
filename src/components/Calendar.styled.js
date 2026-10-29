import styled from "styled-components";
import { theme } from "../theme";

export const CalendarWrapper = styled.div`
  width: 100%;
  max-width: 182px;
  min-width: 0;
  margin: 0;
`;

export const CalendarBlock = styled.div`
  display: block;
  width: 100%;
`;

export const CalendarMonth = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 4px;

  color: ${theme.colors.secondaryText};
  font-size: 12px;
  line-height: 20px;
  font-weight: 500;
  white-space: nowrap;
`;

export const CalendarContent = styled.div`
  width: 100%;
  margin-bottom: 0;
`;

export const CalendarDaysNames = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  align-items: center;
  margin: 4px 0;
  padding: 0;
  text-align: center;
`;

export const CalendarDayName = styled.span`
  color: ${theme.colors.secondaryText};
  font-size: 8px;
  font-weight: 500;
  line-height: 14px;
  text-align: center;
`;

export const CalendarCells = styled.div`
  display: grid;
  grid-template-columns: repeat(7, minmax(0, 1fr));
  width: 100%;
  gap: 1px;
`;

export const CalendarCell = styled.button`
  width: 100%;
  aspect-ratio: 1;
  min-width: 0;
  max-width: 22px;
  justify-self: center;
  padding: 0;

  border: none;
  border-radius: 50%;

  display: flex;
  align-items: center;
  justify-content: center;

  background: ${({ $active }) =>
    $active ? theme.colors.secondaryText : "transparent"};

  color: ${({ $active }) =>
    $active ? theme.colors.white : theme.colors.secondaryText};

  font-size: 9px;
  line-height: 1;
  cursor: pointer;

  opacity: ${({ $otherMonth }) => ($otherMonth ? 0 : 1)};

  &:hover:not(:disabled) {
    background: #eaedf4;
    color: ${theme.colors.secondaryText};
  }

  &:disabled {
    cursor: default;
  }
`;

export const CalendarNavActions = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex-shrink: 0;
`;

export const CalendarNavButton = styled.button`
  width: 14px;
  height: 20px;
  padding: 0;

  border: none;
  background: transparent;

  display: flex;
  align-items: center;
  justify-content: center;

  color: ${theme.colors.secondaryText};
  cursor: pointer;

  &:hover {
    color: ${theme.colors.primary};
  }

  svg {
    width: 8px;
    height: 8px;
    fill: currentColor;
  }
`;