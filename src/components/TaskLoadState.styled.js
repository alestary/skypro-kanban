
import styled, { keyframes } from "styled-components";

const wave = keyframes`
  0% {
    background-position: 200% 0;
  }

  100% {
    background-position: -200% 0;
  }
`;

export const LoadingState = styled.div`
  display: flex;
  min-height: 180px;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 16px;
  color: #565eef;

  p {
    margin: 0;
    color: #333;
    font-size: 16px;
  }
`;

export const Spinner = styled.div`
  width: 42px;
  height: 42px;
  border: 4px solid #e5e7ff;
  border-top-color: #565eef;
  border-radius: 50%;
  animation: ${keyframes`
    to {
      transform: rotate(360deg);
    }
  `} 0.8s linear infinite;
`;

export const SkeletonBoard = styled.div`
  width: 100%;
  display: flex;
  align-items: flex-start;
  gap: 0;
  font-family: Roboto, sans-serif;

  @media screen and (max-width: 1200px) {
    flex-direction: column;
  }
`;

export const SkeletonColumn = styled.div`
  flex: 0 0 20%;
  min-width: 0;
  padding: 0 7px;
  box-sizing: border-box;

  @media screen and (max-width: 1200px) {
    width: 100%;
    flex: 0 0 100%;
    padding: 0 0 20px;
  }
`;

export const SkeletonHeading = styled.div`
  height: 14px;
  width: 65%;
  margin: 15px 10px 27px;
  border-radius: 4px;
  background: #e1e3e8;
`;

export const SkeletonCards = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;

  @media screen and (max-width: 1200px) {
    flex-direction: row;
    overflow: hidden;
  }
`;

export const SkeletonCard = styled.div`
  position: relative;
  overflow: hidden;
  flex: 0 0 auto;
  width: 100%;
  height: 130px;
  padding: 15px 13px;
  box-sizing: border-box;
  border-radius: 10px;
  background: #e1e3e8;

  @media screen and (max-width: 1200px) {
    width: 220px;
  }

  &::after {
    content: "";
    position: absolute;
    inset: 0;
    background: linear-gradient(
      105deg,
      transparent 25%,
      rgba(255, 255, 255, 0.7) 45%,
      transparent 65%
    );
    background-size: 200% 100%;
    animation: ${wave} 1.4s ease-in-out infinite;
  }

  @media (prefers-reduced-motion: reduce) {
    &::after {
      animation: none;
    }
  }
`;

export const SkeletonLine = styled.div`
  height: 10px;
  width: ${({ $width = "60%" }) => $width};
  border-radius: 5px;
  background: rgba(255, 255, 255, 0.65);
  margin-bottom: 12px;
`;
