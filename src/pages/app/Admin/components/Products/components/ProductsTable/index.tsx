import type { ProductProps } from "../../../../../../../reducers/cart/reducer";
import { TableOfProducts } from "./styles";

interface ProductsTableProps {
  products: ProductProps[];
  onEdit: (product: ProductProps) => void;
  onDelete: (id: string) => void;
}

export function ProductsTable({
  products,
  onEdit,
  onDelete,
}: ProductsTableProps) {
  return (
    <TableOfProducts>
      <thead>
        <tr>
          <th>Imagem</th>
          <th>Nome</th>
          <th>Descrição</th>
          <th>Preço</th>
          <th>Tipo</th>
          <th>Ações</th>
        </tr>
      </thead>
      <tbody>
        {products.map((product) => (
          <tr key={product.id} style={{ borderBottom: "1px solid #ccc" }}>
            <td>
              <img
                src={product.image}
                alt={product.title}
                style={{ width: "80px", height: "80px", objectFit: "cover" }}
              />
            </td>
            <td>{product.title}</td>
            <td>{product.description}</td>
            <td>R$ {product.price.toFixed(2)}</td>
            <td>{product.tags.join(", ")}</td>
            <td>
              <button onClick={() => onEdit(product)}>Atualizar</button>
              <button onClick={() => onDelete(product.id)}>Excluir</button>
            </td>
          </tr>
        ))}
      </tbody>
    </TableOfProducts>
  );
}
