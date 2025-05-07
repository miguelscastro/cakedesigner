import { Coffee, Package, ShoppingCart, Timer } from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import {
  Banner,
  Heading,
  Info,
  BannerContent,
  ProductList,
  Products,
} from './styles'
import coffeDeliveryBanner from '../../assets/images/banner/cakedesigner-banner.png'
import backgroundEffect from '../../assets/images/banner/background-effect.png'
import { Card } from './components/Card'
import { useEffect, useState } from 'react'

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
  useEffect(() => {
    const fetchCoffees = async () => {
      const response = await fetch('/coffees.json')
      const data = await response.json()
      setProductsData(data.coffees)
    }
    fetchCoffees()
  }, [])

  const theme = useTheme()
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
        <img src={backgroundEffect} id="banner-bg" alt="" />
      </Banner>
      <ProductList>
        <h2>Nossos produtos</h2>
        <Products>
          {productsData.map((coffee) => {
            return <Card key={coffee.id} product={coffee} />
          })}
        </Products>
      </ProductList>
    </>
  )
}
