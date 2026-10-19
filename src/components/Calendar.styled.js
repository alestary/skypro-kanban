
import styled from "styled-components";
import { theme } from "../theme";

export const CalendarWrapper = styled.div`
    width: 182px;
    margin-bottom: 20px;

    @media screen and (max-width: 660px) {
        max-width: 340px;
        width: 100%;
    }
`;

export const CalendarTitle = styled.div`
    margin-bottom: 14px;
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const CalendarDescription = styled.p`
    color: ${theme.colors.secondaryText};
    font-size: 10px;
    line-height: 1;

    span {
        color: ${theme.colors.black};
    }

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;

export const CalendarBlock = styled.div`
    display: block;
`;

export const CalendarMonth = styled.div`
    color: ${theme.colors.secondaryText};
    font-size: 14px;
    line-height: 25px;
    font-weight: 600;
`;

export const CalendarContent = styled.div`
    margin-bottom: 12px;
`;

export const CalendarDaysNames = styled.div`
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    margin: 7px 0;
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
  }
`;

export const CalendarDayName = styled.span`
    color: ${theme.colors.secondaryText};
    font-size: 10px;
    font-weight: 500;
    line-height: normal;
    letter-spacing: -0.2px;

    @media screen and (max-width: 660px) {
        font-size: 14px;
    }
`;

export const CalendarCells = styled.div`
    width: 182px;
    height: 126px;
    display: flex;
    flex-wrap: wrap;

    @media screen and (max-width: 660px) {
        width: 100%;
        height: auto;
        justify-content: space-around;
    }
`;

export const CalendarCell = styled.button`
    width: 22px;
    height: 22px;
    margin: 2px;
    padding: 0;
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;

    background: ${({ $active }) =>
        $active ? theme.colors.secondaryText : "transparent"};
    color: ${({ $active }) =>
        $active ? theme.colors.white : theme.colors.secondaryText};

    font-size: 10px;
    line-height: 1;
    letter-spacing: -0.2px;
    cursor: pointer;
    opacity: ${({ $otherMonth }) => ($otherMonth ? 0 : 1)};

    &:hover {
        background: #EAEEF6;
        color: ${theme.colors.secondaryText};
    }

    ${({ $active }) =>
        $active &&
        `
        background: ${theme.colors.secondaryText};
        color: ${theme.colors.white};
        `}

    @media screen and (max-width: 660px) {
        width: 42px;
        height: 42px;
        margin: 2px;
        font-size: 14px;
    }
`;

export const CalendarNavigation = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-top: 14px;
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const CalendarPeriod = styled.div`
    padding: 0 7px;

    @media screen and (max-width: 660px) {
        padding: 0;
    }
`;

export const CalendarNavActions = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

export const CalendarNavButton = styled.button`
    width: 18px;
    height: 25px;
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
        width: 10px;
        height: 10px;
        fill: currentColor;
    }
`;
