import { useEffect, useState } from "react";
import { Container, DataForm, InputWrapper } from "./styles";
import { useForm, useFormState } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorText } from "../../../../../../pages/app/Checkout/components/AddressInfo/styles";
import { useUser } from "../../../../../../hooks/useUser";
import { useNavigate } from "react-router-dom";

const deleteUserValidationSchema = z.object({
  confirmation: z.literal("confirmo a exclusão da minha conta", {
    errorMap: () => ({
      message:
        "Você deve digitar exatamente: confirmo a exclusão da minha conta",
    }),
  }),
  password: z
    .string()
    .nonempty({ message: "A senha é obrigatória" })
    .min(8, { message: "A senha deve ter no mínimo 8 caracteres" })
    .max(100, { message: "A senha deve ter no máximo 100 caracteres" })
    .regex(/[A-Z]/, {
      message: "A senha deve conter pelo menos uma letra maiúscula",
    })
    .regex(/[a-z]/, {
      message: "A senha deve conter pelo menos uma letra minúscula",
    })
    .regex(/\d/, {
      message: "A senha deve conter pelo menos um número",
    })
    .regex(/[^A-Za-z0-9]/, {
      message: "A senha deve conter pelo menos um caractere especial",
    }),
});

export type deleteUserInfoData = z.infer<typeof deleteUserValidationSchema>;

export function DeleteAccount() {
  const { deleteUser } = useUser();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        reset();
        navigate("/");
      }, 3500);

      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  const ChangeUserSecurityInfoForm = useForm<deleteUserInfoData>({
    resolver: zodResolver(deleteUserValidationSchema),
  });

  const { handleSubmit, register, reset, control, setError, clearErrors } =
    ChangeUserSecurityInfoForm;
  const { errors } = useFormState({ control });

  async function handleDeleteUserRequest(data: deleteUserInfoData) {
    const result = await deleteUser(data);

    if (typeof result == "string") {
      setError("confirmation", {
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
    setSuccessMessage(
      "Conta excluida com sucesso, você será redirecionado(a)."
    );
    clearErrors();
  }

  return (
    <Container>
      <h2>É bom ter você por aqui, têm certeza que quer prosseguir?</h2>
      <DataForm
        id="delete_user"
        onSubmit={handleSubmit(handleDeleteUserRequest)}
      >
        <InputWrapper>
          <span>Confirme a exclusão</span>
          <input
            type="text"
            {...register("confirmation")}
            placeholder="confirmo a exclusão da minha conta"
            autoFocus
          />
          {errors.confirmation?.message && (
            <ErrorText>{errors.confirmation.message}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <span>Insira a senha</span>

          <input type="text" {...register("password")} />
          {errors.password?.message && (
            <ErrorText>{errors.password.message}</ErrorText>
          )}
        </InputWrapper>
        <div className="submit-message">
          <button type="submit" form="delete_user">
            Confirmar exclusão
          </button>
          {successMessage && <span>{successMessage}</span>}
        </div>
      </DataForm>
    </Container>
  );
}
