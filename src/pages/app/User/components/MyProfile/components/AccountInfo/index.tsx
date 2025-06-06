import { useState } from 'react'
import { useAuth } from '../../../../../../../hooks/useAuth'
import { Breadcrumb } from '../../../Breadcrumb'
import { Container, DataForm } from './styles'
import { useForm, useFormState } from 'react-hook-form'
import { ErrorText } from '../../../../../Checkout/components/AddressInfo/styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const allowedDomains = [
  'gmail.com',
  'hotmail.com',
  'outlook.com',
  'yahoo.com.br',
  'yahoo.com',
  'icloud.com',
  'live.com',
]

const changeAccountInfoValidationSchema = z.object({
  email: z
    .string({ required_error: 'Informe o e-mail' })
    .email('Formato de e-mail inválido')
    .refine(
      (email) => {
        const domain = email.split('@')[1]?.toLowerCase()
        return allowedDomains.includes(domain)
      },
      {
        message: 'Insira um e-mail válido',
      },
    ),
})

export type ChangeAccountInfoData = z.infer<
  typeof changeAccountInfoValidationSchema
>

export function AccountInfo() {
  const { authenticatedUser, updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const ChangeAccountInfoForm = useForm<ChangeAccountInfoData>({
    resolver: zodResolver(changeAccountInfoValidationSchema),
    defaultValues: {
      email: '',
    },
  })

  const { handleSubmit, register, reset, control } = ChangeAccountInfoForm

  const { errors } = useFormState({ control })

  function handleToggleEdit() {
    setIsEditing((state) => !state)
    reset()
  }

  function changeUserData(data: ChangeAccountInfoData) {
    updateUserInfo(data)
    handleToggleEdit()
    reset()
  }

  return (
    <>
      <Breadcrumb />
      <Container>
        <h2>Dados da sua conta</h2>
        <DataForm onSubmit={handleSubmit(changeUserData)}>
          <span>E-mail</span>

          {isEditing ? (
            <>
              <input
                type="text"
                {...register('email')}
                placeholder={authenticatedUser?.email}
                autoFocus
              />
              {errors.email?.message && (
                <ErrorText>{errors.email.message}</ErrorText>
              )}
            </>
          ) : (
            <p>{authenticatedUser?.email}</p>
          )}

          <div>
            {isEditing ? (
              <>
                <button type="button" onClick={handleToggleEdit}>
                  Cancelar
                </button>
                <button type="submit">Enviar</button>
              </>
            ) : (
              <button type="button" onClick={handleToggleEdit}>
                Alterar
              </button>
            )}
          </div>
        </DataForm>
      </Container>
    </>
  )
}
