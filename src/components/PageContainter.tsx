import { ScrollView, ViewStyle } from 'react-native'
import styled from 'styled-components/native'

interface PageContainerProps {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
}

export function PageContainer({ children, style }: PageContainerProps) {
  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <Container style={style}>{children}</Container>
    </ScrollView>
  )
}

const Container = styled.View`
  min-height: 100%;
  padding: 76px 40px;
  gap: 24px;
  overflow: hidden;
`
