import {
  CoffeeIcon,
  PackageIcon,
  ShoppingCartIcon,
  TimerIcon,
} from '@phosphor-icons/react'
import { useTheme } from 'styled-components'

import {
  Banner,
  Heading,
  Info,
  BannerContent,
  ProductList,
  Products,
} from './styles'
import coffeDeliveryBanner from '../../../assets/images/banner/cakedesigner-banner.png'
import backgroundEffect from '../../../assets/images/banner/background-effect.png'
import { Card } from './components/Card'
import { ChangeEvent, useEffect, useState } from 'react'
import { FilterProducts } from './components/FilterProducts'
import { fetchProducts, ItemProps } from '../../../http/products'

export function Home() {
  const [productsData, setProductsData] = useState<ItemProps[]>([])
  const [displayedProductsData, setDisplayedProductsData] = useState<
    ItemProps[]
  >([])
  const [visibleCount, setVisibleCount] = useState(10)

  useEffect(() => {
    const loadProducts = async () => {
      const data = await fetchProducts()
      setProductsData(data)
    }

    loadProducts()
  }, [])

  useEffect(() => {
    if (productsData.length > 0) {
      displaySelectedProducts('/')
    }
  }, [productsData])

  useEffect(() => {
    const handleScroll = () => {
      const bottom =
        window.innerHeight + window.scrollY >= document.body.offsetHeight - 100

      if (bottom) {
        setVisibleCount((prev) => prev + 10) // carrega mais 10
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const theme = useTheme()

  function displaySelectedProducts(
    input: ChangeEvent<HTMLSelectElement> | string,
  ) {
    const selectedTypeOfProduct =
      typeof input === 'string' ? input : input.target.value

    const typesOfProduct: { [key: string]: string } = {
      '/bolos': 'BOLO',
      '/bolos-de-pote': 'BOLO DE POTE',
      '/doces': 'DOCE',
      '/cupcakes': 'CUPCAKE',
    }

    const selectedType = typesOfProduct[selectedTypeOfProduct]

    const filteredProducts =
      selectedType != undefined
        ? productsData.filter((product) => product.tags.includes(selectedType))
        : productsData

    setDisplayedProductsData(filteredProducts)
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
                <ShoppingCartIcon
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow-dark'] }}
                />
                Compra simples e segura
              </li>
              <li>
                <PackageIcon
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['base-text'] }}
                />
                Produtos bem protegidos até a entrega.
              </li>
              <li>
                <TimerIcon
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['yellow'] }}
                />
                Agendamento com, no mínimo, 3 dias de antecedência.
              </li>
              <li>
                <CoffeeIcon
                  weight="fill"
                  size={32}
                  color={theme.colors.background}
                  style={{ backgroundColor: theme.colors['purple'] }}
                />
                Ingredientes frescos e de qualidade
              </li>
            </Info>
          </div>
          <img src={coffeDeliveryBanner} alt="" />
        </BannerContent>
        <img src={backgroundEffect} id="banner-bg" alt="" />
      </Banner>
      <ProductList>
        <div id="SelectTypeContainer">
          <h2>Nossos produtos</h2>
          <FilterProducts displaySelectedProducts={displaySelectedProducts} />
        </div>
        <Products>
          {displayedProductsData.slice(0, visibleCount).map((product) => {
            return <Card key={product.id} product={product} />
          })}
        </Products>
      </ProductList>
    </>
  )
}
