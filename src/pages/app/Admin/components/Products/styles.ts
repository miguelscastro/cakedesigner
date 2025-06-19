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

export const ContainerBody = styled.div``;
