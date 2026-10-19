import styled from "styled-components";
import { theme } from "../theme";

export const MainWrapper = styled.main`
    width: 100%;
    min-height: calc(100vh - 70px);
    background: ${theme.colors.board};
`;

export const MainStatuses = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
    gap: 0;
    font-family: Roboto, sans-serif;
    font-weight: 600;
    font-size: 14px;
    line-height: 100%;
    text-transform: uppercase;
    color: ${theme.colors.secondaryText};

    @media screen and (max-width: 1200px) {
        flex-direction: column;
  }
`;

export const MainBlock = styled.div`
    width: 100%;
    max-width: 1260px;
    margin: 0 auto;
    padding: 25px 30px 49px;
    box-sizing: border-box;

    @media screen and (max-width: 1200px) {
        padding: 40px 30px 64px;
    }

    @media screen and (max-width: 495px) {
        padding-left: 16px;
        padding-right: 16px;
  }
`;

export const MainContent = styled.div`
    width: 100%;
    display: flex;
    align-items: flex-start;
`;