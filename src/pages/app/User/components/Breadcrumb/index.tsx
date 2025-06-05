import { Link, useLocation } from 'react-router-dom'
import { Container } from './styles'

export function Breadcrumb() {
  const location = useLocation()
  const paths = location.pathname.split('/').filter(Boolean)

  const visiblePaths = paths.filter((segment) => segment !== 'user')

  return (
    <Container>
      {visiblePaths.map((segment, index) => {
        const actualIndex = paths.indexOf(segment)
        const path = '/' + paths.slice(0, actualIndex + 1).join('/')
        const label = breadcrumbLabels[segment] || segment
        const isLast = index === visiblePaths.length - 1

        return (
          <span key={path}>
            {!isLast ? (
              <>
                <Link to={path}>{label}</Link> /{' '}
              </>
            ) : (
              <strong>{label}</strong>
            )}
          </span>
        )
      })}
    </Container>
  )
}

const breadcrumbLabels: Record<string, string> = {
  user: 'Minha conta',
  profile: 'Meu perfil',
  personal: 'Dados pessoais',
  account: 'Dados da conta',
  security: 'Segurança',
  purchases: 'Compras',
}
