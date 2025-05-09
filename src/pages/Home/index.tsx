import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import {
  Banner,
  Heading,
  Info,
  BannerContent,
  ProductList,
  Products,
  SelectTypeOfProduct,
} from './styles'
import coffeDeliveryBanner from '../../assets/images/banner/cakedesigner-banner.png'
import backgroundEffect from '../../assets/images/banner/background-effect.png'
import { Card } from './components/Card'
import { ChangeEvent, useEffect, useState } from 'react'

export interface ItemProps {
  id: string
  title: string
  description: string
  tags: string[]
  price: number
  image: string
}

export function Home() {
  const [productsData, setProductsData] = useState<ItemProps[]>([])
  const [displayedProductsData, setDisplayedProductsData] = useState<
    ItemProps[]
  >([])
  useEffect(() => {
    const fetchCoffees = async () => {
      const response = await fetch('/products.json')
      const data = await response.json()
      console.log(data)

      setProductsData(data.products)
    }
    fetchCoffees()
  }, [])

  const theme = useTheme()

  function handleChangeDisplayedProducts(
    event: ChangeEvent<HTMLSelectElement>,
  ) {
    const selectedTypeOfProduct = event.target.value
    let productsToDisplay: ItemProps[] = []

    switch (selectedTypeOfProduct) {
      case '/bolos':
        productsData.map((product) => {
          if (product.tags.find((tag) => tag == 'BOLO')) {
            productsToDisplay.push(product)
          }
          setDisplayedProductsData(productsToDisplay)
        })
        break
      case '/bolos-de-pote':
        productsData.map((product) => {
          if (product.tags.find((tag) => tag == 'BOLO DE POTE')) {
            productsToDisplay.push(product)
          }
          setDisplayedProductsData(productsToDisplay)
        })
        break
      case '/doces':
        productsData.map((product) => {
          if (product.tags.find((tag) => tag == 'DOCE')) {
            productsToDisplay.push(product)
          }
          setDisplayedProductsData(productsToDisplay)
        })
        break
      case '/cupcakes':
        productsData.map((product) => {
          if (product.tags.find((tag) => tag == 'CUPCAKE')) {
            productsToDisplay.push(product)
          }
          setDisplayedProductsData(productsToDisplay)
        })
        break
      default:
        productsToDisplay = productsData
        break
    }
  }

  return (
    <>
      <Banner>
        <BannerContent>
          <div>
            <Heading>
              <h1>Bolos e doces personalizados</h1>
              <p>
                Com a gente a experiência sempre é única porque você é parte
                dela!
              </p>
            </Heading>
            <Info>
              <li>
                <ShoppingCart
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                Compra simples e segura
              </li>
              <li>
                <Package
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                Produtos bem protegidos até a entrega.
              </li>
              <li>
                <Timer
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow'] }}
                />
                Agendamento com, no mínimo, 3 dias de antecedência.
              </li>
              <li>
                <Coffee
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['purple'] }}
                />
                Ingredientes frescos e de alta qualidade
              </li>
            </Info>
          </div>
          <img src={coffeDeliveryBanner} alt="" />
        </BannerContent>
        {/* <img src={backgroundEffect} id="banner-bg" alt="" /> */}
      </Banner>
      <ProductList>
        <div id="SelectTypeContainer">
          <h2>Nossos produtos</h2>
          <SelectTypeOfProduct
            id="dropdown"
            onChange={handleChangeDisplayedProducts}
            defaultValue={'/'}
          >
            <option value="/">Escolha uma categoria</option>
            <option value="/bolos">Bolos</option>
            <option value="/bolos-de-pote">Bolos de pote</option>
            <option value="/doces">Doces</option>
            <option value="/cupcakes">Cupcakes</option>
          </SelectTypeOfProduct>
        </div>
        <Products>
          {displayedProductsData.map((product) => {
            return <Card key={product.id} product={product} />
          })}
        </Products>
      </ProductList>
    </>
  )
}
