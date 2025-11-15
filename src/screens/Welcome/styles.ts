import styled from 'styled-components/native'
import { PageContainer } from '../../components/PageContainter'

export const StyledPageContainer = styled(PageContainer)`
  justify-content: space-between;
  align-items: center;
`

export const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 148px;
  aspect-ratio: 1.9;
`
