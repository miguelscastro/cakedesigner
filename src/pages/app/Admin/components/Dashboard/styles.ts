import styled from "styled-components";
import { mixins } from "../../../../../styles/mixins";

export const Container = styled.div`
  max-width: 1440px;
  width: 937px;
  padding: 5rem;
`;

export const DashboardHeader = styled.header`
  display: flex;
  justify-content: space-between;
`;

const baseCard = styled.div`
  padding: 1rem;
  background: ${({ theme }) => theme.colors.background};
  width: 40%;
  border-radius: 8px;

  > span {
    ${mixins.fonts.textM}
    font-weight: bold;
    padding-bottom: 4rem;
  }
`;

export const MonthOrders = styled(baseCard)`
  p {
    ${mixins.fonts.titleL}
    margin-top: 0.25rem;
  }
`;

export const MonthTotal = styled(baseCard)`
  p {
    ${mixins.fonts.titleXS}
    margin-top: 0.75rem;
  }
`;

export const Chart = styled.div`
  margin-top: 8rem;

  padding: 2rem;
  background: ${({ theme }) => theme.colors.background};
  border-radius: 8px;
`;
