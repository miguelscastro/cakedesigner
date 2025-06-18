import { Container, ManageProducts } from "./styles";

export function Products() {
  return (
    <Container>
      <ManageProducts>
        <input type="file" />
        <button>Enviar</button>
      </ManageProducts>
    </Container>
  );
}
