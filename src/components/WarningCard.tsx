import styled from 'styled-components/native'
import { CardShadow } from './CardShadow'
import theme from '../styles/theme'
import { Ionicons } from '@expo/vector-icons'

export function WarningCard() {
  return (
    <StyledCardShadow>
      <Ionicons
        name="alert-circle-outline"
        size={48}
        color={theme.colors.secondary}
      />
      <Title>Não há registros</Title>
      <Subtitle>
        Registre atividades para acompanhar seu desenvolvimento pessoal.
      </Subtitle>
    </StyledCardShadow>
  )
}

const StyledCardShadow = styled(CardShadow)`
  padding: 16px;
  align-items: center;
  gap: 8px;
  display: flex;
`
const Title = styled.Text`
  font-size: 16px;
  font-family: ${theme.fonts.bold};
  color: ${theme.colors.secondary};
`
const Subtitle = styled.Text`
  font-size: 12px;
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.secondary};
  text-align: center;
`
