import { Pressable, ViewStyle } from 'react-native'
import styled from 'styled-components/native'
import theme from '../styles/theme'
import { css } from 'styled-components'

type Variant = 'default' | 'bordered'

interface ButtonProps {
  text: string
  onClick: () => void
  disabled?: boolean
  variant?: Variant
  icon?: React.ReactNode
  style?: ViewStyle | ViewStyle[]
}

export function Button({
  text,
  onClick,
  disabled = false,
  variant = 'default',
  icon,
  style,
}: ButtonProps) {
  return (
    <Pressable
      style={{ ...style, width: '100%' }}
      onPress={onClick}
      disabled={disabled}
    >
      {({ pressed }) => (
        <StyledButton $pressed={pressed} $variant={variant}>
          {icon && icon}
          <ButtonText $variant={variant}>{text}</ButtonText>
        </StyledButton>
      )}
    </Pressable>
  )
}

const buttonVariantStyles = {
  default: css`
    background-color: ${theme.colors.primary};
    padding: 16px 0;
    border: none;
  `,
  bordered: css`
    background-color: transparent;
    padding: 16px;
    border: 2px solid ${theme.colors.primary};
    flex-direction: row;
    gap: 8px;
  `,
}

const textVariantStyles = {
  default: css`
    color: ${theme.colors.background};
    font-size: 14px;
  `,
  bordered: css`
    color: ${theme.colors.primary};
    font-size: 16px;
  `,
}

const StyledButton = styled.View<{
  $pressed: boolean
  $variant: Variant
}>`
  align-items: center;
  width: 100%;
  border-radius: 8px;
  opacity: ${({ $pressed }) => ($pressed ? 0.8 : 1)};
  ${({ $variant }) => buttonVariantStyles[$variant]}
`
const ButtonText = styled.Text<{ $variant: Variant }>`
  font-family: ${theme.fonts.bold};
  ${({ $variant }) => textVariantStyles[$variant]}
`
