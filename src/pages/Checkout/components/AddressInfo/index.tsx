import {
  BankIcon,
  CreditCardIcon,
  CurrencyDollarIcon,
  MapPinLineIcon,
  MoneyIcon,
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
import { ChangeEvent, useState } from 'react'

interface ErrorType {
  errors: {
    [key: string]: {
      message: string
    }
  }
}
export function AddressInfo() {
  const [isCepRight, setIsCepRight] = useState(false)
  const { register, watch, formState, reset } = useFormContext()

  const isFilled = watch('fullAddress')

  const { errors } = formState as unknown as ErrorType

  function handleCheckCEP(event: ChangeEvent<HTMLInputElement>) {
    const cep = event.target.value

    if (cep.length === 8) {
      let url = 'https://viacep.com.br/ws/' + cep + '/json/'
      fetch(url)
        .then((response) => response.json())
        .then((data) => {
          if (!data.erro) {
            reset({
              cep: data.cep,
              street: data.logradouro,
              fullAddress: data.complemento,
              neighborhood: data.bairro,
              city: data.localidade,
              state: data.uf,
            })

            setIsCepRight(true)
          }
        })
    }
    if (cep.length < 9) {
      reset({ cep })
      setIsCepRight(false)
      return
    }
  }

  return (
    <Container>
      <Address>
        <InfoHeader>
          <MapPinLineIcon size={22} />
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
              disabled={isCepRight}
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
            <TextInput
              placeholder="Complemento"
              {...register('fullAddress')}
              disabled={isCepRight}
            />
            {isFilled === '' && <OptionalText>Opcional</OptionalText>}
          </InputWrapper>
          <InputWrapper $area="neighborhood">
            <TextInput
              placeholder="Bairro"
              {...register('neighborhood')}
              type="text"
              required
              disabled={isCepRight}
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
              disabled={isCepRight}
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
              disabled={isCepRight}
            />
            {errors.state?.message && (
              <ErrorText>{errors.state.message}</ErrorText>
            )}
          </InputWrapper>
        </InfoContent>
      </Address>
      <PaymentOptions>
        <InfoHeader>
          <CurrencyDollarIcon size={22} />
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
                <CreditCardIcon />
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
                <BankIcon />
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
                <MoneyIcon />
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
