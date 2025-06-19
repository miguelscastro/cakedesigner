import styled from "styled-components";
import { mixins } from "../../../../../../../styles/mixins";

export const Container = styled.div`
  flex: 1;
`;

export const ProductTypeDataForm = styled.form`
  justify-content: center;
  align-items: baseline;

  .submit-message {
    display: flex;
    align-items: center;

    button {
      ${mixins.fonts.buttonM}
      font-weight: bold;

      width: 100%;

      background: ${({ theme }) => theme.colors["brown-dark"]};
      color: ${({ theme }) => theme.colors.background};
      transition: 0.8s;

      border-radius: 6px;
      padding: 0.75rem;

      margin-top: 0.5rem;

      &:not(:last-of-type) {
        margin-right: 0.5rem;
      }

      &:hover {
        background: ${({ theme }) => theme.colors.brown};
      }
    }
    span {
      color: ${({ theme }) => theme.colors.success};

      border-radius: 6px;
      padding: 0.75rem;
      margin-right: 4rem;

      ${mixins.fonts.titleXS}
    }
  }
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;

  margin: 0.25rem 0;
  padding: 0.5rem;
  box-shadow: 0 2px 6px ${({ theme }) => theme.colors["base-text"]}22;

  background: ${({ theme }) => theme.colors["base-card"]};
  border-radius: 6px;
  width: 100%;

  span {
    ${mixins.fonts.textS}
  }

  p {
    ${mixins.fonts.textXS}

    border-bottom: 1px solid ${({ theme }) => theme.colors["brown-dark"]};
    padding: 0.25rem 0 0.5rem;
  }

  input {
    border: none;
    outline: none;
    background: ${({ theme }) => theme.colors["base-card"]};

    ${mixins.fonts.textXS}

    padding: 0.25rem 0 0.5rem;
    border-bottom: 1px solid ${({ theme }) => theme.colors["brown-dark"]};

    &::placeholder {
      color: ${({ theme }) => theme.colors["brown-dark"]};
      opacity: 0.4;
    }
  }
`;
