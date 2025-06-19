import styled from "styled-components";
import { mixins } from "../../../../../styles/mixins";

export const Container = styled.div`
  padding: 1rem;

  h2 {
    ${mixins.fonts.titleXS}
  }
`;

export const ContainerHeader = styled.div`
  display: flex;

  > div {
    display: flex;
    flex-direction: column;
    margin: 0 2rem;

    h2 {
      margin: 0.5rem;
    }
  }
`;

export const ContainerBody = styled.div`
  max-height: 440px;
  overflow-y: auto;
  margin-top: 1rem;

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
`;
