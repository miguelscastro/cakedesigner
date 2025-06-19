import { Container, ContainerHeader } from "./styles";

import { ProductForm } from "./components/ProductForm";
import { ProductTypeForm } from "./components/ProductTypeForm";

export function Products() {
  return (
    <Container>
      <ContainerHeader>
        <ProductForm />
        <ProductTypeForm />
      </ContainerHeader>
    </Container>
  );
}
