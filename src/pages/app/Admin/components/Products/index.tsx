import { Container, ContainerBody, ContainerHeader } from "./styles";
import { ProductForm, type productInfoData } from "./components/ProductForm";
import { ProductTypeForm } from "./components/ProductTypeForm";
import { useEffect, useState } from "react";
import type { ProductProps } from "../../../../../reducers/cart/reducer";
import { fetchProducts } from "../../../../../http/products";
import { ProductsTable } from "./components/ProductsTable";
import { useAdmin } from "../../../../../hooks/useAdmin";

export function Products() {
  const { addNewProduct, updateProduct, deleteProduct, allProducTypes } =
    useAdmin();
  const [productsData, setProductsData] = useState<ProductProps[]>([]);
  const [editingProduct, setEditingProduct] = useState<productInfoData | null>(
    null
  );

  useEffect(() => {
    loadProducts();
  }, []);

  async function loadProducts() {
    const response = await fetchProducts();
    setProductsData(response);
  }

  async function handleSaveProduct(data: productInfoData) {
    if (editingProduct) {
      const result = await updateProduct(data);
      if (result === "Produto atualizado com sucesso") {
        await loadProducts();
        setEditingProduct(null);
      } else {
        alert("Erro ao atualizar: " + result);
      }
    } else {
      const result = await addNewProduct(data);
      if (result === "Produto adicionado com sucesso") {
        await loadProducts();
      } else {
        alert("Erro ao adicionar: " + result);
      }
    }
  }

  async function handleDeleteProduct(id: string) {
    const confirmDelete = window.confirm(
      "Tem certeza que deseja excluir este produto?"
    );
    if (!confirmDelete) return;

    const result = await deleteProduct(id);
    if (result === "Produto deletado com sucesso") {
      await loadProducts();
      if (editingProduct?.type.id === id) {
        setEditingProduct(null);
      }
    } else {
      alert("Erro ao deletar: " + result);
    }
  }

  return (
    <Container>
      <ContainerHeader>
        <ProductForm
          editingProduct={editingProduct}
          saveProduct={handleSaveProduct}
          cancelEdit={() => setEditingProduct(null)}
        />
        <ProductTypeForm />
      </ContainerHeader>
      <ContainerBody>
        <ProductsTable
          products={productsData}
          onEdit={(product) => {
            const tag = product.tags[0];
            const matchedType = allProducTypes.find(
              (type) => type.name === tag
            );

            setEditingProduct({
              id: product.id,
              name: product.title,
              description: product.description,
              price: product.price,
              type: {
                id: matchedType?.id ?? "",
              },
              image: undefined,
            });
          }}
          onDelete={handleDeleteProduct}
        />
      </ContainerBody>
    </Container>
  );
}
