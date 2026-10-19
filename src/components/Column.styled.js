import styled from "styled-components";
import { theme } from "../theme";

export const ColumnWrapper = styled.div`
  flex: 0 0 20%;
  min-width: 0;
  margin: 0;
  padding: 0 7px;
  box-sizing: border-box;
  display: flex;
  flex-direction: column;

  @media screen and (max-width: 1200px) {
    width: 100%;
    flex: 0 0 100%;
    padding: 0 0 20px;
  }
`;

export const ColumnTitle = styled.div`
  padding: 0 10px;
  margin: 15px 0;

  p {
    margin: 0;
    color: ${theme.colors.secondaryText};
    font-size: 14px;
    font-weight: 600;
    line-height: 1.4;
    text-transform: uppercase;
  }
`;

export const CardsList = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: stretch;
  gap: 12px;
  position: relative;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    align-items: flex-start;
    overflow-x: auto;
    padding-bottom: 10px;
  }
`;