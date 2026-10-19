import styled from "styled-components";
import { theme } from "../theme";

export const ContainerWrapper = styled.div`
    max-width: 1260px;
    width: 100%;
    margin: 0 auto;
    padding: 0 30px;
`;

export const HeaderWrapper = styled.header`
  width: 100%;
  margin: 0 auto;
  background: ${theme.colors.white};
`;

export const HeaderBlock = styled.div`
    height: 70px;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: space-between;
    gap: 12px;
    @media (max-width: 600px) { height: auto; min-height: 70px; flex-wrap: wrap; padding: 12px; }
    position: relative;
    top: 0;
    left: 0;
    padding: 0 10px;
`;

export const HeaderLogo = styled.div`
  img {
    width: 85px;
  }
`;

export const HeaderNav = styled.nav`
    max-width: 290px;
    padding: 0;
    display: flex;
    align-items: center;
    justify-content: center;
`;

export const HeaderNewButton = styled.button`
    width: 178px;
    height: 30px;
    border-radius: 4px;
    border: none;
    font-size: 14px;
    line-height: 1;
    font-weight: 500;
    margin-right: 12px;
    @media (max-width: 600px) { width: 130px; height: auto; min-height: 36px; font-size: 12px; padding: 6px; }
    background: ${theme.colors.primary};
    color: ${theme.colors.white};
    &:hover {
        background: ${theme.colors.hover};
    }
`;

export const HeaderUserArea = styled.div`
    position: relative;
`;

export const HeaderUserButton = styled.button`
    min-height: 24px;
    max-width: 140px;
    overflow-wrap: anywhere;
    display: flex;
    flex-wrap: nowrap;
    align-items: center;
    justify-content: center;
    font-size: 14px;
    line-height: 20px;
    color: ${theme.colors.primary};
    border: none;
    background: ${theme.colors.headerbc};
    font-weight: 500;
    &::after {
        content: "";
        display: block;
        width: 6px;
        height: 6px;
        border-radius: 1px;
        border-left: 1.9px solid ${theme.colors.primary};
        border-bottom: 1.9px solid  ${theme.colors.primary};
        transform: rotate(-45deg);
        margin: -6px 0 0 5px;
        padding: 0;
    }
    &:hover {
        color: ${theme.colors.hover};
    }
    &:hover::after {
        border-left-color: ${theme.colors.hover};
        border-bottom-color: ${theme.colors.hover};
    }
    &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 3px;
    }
`;

