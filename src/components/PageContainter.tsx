import { ViewStyle } from 'react-native'
import styled from 'styled-components/native'

interface PageContainerProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
}

export function PageContainer({ children, style }: PageContainerProps) {
  return <Container style={style}>{children}</Container>
}

const Container = styled.View`
  flex: 1;
  padding: 76px 40px;
  gap: 24px;
  overflow: hidden;
`
