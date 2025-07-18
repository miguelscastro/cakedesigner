import type { AllOrdersResponse } from "../@types/adminContext";
import { Jwt } from "../@types/authContext";
import {} from "../@types/cartContext";
import type {
  newOrderType,
  OrderResponse,
  OrdersResponse,
} from "../@types/userContext";

export const newOrder = async (
  tokenData: Jwt,
  order: newOrderType
): Promise<OrderResponse> => {
  const response = await fetch(
    "https://cakedesigner.onrender.com/orders/user",
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(order),
    }
  );
  const data = await response.json();
  return data;
};

export const getUserOrders = async (
  tokenData: Jwt
): Promise<OrdersResponse> => {
  const response = await fetch(
    "https://cakedesigner.onrender.com/orders/user",
    {
      method: "GET",
      headers: {
        Authorization: `Bearer ${tokenData.token}`,
      },
    }
  );
  const data = response.json();
  return data;
};

export const getAllOrders = async (
  tokenData: Jwt
): Promise<AllOrdersResponse> => {
  const response = await fetch("https://cakedesigner.onrender.com/orders", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });
  const data = response.json();
  return data;
};
