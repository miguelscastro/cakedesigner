import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { useAdmin } from "../../../../../../../hooks/useAdmin";
import { Container, InputWrapper, ProductDataForm } from "./styles";
import { ErrorText } from "../../../../../Checkout/components/AddressInfo/styles";

const productInfoValidationSchema = z.object({
  id: z.string().uuid().optional(),
  name: z.string().min(1, "Nome do produto é obrigatório"),
  description: z.string().min(1, "Descrição é obrigatória"),
  price: z.number().positive("Preço tem que ser maior que 0"),
  type: z.object({
    id: z.string().uuid("Tipo inválido"),
    name: z.string().optional(),
  }),
  image: z
    .any()
    .optional()
    .refine(
      (file) =>
        !file ||
        (file instanceof FileList &&
          file.length === 1 &&
          file[0].size <= 5_000_000),
      "Arquivo deve ter no máximo 5MB"
    ),
});

export type productInfoData = z.infer<typeof productInfoValidationSchema>;

type ProductFormErrors = z.inferFlattenedErrors<
  typeof productInfoValidationSchema
>["fieldErrors"];

interface ProductFormProps {
  editingProduct: productInfoData | null;
  saveProduct: (data: productInfoData) => Promise<void>;
  cancelEdit?: () => void;
}

export function ProductForm({
  editingProduct,
  saveProduct,
  cancelEdit,
}: ProductFormProps) {
  const { allProducTypes, fetchAllProductTypes } = useAdmin();
  const [successMessage, setSuccessMessage] = useState<string | null>(null);

  const productInfoForm = useForm<productInfoData>({
    resolver: zodResolver(productInfoValidationSchema),
  });

  const { register, formState, handleSubmit, reset, clearErrors } =
    productInfoForm;

  const errorsProduct = formState.errors as ProductFormErrors;

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

  useEffect(() => {
    if (editingProduct) {
      reset(editingProduct);
    } else {
      reset();
    }
  }, [editingProduct, reset]);

  async function handleSaveProduct(data: productInfoData) {
    await saveProduct(data);
    reset();
    setSuccessMessage(
      editingProduct
        ? "Produto atualizado com sucesso!"
        : "Novo produto criado com sucesso!"
    );
    clearErrors();
  }

  return (
    <Container>
      <h2>{editingProduct ? "Editar produto" : "Novo produto"}</h2>
      <ProductDataForm
        id="add_product"
        onSubmit={handleSubmit(handleSaveProduct)}
      >
        <InputWrapper>
          <span>Nome</span>
          <input type="text" {...register("name")} autoFocus />
          {errorsProduct.name?.[0] && (
            <ErrorText>{errorsProduct.name[0]}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <span>Descrição</span>
          <input type="text" {...register("description")} />
          {errorsProduct.description?.[0] && (
            <ErrorText>{errorsProduct.description[0]}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <span>Preço</span>
          <input
            type="number"
            step="0.01"
            {...register("price", { valueAsNumber: true })}
          />
          {errorsProduct.price?.[0] && (
            <ErrorText>{errorsProduct.price[0]}</ErrorText>
          )}
        </InputWrapper>

        <InputWrapper>
          <span>Tipo do produto</span>
          <select defaultValue="" {...register("type.id")}>
            <option value="" disabled>
              Selecione o tipo
            </option>
            {allProducTypes.map((type) => (
              <option key={type.id} value={type.id}>
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
          <input type="file" {...register("image")} accept="image/*" />
          {errorsProduct.image?.[0] && (
            <ErrorText>{errorsProduct.image[0]}</ErrorText>
          )}
        </InputWrapper>

        <div className="submit-message">
          <button type="submit" form="add_product">
            {editingProduct ? "Atualizar produto" : "Adicionar produto"}
          </button>
          {editingProduct && cancelEdit && (
            <button
              type="button"
              onClick={() => {
                cancelEdit();
                reset();
              }}
            >
              Cancelar
            </button>
          )}
          {successMessage && <span>{successMessage}</span>}
        </div>
      </ProductDataForm>
    </Container>
  );
}
