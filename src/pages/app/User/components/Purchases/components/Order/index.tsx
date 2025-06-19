import { useNavigate } from "react-router-dom";
import { Container, ItemContainer, ProductLink } from "./styles";
import type { CartItem } from "../../../../../../../reducers/cart/reducer";
import { formatMoney } from "../../../../../../../utils/formatMoney";

interface OrderProps {
  order: CartItem[];
}

export function Order({ order }: OrderProps) {
  const navigate = useNavigate();

  function handleSeeMore(item: CartItem) {
    navigate(`/product/${item.id}`, {
      state: item,
    });
  }

  return (
    <Container>
      <h2></h2>
      {order.map((item) => (
        <ItemContainer key={item.id}>
          <div>
            <img src={item.image} alt="" />
            <div>
              <ProductLink>
                <h3>{item.title}</h3>{" "}
                <button onClick={() => handleSeeMore(item)}>Ver produto</button>
              </ProductLink>
              <p>{item.description}</p>
            </div>
          </div>
          <div className="total">
            <span>R$ {formatMoney(item.price)}</span>
            <span>quantidade: {item.quantity}</span>
          </div>
        </ItemContainer>
      ))}
    </Container>
  );
}
