import styled from 'styled-components/native'
import theme from '../styles/theme'

interface TextInputProps {
  title: string
  placeholder: string
  value: string
  onChange: (text: string) => void
  errorMessage?: string
}

export function TextInput({
  title,
  placeholder,
  value,
  onChange,
  errorMessage,
}: TextInputProps) {
  return (
    <TextInputContainer>
      <Title>{title}</Title>
      <StyledInput
        inputMode={'text'}
        placeholder={placeholder}
        value={value}
        onChangeText={onChange}
        placeholderTextColor="#717171"
      />
      <ErrorMessage>{errorMessage}</ErrorMessage>
    </TextInputContainer>
  )
}

const TextInputContainer = styled.View`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
`
const Title = styled.Text`
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  margin-bottom: 8px;
`
const StyledInput = styled.TextInput`
  width: 100%;
  color: ${theme.colors.primary};
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  border-bottom-width: 1px;
  border-bottom-color: ${theme.colors.primary};
  padding-bottom: 8px;
  outline-width: 0;
`
const ErrorMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: red;
`
