import type { ProductType } from "../@types/adminContext";
import type { Jwt } from "../@types/authContext";
import type { productTypeInfoData } from "../pages/app/Admin/components/Products";
import { CartItem } from "../reducers/cart/reducer";

export const fetchProducts = async (): Promise<CartItem[]> => {
  const response = await fetch("http://localhost:8080/manage/product");
  // const response = await fetch('/products.json')
  const data = response.json();
  return data;
};

export const getAllProductTypes = async (
  tokenData: Jwt
): Promise<ProductType[]> => {
  const response = await fetch("http://localhost:8080/manage/product-types", {
    method: "GET",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
  });
  const data = response.json();
  return data;
};

export const createProductType = async (
  tokenData: Jwt,
  productType: productTypeInfoData
): Promise<Response> => {
  console.log(productType);

  const response = await fetch("http://localhost:8080/manage/product-types", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(productType),
  });
  return response;
};
