import styled from 'styled-components/native'
import theme from '../styles/theme'

interface CheckboxInputProps {
  title: string
  options: { label: string; value: string }[]
  value: string[]
  onChange: (value: string[]) => void
  errorMessage?: string
}

export function CheckboxInput({
  title,
  options,
  value,
  onChange,
  errorMessage,
}: CheckboxInputProps) {
  return (
    <CheckBoxContainer>
      <CheckBoxTitle>{title}</CheckBoxTitle>
      {options.map((opt) => (
        <CheckboxRow
          key={opt.value}
          onPress={() => {
            if (value.includes(opt.value)) {
              onChange(value.filter((v: string) => v !== opt.value))
            } else {
              onChange([...value, opt.value])
            }
          }}
        >
          <CheckboxBox selected={value.includes(opt.value)} />
          <CheckboxLabel>{opt.label}</CheckboxLabel>
        </CheckboxRow>
      ))}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </CheckBoxContainer>
  )
}

const CheckBoxContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 100%;
`
const CheckBoxTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 14px;
  color: ${theme.colors.primary};
`
const CheckboxRow = styled.Pressable`
  display: flex;
  flex-direction: row;
  gap: 8px;
  align-items: center;
`
const CheckboxBox = styled.View<{ selected: boolean }>`
  width: 16px;
  height: 16px;
  border-width: 1px;
  border-color: ${theme.colors.secondary};
  background-color: ${({ selected }) =>
    selected ? theme.colors.secondary : 'transparent'};
  border-radius: 4px;
`
const CheckboxLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.secondary};
`
const ErrorMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: red;
`
