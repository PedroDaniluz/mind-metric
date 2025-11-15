import { Ionicons } from '@expo/vector-icons'
import styled from 'styled-components/native'
import theme from '../../../styles/theme'

interface BackButtonProps {
  onPress: () => void
}

export function BackButton({ onPress }: BackButtonProps) {
  return (
    <StyledBackButton onPress={onPress}>
      <Ionicons
        name="chevron-back-outline"
        size={24}
        color={theme.colors.primary}
      />
    </StyledBackButton>
  )
}

const StyledBackButton = styled.Pressable<{ pressed?: boolean }>`
  width: 40px;
  justify-content: center;
  align-items: center;
  width: 40px;
  height: 40px;
  border-radius: 6px;
  border: 1px solid ${theme.colors.primary};
  opacity: ${({ pressed }) => (pressed ? 0.8 : 1)};
`
