import { useState } from 'react'
import { Container, DataForm } from './styles'
import { useForm, useFormState } from 'react-hook-form'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'
import { useAuth } from '../../../../../../../../../hooks/useAuth'
import { ErrorText } from '../../../../../../../Checkout/components/AddressInfo/styles'

const userPersonalInfoValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe seu nome')
    .max(100, 'Máximo de 100 caracteres'),
})

export type userPersonalInfoData = z.infer<
  typeof userPersonalInfoValidationSchema
>

export function ChangeUserInfo() {
  const { authenticatedUser, updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const ChangePersonalInfoForm = useForm<userPersonalInfoData>({
    resolver: zodResolver(userPersonalInfoValidationSchema),
    defaultValues: {
      name: '',
    },
  })

  const { handleSubmit, register, reset, control, setError } =
    ChangePersonalInfoForm
  const { errors } = useFormState({ control })

  function handleToggleEdit() {
    setIsEditing((state) => !state)
    reset()
  }

  async function handleChangeUserInfoData(data: userPersonalInfoData) {
    const result = await updateUserInfo(data)

    if (typeof result == 'string') {
      setError('name', {
        type: 'manual',
        message: result,
      })
    }
    handleToggleEdit()
    reset()
  }

  return (
    <Container>
      <h2>Dados pessoais</h2>
      <DataForm onSubmit={handleSubmit(handleChangeUserInfoData)}>
        <span>Nome completo</span>

        {isEditing ? (
          <>
            <input
              type="text"
              {...register('name')}
              placeholder={authenticatedUser?.name}
              autoFocus
            />
            {errors.name?.message && (
              <ErrorText>{errors.name.message}</ErrorText>
            )}
          </>
        ) : (
          <p>{authenticatedUser?.name}</p>
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
