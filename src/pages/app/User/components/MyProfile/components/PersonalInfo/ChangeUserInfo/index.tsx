import { useState } from 'react'
import { useAuth } from '../../../../../../../../hooks/useAuth'
import { Container, DataForm } from './styles'
import { useFormContext } from 'react-hook-form'
import { ChangeUserInfoData } from '../../..'

export function ChangeUserInfo() {
  const { authenticatedUser } = useAuth()
  const [isEditing, setIsEditing] = useState(false)

  const { handleSubmit, register, reset } = useFormContext<ChangeUserInfoData>()

  function handleToggleEdit() {
    setIsEditing((state) => !state)
  }

  function changeUserData(data: ChangeUserInfoData) {
    console.log(data)
    handleToggleEdit()
    reset()
  }

  return (
    <Container>
      <h2>Dados pessoais</h2>
      <DataForm onSubmit={handleSubmit(changeUserData)}>
        <span>Nome completo</span>

        {isEditing ? (
          <input
            type="text"
            {...register('name')}
            placeholder={authenticatedUser?.name}
            autoFocus
          />
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
