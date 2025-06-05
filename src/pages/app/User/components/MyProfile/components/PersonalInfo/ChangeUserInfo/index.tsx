import { useState } from 'react'
import { useAuth } from '../../../../../../../../hooks/useAuth'
import { Container, DataForm } from './styles'
import { useFormContext, useFormState } from 'react-hook-form'
import { ChangeUserInfoData } from '../../..'
import { ErrorText } from '../../../../../../Checkout/components/AddressInfo/styles'

export function ChangeUserInfo() {
  const { authenticatedUser, updateUserInfo } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const { handleSubmit, register, reset } = useFormContext<ChangeUserInfoData>()
  const { errors } = useFormState<ChangeUserInfoData>()

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
