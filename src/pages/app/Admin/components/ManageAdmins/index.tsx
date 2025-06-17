import { useEffect, useState } from "react";
import { useAuth } from "../../../../../hooks/useAuth";
import { Container, DataForm, InputWrapper } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { ErrorText } from "../../../Checkout/components/AddressInfo/styles";
import type { ErrorType } from "../../../../../@types/error";

const allowedDomains = [
  "gmail.com",
  "hotmail.com",
  "outlook.com",
  "yahoo.com.br",
  "yahoo.com",
  "icloud.com",
  "live.com",
];

const addNewAdminInfoValidationSchema = z.object({
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

export type newAdminInfoData = z.infer<typeof addNewAdminInfoValidationSchema>;

export function ManageAdmins() {
  const { createAccount } = useAuth();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        reset();
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const addNewAdminInfoForm = useForm<newAdminInfoData>({
    resolver: zodResolver(addNewAdminInfoValidationSchema),
    defaultValues: {
      email: "",
    },
  });

  const { handleSubmit, register, reset, setError, clearErrors, formState } =
    addNewAdminInfoForm;

  const { errors } = formState as unknown as ErrorType;

  async function handleAddNewAdmin(data: newAdminInfoData) {
    const newAdminData = {
      ...data,
      role: "ADMIN",
    };

    const result = await createAccount(newAdminData);

    if (result !== true) {
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
      setSuccessMessage(null);
      return;
    }

    setSuccessMessage("Novo administrador criado com sucesso!");
    clearErrors();
  }
  return (
    <Container>
      <h2>Insira as informações do novo administrador</h2>
      <DataForm id="sign_up_admin" onSubmit={handleSubmit(handleAddNewAdmin)}>
        <InputWrapper>
          <span>Nome</span>
          <input
            type="text"
            {...register("name")}
            placeholder="Admin"
            autoFocus
          />
          {errors.name?.message && <ErrorText>{errors.name.message}</ErrorText>}
        </InputWrapper>
        <InputWrapper>
          <span>E-mail</span>

          <input
            type="text"
            {...register("email")}
            placeholder="admin@gmail.com"
          />
          {errors.email?.message && (
            <ErrorText>{errors.email.message}</ErrorText>
          )}
        </InputWrapper>
        <InputWrapper>
          <span>Senha provisória</span>

          <input
            type="text"
            {...register("password")}
            placeholder="Teste@123A"
          />
          {errors.password?.message && (
            <ErrorText>{errors.password.message}</ErrorText>
          )}
        </InputWrapper>
        <div className="submit-message">
          <button type="submit" form="sign_up_admin">
            Criar conta
          </button>
          {successMessage && <span>{successMessage}</span>}
        </div>
      </DataForm>
    </Container>
  );
}
