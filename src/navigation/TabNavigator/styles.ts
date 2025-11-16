import styled from 'styled-components/native'
import theme from '../../styles/theme'
import { Platform } from 'react-native'

// used to reset style when needed
export const tabBarDefaultStyle = {
  position: 'absolute' as const,
  left: 20,
  right: 20,
  height: 72,
  bottom: 20,
  borderRadius: 24,
  marginHorizontal: Platform.OS === 'web' ? 0 : 20,
  borderTopWidth: 0,
  paddingBottom: 0,
  backgroundColor:
    Platform.OS === 'android' ? theme.colors.background : 'transparent',
  ...theme.shadows.default,
}

export const IconWrapper = styled.View<{ $focused?: boolean }>`
  width: 80%;
  height: 100%;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  ${({ $focused }) =>
    $focused &&
    `
    background-color: ${theme.colors.primary};
    shadow-color: ${theme.shadows.default.shadowColor};
    shadow-offset: ${theme.shadows.default.shadowOffset.width}px ${theme.shadows.default.shadowOffset.height}px;
    shadow-radius: ${theme.shadows.default.shadowRadius}px;
    elevation: ${theme.shadows.default.elevation};
  `}
`
