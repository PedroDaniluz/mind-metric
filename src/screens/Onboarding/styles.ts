import styled from 'styled-components/native'
import theme from '../../styles/theme'

export const Container = styled.View`
  flex: 1;
  padding: 76px 40px;
  gap: 24px;
  align-items: center;
  overflow: hidden;
`
export const CheckBoxContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`
export const CheckBoxTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 14px;
  color: ${theme.colors.primary};
`
export const CheckboxRow = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`
export const CheckboxBox = styled.View<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  border-width: 1px;
  border-color: ${theme.colors.secondary};
  background-color: ${({ selected }) =>
    selected ? theme.colors.secondary : 'transparent'};
  border-radius: 4px;
`
export const CheckboxLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.secondary};
`
