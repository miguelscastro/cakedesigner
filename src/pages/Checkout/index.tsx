import { useNavigate } from 'react-router-dom'
import { FormProvider, useForm } from 'react-hook-form'
import { AddressInfo } from './components/AddressInfo'
import { Cart } from './components/Cart'
import { Address, CartTotal, Container, OrderForm } from './styles'

import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useCart } from '../../hooks/useCart'

const AddressInfoValidationSchema = z.object({
  cep: z.coerce
    .string({ invalid_type_error: 'Informe o CEP' })
    .max(9, 'Máximo de 9 dígitos'),
  street: z.string().min(1, 'Informe a rua').max(61, 'Máximo de 60 dígitos'),
  number: z.coerce
    .string()
    .min(1, 'Informe o número')
    .max(8, 'Máximo de 8 dígitos'),
  fullAddress: z.string(),
  neighborhood: z.string().min(1, 'Informe o bairro'),
  city: z.string().min(1, 'Informe a cidade').max(56, 'Máximo de 55 dígitos'),
  state: z.string().min(2, 'Informe a UF').max(2, 'Máximo de 2 dígitos'),
  paymentMethod: z.enum(['Cartão de Crédito', 'Cartão de Débito', 'Dinheiro'], {
    invalid_type_error: 'Informe um método de pagamento',
  }),
})

export type AddressInfoData = z.infer<typeof AddressInfoValidationSchema>

export function Checkout() {
  const AddressInfoForm = useForm<AddressInfoData>({
    resolver: zodResolver(AddressInfoValidationSchema),
    defaultValues: {
      cep: '',
      street: '',
      number: '',
      fullAddress: '',
      neighborhood: '',
      city: '',
      state: '',
      paymentMethod: undefined,
    },
  })

  const { handleSubmit, reset } = AddressInfoForm

  const { products, CartSize, clearCart } = useCart()

  const navigate = useNavigate()

  function confirmOrder(data: AddressInfoData) {
    if (CartSize > 0) {
      const address = data
      const order = { products, address }
      reset()
      clearCart()
      navigate('/success', {
        state: order,
      })
    }
  }

  return (
    <Container>
      <FormProvider {...AddressInfoForm}>
        <OrderForm
          id="order"
          autoComplete="off"
          onSubmit={handleSubmit(confirmOrder)}
        >
          <Address>
            <h2>Complete seu pedido</h2>
            <AddressInfo />
          </Address>

          <CartTotal>
            <h2>Produtos Selecionados</h2>
            <Cart />
          </CartTotal>
        </OrderForm>
      </FormProvider>
    </Container>
  )
}
