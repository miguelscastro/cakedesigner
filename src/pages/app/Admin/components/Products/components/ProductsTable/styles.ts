import styled from "styled-components";
import { mixins } from "../../../../../../../styles/mixins";

export const TableOfProducts = styled.table`
  width: 100%;
  margin-top: 1rem;
  padding: 1rem;
  text-align: center;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;

  img {
    border-radius: 100%;
  }

  td {
    ${mixins.fonts.textXS}
    padding-top: 0.5rem;
  }

  button {
    ${mixins.fonts.textXS}
    padding: 0.5rem;
    color: ${({ theme }) => theme.colors.background};
    border-radius: 8px;

    &:not(:last-of-type) {
      margin-right: 0.5rem;
      background: ${({ theme }) => theme.colors["brown-dark"]};
    }

    &:last-of-type {
      background: ${({ theme }) => theme.colors.error};
    }
  }
`;
