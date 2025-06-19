import { z } from "zod";
import { Container, InputWrapper, ProductTypeDataForm } from "./styles";
import { ErrorText } from "../../../../../Checkout/components/AddressInfo/styles";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useAdmin } from "../../../../../../../hooks/useAdmin";

const productTypeInfoValidationSchema = z.object({
  name: z.string().min(1, "Type name is required"),
});

export type productTypeInfoData = z.infer<
  typeof productTypeInfoValidationSchema
>;

type ProductTypeFormErrors = z.inferFlattenedErrors<
  typeof productTypeInfoValidationSchema
>["fieldErrors"];

export function ProductTypeForm() {
  const { fetchAllProductTypes, addNewProductType } = useAdmin();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const productTypeInfoForm = useForm<productTypeInfoData>({
    resolver: zodResolver(productTypeInfoValidationSchema),
  });

  const { register, formState, handleSubmit, reset, setError, clearErrors } =
    productTypeInfoForm;

  const errors = formState.errors as ProductTypeFormErrors;

  useEffect(() => {
    fetchAllProductTypes();
  }, []);

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        reset();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  async function handleAddNewProductType(data: productTypeInfoData) {
    console.log(data);

    const result = await addNewProductType(data);

    if (result !== "Tipo adicionado com sucesso") {
      setError("name", {
        type: "manual",
        message: result ?? "Erro desconhecido",
      });
      setSuccessMessage(null);
      return;
    }

    setSuccessMessage("Novo tipo de produto criado com sucesso!");
    clearErrors();
    await fetchAllProductTypes();
  }

  return (
    <Container>
      <h2>Insira um novo tipo de produto</h2>
      <ProductTypeDataForm
        id="add_product_type"
        onSubmit={handleSubmit(handleAddNewProductType)}
      >
        <InputWrapper>
          <span>Nome</span>
          <input type="text" {...register("name")} />
          {errors.name?.[0] && <ErrorText>{errors.name[0]}</ErrorText>}
        </InputWrapper>

        <div className="submit-message">
          <button type="submit" form="add_product_type">
            Adicionar tipo
          </button>
        </div>
      </ProductTypeDataForm>
    </Container>
  );
}
