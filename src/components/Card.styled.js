import styled, { keyframes } from "styled-components";
import { theme } from "../theme";

const cardAnimation = keyframes`
  0% {
    height: 0;
    opacity: 0;
  }

  100% {
    height: auto;
    opacity: 1;
  }
`;

export const CardItem = styled.div`
    padding: 5px;
    animation: ${cardAnimation} 500ms linear;
`;

export const CardWrapper = styled.div`
    width: 220px;
    min-height: 130px;
    flex-shrink: 0;
    background: ${theme.colors.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: stretch;
    padding: 15px 13px 19px;
    box-sizing: border-box;
`;

export const CardGroup = styled.div`
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    margin-bottom: 10px;
`;

export const CardLink = styled.button`
    border: 0;
    background: transparent;
    &:focus-visible { outline: 2px solid #565eef; outline-offset: 2px; }
    width: 24px;
    height: 24px;
    flex-shrink: 0;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 3px;
    padding: 2px;
    color: inherit;

    div {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background: ${theme.colors.secondaryText};
    }
`;

export const CardTitle = styled.h3`
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    color: ${theme.colors.black};
    text-transform: none;
    overflow-wrap: anywhere;
    margin: 0;
`;

export const CardContent = styled.div`
    width: 100%;
    flex: 1;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;
`;

export const CardTopic = styled.div`
    width: fit-content;
    padding: 5px 14px;
    border-radius: 18px;

    background: ${({ $topic }) =>
        theme.topics[
        $topic === "Web Design"
            ? "orange"
            : $topic === "Research"
            ? "green"
            : $topic === "Copywriting"
            ? "purple"
            : "gray"
        ].background};

    color: ${({ $topic }) =>
        theme.topics[
        $topic === "Web Design"
            ? "orange"
            : $topic === "Research"
            ? "green"
            : $topic === "Copywriting"
            ? "purple"
            : "gray"
        ].color};

    p {
        margin: 0;
        font-size: 10px;
        font-weight: 600;
        line-height: 10px;
    }
`;

export const CardDate = styled.div`
    display: flex;
    align-items: center;
    justify-content: flex-start;

    svg {
        width: 13px;
    }

    p {
        margin-left: 6px;
        font-size: 10px;
        line-height: 13px;
        color: ${theme.colors.secondaryText};
        letter-spacing: 0.2px;
    }
`;

export const CardDateText = styled.p`
    margin-left: 6px;
    font-size: 10px;
    line-height: 13px;
    color: ${theme.colors.secondaryText};
    letter-spacing: 0.2px;
`;

export const CardBtn = styled.div`
    width: 24px;
    height: 24px;
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 2px;
    div {
        width: 4px;
        height: 4px;
        border-radius: 50%;
        background-color: ${theme.colors.secondaryText};
    }
`;