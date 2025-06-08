import { useEffect, useState } from 'react'
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

const accountInfoValidationSchema = z.object({
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

export type accountInfoData = z.infer<typeof accountInfoValidationSchema>

export function AccountInfo() {
  const { authenticatedUser, updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [successMessage, setSuccessMessage] = useState<string | null>(null)

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null)
        handleToggleEdit()
        reset()
      }, 3500)

      return () => clearTimeout(timer)
    }
  }, [successMessage])

  const ChangeAccountInfoForm = useForm<accountInfoData>({
    resolver: zodResolver(accountInfoValidationSchema),
    defaultValues: {
      email: '',
    },
  })

  const { handleSubmit, register, reset, control, setError, clearErrors } =
    ChangeAccountInfoForm

  const { errors } = useFormState({ control })

  function handleToggleEdit() {
    setIsEditing((state) => !state)
    reset()
  }

  async function handleChangeUserAccountInfoData(data: accountInfoData) {
    const result = await updateUserInfo(data)

    if (typeof result == 'string') {
      setError('email', {
        type: 'manual',
        message: result,
      })
      setSuccessMessage(null)
      return
    }
    setSuccessMessage('Dados atualizados com sucesso')
    clearErrors('email')
  }

  return (
    <>
      <Breadcrumb />
      <Container>
        <h2>Dados da sua conta</h2>
        <DataForm onSubmit={handleSubmit(handleChangeUserAccountInfoData)}>
          <span>E-mail</span>

          {isEditing ? (
            <>
              <input
                type="text"
                {...register('email')}
                placeholder={authenticatedUser?.email}
                autoFocus
              />
              {errors.email?.message ? (
                <ErrorText>{errors.email.message}</ErrorText>
              ) : successMessage ? (
                <ErrorText success>{successMessage}</ErrorText>
              ) : null}
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
