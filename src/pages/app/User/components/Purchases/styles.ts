import styled from "styled-components";

export const Container = styled.div`
  max-width: 1440px;

  margin: 0 auto;

  > div {
    margin: 1rem;
    padding: 3rem 5rem;

    max-height: calc(100vh - 200px);
    overflow-y: auto;

    > h1 {
      margin-bottom: 1rem;
    }

    &::-webkit-scrollbar {
      width: 0.5rem;
    }

    &::-webkit-scrollbar-track {
      background: ${({ theme }) => theme.colors["base-hover"]};
      margin-left: 12px;
    }

    &::-webkit-scrollbar-thumb {
      background-color: ${({ theme }) => theme.colors["base-text"]};
      border-radius: 10px;
    }

    &::-webkit-scrollbar-thumb:hover {
      background-color: ${({ theme }) => theme.colors["brown-dark"]};
    }
  }
`;

export const EmptyOrders = styled.div`
  margin-top: 3rem;
  padding: 5rem 5rem 4rem;
  text-align: center;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors["base-text"]}22;
  opacity: 0.5;

  border: 2px solid black;
  border-radius: 2rem;

  > svg {
    width: 220px;
    height: 220px;

    margin-top: 4rem;

    color: ${({ theme }) => theme.colors.error};
  }
`;
