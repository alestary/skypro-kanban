
import styled from "styled-components";
import { theme } from "../../theme";

export const PopUserWrapper = styled.div`
    position: absolute;
    top: calc(100% + 12px);
    right: 0;
    z-index: 100;

    box-sizing: border-box;
    width: 213px;
    min-height: 205px;
    padding: 30px 20px;

    display: flex;
    flex-direction: column;
    align-items: center;

    background-color: #ffffff;
    border: 1px solid rgba(148, 166, 190, 0.4);
    border-radius: 10px;
    box-shadow: 0 10px 39px rgba(26, 56, 101, 0.21);
`;

export const PopUserName = styled.p`
    max-width: 100%;
    margin: 0 0 6px;
    color: #000000;
    font-size: 14px;
    font-weight: 500;
    line-height: 18px;
    text-align: center;
    overflow-wrap: anywhere;
`;

export const PopUserEmail = styled.p`
    max-width: 100%;
    margin: 0 0 20px;
    color: ${theme.colors.secondaryText};
    font-size: 10px;
    font-weight: 400;
    line-height: 12px;
    text-align: center;
    overflow-wrap: anywhere;
`;

export const PopUserTheme = styled.div`
    width: 100%;
    margin-bottom: 20px;
    display: flex;
    align-items: center;
    justify-content: space-between;
    gap: 8px;
    color: #000000;
    font-size: 12px;
    line-height: 16px;
`;

export const PopUserThemeLabel = styled.label`
    display: flex;
    align-items: center;
    gap: 8px;
    cursor: pointer;
`;

export const PopUserThemeCheckbox = styled.input`
    width: 14px;
    height: 14px;
    margin: 0;
    accent-color: ${theme.colors.primary};
    cursor: pointer;
`;

export const PopUserExit = styled.button`
    width: 100%;
    min-height: 30px;
    padding: 6px 10px;
    border: 1px solid  ${theme.colors.primary};
    border-radius: 4px;
    background-color: #ffffff;
    color: ${theme.colors.primary};
    font: inherit;
    font-size: 12px;
    cursor: pointer;
    transition:
        background-color 0.2s ease,
        color 0.2s ease;
    &:hover {
        background-color:  ${theme.colors.primary};
        color: #ffffff;
    }
    &:focus-visible {
        outline: 2px solid ${theme.colors.primary};
        outline-offset: 3px;
    }
`;
