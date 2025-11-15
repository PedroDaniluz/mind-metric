import styled from 'styled-components/native'
import theme from '../styles/theme'
import { ViewStyle } from 'react-native'

export default function CardShadow({
  children,
  style,
}: {
  children: React.ReactNode
  style?: ViewStyle | ViewStyle[]
}) {
  return <Container style={style}>{children}</Container>
}

const Container = styled.View`
  background-color: ${theme.colors.background};
  border-radius: 8px;
  shadow-color: ${theme.shadows.default.shadowColor};
  shadow-offset: ${theme.shadows.default.shadowOffset.width}px
    ${theme.shadows.default.shadowOffset.height}px;
  shadow-radius: ${theme.shadows.default.shadowRadius}px;
  elevation: ${theme.shadows.default.elevation};
`
