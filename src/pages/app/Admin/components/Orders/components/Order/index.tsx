import { useNavigate } from "react-router-dom";
import { CartItem } from "../../../../../../../reducers/cart/reducer";
import { formatMoney } from "../../../../../../../utils/formatMoney";
import { Container, ItemContainer, ProductLink } from "./styles";
import type { OrderType } from "../../../../../../../@types/adminContext";

interface OrderProps {
  order: OrderType;
  products: CartItem[];
}

export function Order({ order, products }: OrderProps) {
  const navigate = useNavigate();

  function handleSeeMore(item: CartItem) {
    navigate(`/product/${item.id}`, {
      state: item,
    });
  }

  return (
    <Container>
      <div>
        <h2>
          {order.address.street}, {order.address.number},{" "}
          {order.address.neighborhood}
        </h2>
        {order.products.map((item) => {
          const productDetails = products.find(
            (product) => product.id === item.productId
          );

          if (!productDetails) return null;

          return (
            <ItemContainer key={item.productId}>
              <div>
                <img src={productDetails.image} alt="" />
                <div>
                  <ProductLink>
                    <h3>{productDetails.title}</h3>
                    <button onClick={() => handleSeeMore(productDetails)}>
                      Ver produto
                    </button>
                  </ProductLink>
                  <p>{productDetails.description}</p>
                </div>
              </div>
              <div className="total">
                <span>R$ {formatMoney(item.price)}</span>
                <span>quantidade: {item.quantity}</span>
              </div>
            </ItemContainer>
          );
        })}
      </div>
    </Container>
  );
}
