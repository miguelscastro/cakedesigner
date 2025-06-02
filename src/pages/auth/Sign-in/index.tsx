import { z } from 'zod'
import { AuthForm, Container, InputWrapper, TextInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { MouseEvent, useEffect } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { useAuth } from '../../../hooks/useAuth'
import { ErrorType } from '../../app/Checkout/components/AddressInfo'
import { ErrorText } from '../../app/Checkout/components/AddressInfo/styles'

const allowedDomains = ['gmail.com', 'outlook.com', 'hotmail.com', 'yahoo.com']
const SignInInfoValidationSchema = z.object({
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

  password: z
    .string({ required_error: 'Informe a senha' })
    .min(8, 'A senha deve ter no mínimo 8 caracteres')
    .regex(/[A-Z]/, 'A senha deve conter pelo menos uma letra maiúscula')
    .regex(/[a-z]/, 'A senha deve conter pelo menos uma letra minúscula')
    .regex(/[0-9]/, 'A senha deve conter pelo menos um número')
    .regex(
      /[^A-Za-z0-9]/,
      'A senha deve conter pelo menos um caractere especial',
    ),
})
export type SignInInfoData = z.infer<typeof SignInInfoValidationSchema>

export function Sign_in() {
  const { authLogin } = useAuth()
  const navigate = useNavigate()
  const { state } = useLocation()

  const LoginInfoForm = useForm<SignInInfoData>({
    resolver: zodResolver(SignInInfoValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { register, handleSubmit, formState, reset } = LoginInfoForm

  const { errors } = formState as unknown as ErrorType

  useEffect(() => {
    if (state?.email) {
      console.log(state.email)

      reset({
        email: state.email,
      })
    }
  }, [state, reset])

  function handleAuthLogin(data: SignInInfoData) {
    authLogin(data)
  }

  function handleCreateAccount(event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    navigate('/auth/sign-up')
  }

  return (
    <Container>
      <div>
        <h1>Digite seu email e senha para iniciar a sessão</h1>
        <AuthForm
          onSubmit={handleSubmit(handleAuthLogin)}
          id="sign_in"
          autoComplete="off"
          autoSave="off"
        >
          <InputWrapper>
            E-mail
            <TextInput
              {...register('email')}
              type="email"
              autoComplete="email"
            />
            {errors.email?.message && (
              <ErrorText>{errors.email.message}</ErrorText>
            )}
          </InputWrapper>
          <InputWrapper>
            Senha
            <TextInput
              {...register('password')}
              type="password"
              autoComplete="current-password"
            />
            {errors.password?.message && (
              <ErrorText>{errors.password.message}</ErrorText>
            )}
          </InputWrapper>
          <button type="submit" form="sign_in">
            Confirmar
          </button>
          <button type="button" onClick={handleCreateAccount}>
            Criar conta
          </button>
        </AuthForm>
      </div>
    </Container>
  )
}
