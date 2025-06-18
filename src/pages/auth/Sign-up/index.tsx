import { z } from "zod";
import { AuthForm, Container, InputWrapper, TextInput } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Link } from "react-router-dom";
import { useAuth } from "../../../hooks/useAuth";
import { ErrorText } from "../../app/Checkout/components/AddressInfo/styles";
import { ErrorType } from "../../../@types/error";

const allowedDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com.br",
  "yahoo.com",
  "icloud.com",
  "live.com",
];

const SignUpInfoValidationSchema = z.object({
  name: z
    .string({ required_error: "Informe o nome" })
    .min(2, "O nome deve ter pelo menos 2 caracteres")
    .max(100, "O nome deve ter no máximo 100 caracteres"),

  email: z
    .string({ required_error: "Informe o e-mail" })
    .email("Formato de e-mail inválido")
    .refine(
      (email) => {
        const domain = email.split("@")[1]?.toLowerCase();
        return allowedDomains.includes(domain);
      },
      {
        message: "Insira um e-mail válido",
      }
    ),

  password: z
    .string({ required_error: "Informe a senha" })
    .min(8, "A senha deve ter no mínimo 8 caracteres")
    .max(100, "A senha deve ter no máximo 100 caracteres")
    .regex(/[A-Z]/, "A senha deve conter pelo menos uma letra maiúscula")
    .regex(/[a-z]/, "A senha deve conter pelo menos uma letra minúscula")
    .regex(/[0-9]/, "A senha deve conter pelo menos um número")
    .regex(
      /[^A-Za-z0-9]/,
      "A senha deve conter pelo menos um caractere especial"
    ),
});
export type SignUpInfoData = z.infer<typeof SignUpInfoValidationSchema>;

export function Sign_up() {
  const { createAccount } = useAuth();
  const LoginInfoForm = useForm<SignUpInfoData>({
    resolver: zodResolver(SignUpInfoValidationSchema),
    defaultValues: {
      name: "",
      email: "",
      password: "",
    },
  });
  const { register, handleSubmit, formState, setError } = LoginInfoForm;

  const { errors } = formState as unknown as ErrorType;

  async function handleCreateAccount(data: SignUpInfoData) {
    const result = await createAccount(data);

    if (typeof result == "string") {
      setError("name", {
        type: "manual",
        message: result,
      });
      setError("email", {
        type: "manual",
        message: result,
      });
      setError("password", {
        type: "manual",
        message: result,
      });
    }
  }

  return (
    <>
      <Container>
        <div>
          <AuthForm
            onSubmit={handleSubmit(handleCreateAccount)}
            id="sign_up_user"
            autoComplete="off"
            autoSave="off"
          >
            <InputWrapper>
              Nome
              <TextInput
                {...register("name")}
                type="name"
                autoComplete="name"
              />
              {errors.name?.message && (
                <ErrorText>{errors.name.message}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              E-mail
              <TextInput
                {...register("email")}
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
                {...register("password")}
                type="password"
                autoComplete="current-password"
              />
              {errors.password?.message && (
                <ErrorText>{errors.password.message}</ErrorText>
              )}
            </InputWrapper>
            <button type="submit" form="sign_up_user">
              Criar conta
            </button>
            <Link to={"/auth/sign-in"}>Já tem uma conta? faça o login!</Link>
          </AuthForm>
        </div>
      </Container>
    </>
  );
}
