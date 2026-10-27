
import styled, { keyframes } from "styled-components";
import { theme } from "../theme";

const cardAnimation = keyframes`
    from {
        opacity: 0;
        transform: translateY(12px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
`;

export const CardWrapper = styled.div`
    width: 220px;
    min-width: 220px;
    max-width: 100%;
    min-height: 130px;
    height: auto;
    flex-shrink: 0;
    align-self: flex-start;

    box-sizing: border-box;
    overflow-wrap: anywhere;
    background: ${theme.colors.white};
    border-radius: 10px;
    display: flex;
    flex-direction: column;
    align-items: stretch;
    justify-content: flex-start;
    padding: 15px 13px 19px;

    animation: ${cardAnimation} 400ms ease-out both;
    animation-delay: ${({ $animationIndex = 0 }) =>
        `${Math.min($animationIndex * 60, 420)}ms`};

    @media (prefers-reduced-motion: reduce) {
        animation: none;
    }
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
    min-width: 0;
    flex: 1 1 auto;
    gap: 10px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    justify-content: space-between;

    > a {
        display: block;
        width: 100%;
        min-width: 0;
        color: inherit;
        text-decoration: none;
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
    align-items: flex-start;
    justify-content: flex-start;
    width: 100%;
    min-width: 0;
    margin-top: auto;

    p {
        min-width: 0;
        margin: 0 0 0 6px;
        font-size: 10px;
        line-height: 13px;
        color: ${theme.colors.secondaryText};
        letter-spacing: 0.2px;
        overflow-wrap: anywhere;
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