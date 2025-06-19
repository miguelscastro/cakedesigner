import type { ProductType } from "../@types/adminContext";
import type { Jwt } from "../@types/authContext";
import type {
  productInfoData,
  productTypeInfoData,
} from "../pages/app/Admin/components/Products";
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

export const createProduct = async (
  tokenData: Jwt,
  product: productInfoData
): Promise<Response> => {
  const formData = new FormData();
  formData.append("name", product.name);
  formData.append("description", product.description);
  formData.append("price", String(product.price));
  formData.append("productTypeId", product.type.id);

  if (product.image && product.image.length > 0) {
    formData.append("image", product.image[0]);
  }

  const response = await fetch("http://localhost:8080/manage/product", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${tokenData.token}`,
    },
    body: formData,
  });

  return response;
};
