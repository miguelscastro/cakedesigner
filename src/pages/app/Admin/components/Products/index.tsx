import { z } from "zod";
import { Container, ContainerHeader, DataForm, InputWrapper } from "./styles";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { ErrorText } from "../../../Checkout/components/AddressInfo/styles";
import { useAdmin } from "../../../../../hooks/useAdmin";
import { useEffect, useState } from "react";

// Schemas de validação
const productInfoValidationSchema = z.object({
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  type: z.object({
    id: z.string().uuid("Tipo inválido"),
    name: z.string(),
  }),
  image: z
    .any()
    .optional()
    .refine(
      (file) => !file || (file instanceof File && file.size <= 5_000_000),
      "Arquivo deve ter no máximo 5MB"
    ),
});

const productTypeInfoValidationSchema = z.object({
  name: z.string().min(1, "Type name is required"),
});

// Tipos derivados dos schemas
export type productTypeInfoData = z.infer<
  typeof productTypeInfoValidationSchema
>;
export type productInfoData = z.infer<typeof productInfoValidationSchema>;

// Tipos de erro baseados nos schemas
type ProductFormErrors = z.inferFlattenedErrors<
  typeof productInfoValidationSchema
>["fieldErrors"];
type ProductTypeFormErrors = z.inferFlattenedErrors<
  typeof productTypeInfoValidationSchema
>["fieldErrors"];

export function Products() {
  const { allProducTypes, fetchAllProductTypes, addNewProductType } =
    useAdmin();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const productInfoForm = useForm<productInfoData>({
    resolver: zodResolver(productInfoValidationSchema),
  });

  const productTypeInfoForm = useForm<productTypeInfoData>({
    resolver: zodResolver(productTypeInfoValidationSchema),
  });

  const {
    register: registerProduct,
    formState: formStateProduct,
    handleSubmit: handleSubmitProduct,
    reset: resetProduct,
  } = productInfoForm;

  const {
    register: registerType,
    formState: formStateType,
    handleSubmit: handleSubmitType,
    reset: resetType,
    setError,
    clearErrors,
  } = productTypeInfoForm;

  const errorsProduct = formStateProduct.errors as ProductFormErrors;
  const errorsType = formStateType.errors as ProductTypeFormErrors;

  useEffect(() => {
    if (successMessage) {
      const timer = setTimeout(() => {
        setSuccessMessage(null);
        resetType();
        resetProduct();
      }, 3500);
      return () => clearTimeout(timer);
    }
  }, [successMessage]);

  useEffect(() => {
    fetchAllProductTypes();
  }, [successMessage]);

  async function handleAddNewProductType(data: productTypeInfoData) {
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
  }

  return (
    <Container>
      <ContainerHeader>
        <div>
          <h2>Insira as informações do novo produto</h2>
          <DataForm id="add_product">
            <InputWrapper>
              <span>Nome</span>
              <input type="text" {...registerProduct("name")} autoFocus />
              {errorsProduct.name?.[0] && (
                <ErrorText>{errorsProduct.name[0]}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <span>Descrição</span>
              <input type="text" {...registerProduct("description")} />
              {errorsProduct.description?.[0] && (
                <ErrorText>{errorsProduct.description[0]}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <span>Tipo do produto</span>
              <select defaultValue="" {...registerProduct("type")}>
                <option value="" disabled>
                  Selecione o tipo
                </option>
                {allProducTypes.map((type) => (
                  <option key={type.id} value={type.name}>
                    {type.name}
                  </option>
                ))}
              </select>
              {errorsProduct.type?.[0] && (
                <ErrorText>{errorsProduct.type[0]}</ErrorText>
              )}
            </InputWrapper>
            <InputWrapper>
              <span>Imagem</span>
              <input type="file" {...registerProduct("image")} />
              {errorsProduct.image?.[0] && (
                <ErrorText>{errorsProduct.image[0]}</ErrorText>
              )}
            </InputWrapper>
            <div className="submit-message">
              <button type="submit" form="add_product">
                Adicionar produto
              </button>
              {successMessage && <span>{successMessage}</span>}
            </div>
          </DataForm>
        </div>

        <div>
          <h2>Insira um novo tipo de produto</h2>
          <DataForm
            id="add_product_type"
            onSubmit={handleSubmitType(handleAddNewProductType)}
          >
            <InputWrapper>
              <span>Nome</span>
              <input type="text" {...registerType("name")} />
              {errorsType.name?.[0] && (
                <ErrorText>{errorsType.name[0]}</ErrorText>
              )}
            </InputWrapper>
            <div className="submit-message">
              <button type="submit" form="add_product_type">
                Adicionar tipo
              </button>
            </div>
          </DataForm>
        </div>
      </ContainerHeader>
    </Container>
  );
}
