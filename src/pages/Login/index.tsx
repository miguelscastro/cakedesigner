import { AuthForm, Container, InputWrapper, TextInput } from './styles'

export function Login() {
  return (
    <Container>
      <div>
        <h1>Digite seu email para iniciar a sessão</h1>
        <AuthForm>
          <InputWrapper>
            E-mail
            <TextInput type="email" />
          </InputWrapper>
          <InputWrapper>
            Senha
            <TextInput type="password" />
          </InputWrapper>
          <button type="submit">Confirmar</button>
          <button>Criar conta</button>
        </AuthForm>
      </div>
    </Container>
  )
}
