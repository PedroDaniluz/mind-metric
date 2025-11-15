import styled from 'styled-components/native'
import theme from '../styles/theme'
import { View } from 'react-native'
import Slider from '@react-native-community/slider'

interface SliderInputProps {
  title: string
  options: { label: string; value: string }[]
  value: Record<string, number>
  setValue: (val: Record<string, number>) => void
  errorMessage?: string
}

export function SliderInput({
  title,
  options,
  value,
  setValue,
  errorMessage,
}: SliderInputProps) {
  return (
    <SliderContainer>
      <SliderTitle>{title}</SliderTitle>
      {options.map((opt) => (
        <View key={opt.value}>
          <FieldLabel>{opt.label}</FieldLabel>
          <SliderRow>
            <Slider
              style={{ flex: 1 }}
              minimumValue={0}
              maximumValue={3}
              step={1}
              value={value[opt.value] ?? 0}
              onValueChange={(val) => setValue({ ...value, [opt.value]: val })}
              thumbTintColor={theme.colors.secondary}
              minimumTrackTintColor={theme.colors.secondary}
            />
            <ValueLabel>{value[opt.value] ?? 0} / 3</ValueLabel>
          </SliderRow>
        </View>
      ))}
      {errorMessage && <ErrorMessage>{errorMessage}</ErrorMessage>}
    </SliderContainer>
  )
}

const SliderContainer = styled.View`
  width: 100%;
  gap: 8px;
`
const SliderTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
  margin-bottom: 8px;
`
const FieldLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.primary};
  font-size: 14px;
  margin-bottom: 4px;
`
const SliderRow = styled.View`
  flex-direction: row;
  align-items: center;
`
const ValueLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.primary};
  width: 40px;
  text-align: right;
  font-size: 14px;
`
const ErrorMessage = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: red;
`
