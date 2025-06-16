export interface ItemProps {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
}

export const fetchProducts = async (): Promise<ItemProps[]> => {
  try {
    const response = await fetch('http://localhost:8080/manage/product')
    // const response = await fetch('/products.json')
    const data = await response.json()
    return data
  } catch {
    console.error()
    return []
  }
}
