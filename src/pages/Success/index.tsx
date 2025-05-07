import { useLocation } from 'react-router-dom'

import { CurrencyDollar, MapPin, Timer } from '@phosphor-icons/react'

import illustration from '../../assets/images/Illustration.svg'
import {
  Container,
  Illustration,
  Status,
  StatusContainer,
  StatusField,
  StatusFieldHeader,
} from './styles'

export function Success() {
  const { state } = useLocation()

  return (
    <Container>
      <StatusContainer>
        <h1>Uhu! Pedido confirmado</h1>
        <p>Agora é só aguardar que logo seu pedido chega até você.</p>
        <Status>
          <StatusField $type="map">
            <MapPin size={32} weight="fill" />
            <StatusFieldHeader>
              <h3>
                Entrega em
                <span>
                  {state.address.street}, {state.address.number}
                </span>
              </h3>
              <p>
                {state.address.neighborhood} - {state.address.city},{' '}
                <span>{state.address.state}</span>
              </p>
            </StatusFieldHeader>
          </StatusField>
          <StatusField $type="timer">
            <Timer size={32} weight="fill" />
            <StatusFieldHeader>
              <h3>Previsão de entrega</h3>
              <p>
                <span>20 min - 30 min</span>
              </p>
            </StatusFieldHeader>
          </StatusField>
          <StatusField $type="cash">
            <CurrencyDollar size={32} />
            <StatusFieldHeader>
              <h3>Pagamento na entrega</h3>
              <p>
                <span>{state.address.paymentMethod}</span>
              </p>
            </StatusFieldHeader>
          </StatusField>
        </Status>
      </StatusContainer>
      <Illustration src={illustration} alt="" />
    </Container>
  )
}
