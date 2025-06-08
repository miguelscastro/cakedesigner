import { useState } from 'react'
import { Container, DataForm } from './styles'
import { useForm, useFormState } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../../../../../../../hooks/useAuth'
import { ErrorText } from '../../../../../../../Checkout/components/AddressInfo/styles'

const userSecuritySettingsValidationSchema = z.object({
  password: z
    .string()
    .nonempty({ message: 'A senha é obrigatória' })
    .min(8, { message: 'A senha deve ter no mínimo 8 caracteres' })
    .max(100, { message: 'A senha deve ter no máximo 100 caracteres' })
    .regex(/[A-Z]/, {
      message: 'A senha deve conter pelo menos uma letra maiúscula',
    })
    .regex(/[a-z]/, {
      message: 'A senha deve conter pelo menos uma letra minúscula',
    })
    .regex(/\d/, {
      message: 'A senha deve conter pelo menos um número',
    })
    .regex(/[^A-Za-z0-9]/, {
      message: 'A senha deve conter pelo menos um caractere especial',
    }),
})

export type userSettingsInfoData = z.infer<
  typeof userSecuritySettingsValidationSchema
>

export function ChangeUserSecurityInfo() {
  const { updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const ChangeUserSecurityInfoForm = useForm<userSettingsInfoData>({
    resolver: zodResolver(userSecuritySettingsValidationSchema),
    defaultValues: {
      password: '',
    },
  })

  const { handleSubmit, register, reset, control, setError } =
    ChangeUserSecurityInfoForm
  const { errors } = useFormState({ control })

  function handleToggleEdit() {
    setIsEditing((state) => !state)
    reset()
  }
  async function handleChangeUserSecurityInfoData(data: userSettingsInfoData) {
    const result = await updateUserInfo(data)

    if (typeof result == 'string') {
      setError('password', {
        type: 'manual',
        message: result,
      })
    }
    handleToggleEdit()
    reset()
  }

  return (
    <Container>
      <h2>Formas de segurança</h2>
      <DataForm onSubmit={handleSubmit(handleChangeUserSecurityInfoData)}>
        <span>Senha</span>

        {isEditing ? (
          <>
            <input
              type="text"
              {...register('password')}
              placeholder="nova senha"
              autoFocus
            />
            {errors.password?.message && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </>
        ) : (
          <p />
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
  )
}
