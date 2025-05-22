import { z } from 'zod'
import { AuthForm, Container, InputWrapper, TextInput } from './styles'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { ErrorType } from '../Checkout/components/AddressInfo'
import { ErrorText } from '../Checkout/components/AddressInfo/styles'

const LoginInfoValidationSchema = z.object({
  email: z
    .string({ required_error: 'Informe o e-mail' })
    .email('Formato de e-mail inválido')
    .refine((email) => !/^((teste|admin|user)[0-9]*@.*)$/i.test(email), {
      message: 'Informe um e-mail válido e real',
    }),

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
export type LoginInfoData = z.infer<typeof LoginInfoValidationSchema>

export function Login() {
  const LoginInfoForm = useForm<LoginInfoData>({
    resolver: zodResolver(LoginInfoValidationSchema),
    defaultValues: {
      email: '',
      password: '',
    },
  })
  const { register, handleSubmit, formState } = LoginInfoForm

  const { errors } = formState as unknown as ErrorType

  function authLogin(data: LoginInfoData) {
    console.log(data)
  }

  return (
    <Container>
      <div>
        <h1>Digite seu email para iniciar a sessão</h1>
        <AuthForm
          onSubmit={handleSubmit(authLogin)}
          id="login"
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
          <button type="submit" form="login">
            Confirmar
          </button>
          <button>Criar conta</button>
        </AuthForm>
      </div>
    </Container>
  )
}
