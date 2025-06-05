import { ChangePersonalInfo, Container } from './styles'
import { Breadcrumb } from '../../../Breadcrumb'

export function PersonalInfo() {
  return (
    <>
      <Breadcrumb />
      <Container>
        <h2>Gerencie suas informações</h2>
        <ChangePersonalInfo />
      </Container>
    </>
  )
}
