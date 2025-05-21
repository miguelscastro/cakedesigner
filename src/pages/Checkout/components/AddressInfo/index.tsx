import {
  Bank,
  CreditCard,
  CurrencyDollar,
  MapPinLine,
  Money,
} from '@phosphor-icons/react'
import {
  Address,
  Container,
  ErrorText,
  InfoContent,
  InfoHeader,
  InputWrapper,
  OptionalText,
  PaymentOption,
  PaymentOptions,
  TextInput,
} from './styles'
import { useFormContext } from 'react-hook-form'
import { ChangeEvent } from 'react'

interface ErrorType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}
export function AddressInfo() {
  const { register, watch, formState, setValue } = useFormContext()

  const isFilled = watch('fullAddress')

  const { errors } = formState as unknown as ErrorType

  function handleCheckCEP(event: ChangeEvent<HTMLInputElement>) {
    const cep = event.target.value
    if (cep.length !== 8) return

    let url = 'https://viacep.com.br/ws/' + cep + '/json/'
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        if (data.erro) return
        setValue('cep', data.cep || '')
        setValue('street', data.logradouro || '')
        setValue('fullAddress', data.complemento || '')
        setValue('neighborhood', data.bairro || '')
        setValue('city', data.localidade || '')
        setValue('state', data.uf || '')
      })
  }

  return (
    <Container>
      <Address>
        <InfoHeader>
          <MapPinLine size={22} />
          <div>
            <h3>Endereço de Entrega</h3>
            <p>Informe o endereço onde deseja receber seu pedido</p>
          </div>
        </InfoHeader>
        <InfoContent $display="grid">
          <InputWrapper $area="cep">
            <TextInput
              placeholder="CEP"
              {...register('cep')}
              type="text"
              required
              onChange={handleCheckCEP}
            />
            {errors.cep?.message && <ErrorText>{errors.cep.message}</ErrorText>}
          </InputWrapper>
          <InputWrapper $area="street">
            <TextInput
              placeholder="Rua"
              {...register('street')}
              type="text"
              maxLength={61}
              required
            />
            {errors.street?.message && (
              <ErrorText>{errors.street.message}</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper $area="number">
            <TextInput
              placeholder="Número"
              {...register('number')}
              type="number"
              required
              maxLength={8}
            />
            {errors.number?.message && (
              <ErrorText>{errors.number.message}</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper $area="fullAddress">
            <TextInput placeholder="Complemento" {...register('fullAddress')} />
            {isFilled === '' && <OptionalText>Opcional</OptionalText>}
          </InputWrapper>
          <InputWrapper $area="neighborhood">
            <TextInput
              placeholder="Bairro"
              {...register('neighborhood')}
              type="text"
              required
            />
            {errors.neighborhood?.message && (
              <ErrorText>{errors.neighborhood.message}</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper $area="city">
            <TextInput
              placeholder="Cidade"
              {...register('city')}
              type="text"
              required
            />
            {errors.city?.message && (
              <ErrorText>{errors.city.message}</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper $area="state">
            <TextInput
              placeholder="UF"
              {...register('state')}
              type="text"
              required
              minLength={2}
              maxLength={2}
            />
            {errors.state?.message && (
              <ErrorText>{errors.state.message}</ErrorText>
            )}
          </InputWrapper>
        </InfoContent>
      </Address>
      <PaymentOptions>
        <InfoHeader>
          <CurrencyDollar size={22} />
          <div>
            <h3>Pagamento</h3>
            <p>
              O pagamento é feito na entrega. Escolha a forma que deseja pagar
            </p>
          </div>
        </InfoHeader>
        <InfoContent $display="flex">
          <div>
            <PaymentOption>
              <TextInput
                type="radio"
                value="Cartão de Crédito"
                required
                {...register('paymentMethod')}
              />
              <div>
                <CreditCard />
                <p>CARTÃO DE CRÉDITO</p>
              </div>
            </PaymentOption>
            <PaymentOption>
              <TextInput
                type="radio"
                value="Cartão de Débito"
                {...register('paymentMethod')}
              />
              <div>
                <Bank />
                <p>CARTÃO DE DÉBITO</p>
              </div>
            </PaymentOption>
            <PaymentOption>
              <TextInput
                type="radio"
                value="Dinheiro"
                {...register('paymentMethod')}
              />
              <div>
                <Money />
                <p>DINHEIRO</p>
              </div>
            </PaymentOption>
          </div>
          {errors.paymentMethod?.message && (
            <ErrorText>{errors.paymentMethod.message}</ErrorText>
          )}
        </InfoContent>
      </PaymentOptions>
    </Container>
  )
}
