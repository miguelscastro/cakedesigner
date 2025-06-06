import { useState } from 'react'
import { useAuth } from '../../../../../../../../hooks/useAuth'
import { Container, DataForm } from './styles'
import { useForm, useFormState } from 'react-hook-form'
import { ErrorText } from '../../../../../../Checkout/components/AddressInfo/styles'
import { z } from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

const changeUserInfoValidationSchema = z.object({
  name: z
    .string()
    .min(2, 'Informe seu nome')
    .max(60, 'Máximo de 60 caracteres'),
})

export type ChangeUserInfoData = z.infer<typeof changeUserInfoValidationSchema>

export function ChangeUserInfo() {
  const { authenticatedUser, updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const ChangeUserInfoForm = useForm<ChangeUserInfoData>({
    resolver: zodResolver(changeUserInfoValidationSchema),
    defaultValues: {
      name: '',
    },
  })

  const { handleSubmit, register, reset, control } = ChangeUserInfoForm
  const { errors } = useFormState({ control })

  function handleToggleEdit() {
    setIsEditing((state) => !state)
    reset()
  }

  function changeUserData(data: ChangeUserInfoData) {
    updateUserInfo(data)
    handleToggleEdit()
    reset()
  }

  return (
    <Container>
      <h2>Dados pessoais</h2>
      <DataForm onSubmit={handleSubmit(changeUserData)}>
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
