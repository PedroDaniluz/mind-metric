import styled from 'styled-components/native'
import { Ionicons } from '@expo/vector-icons'
import theme from '../../../styles/theme'

interface StarRatingInputProps {
  title: string
  value: number
  onChange: (val: number) => void
}

export function StarRatingInput({
  title,
  value,
  onChange,
}: StarRatingInputProps) {
  return (
    <StarRatingContainer>
      <StarRatingTitle>{title}</StarRatingTitle>
      <StarRow>
        {[1, 2, 3, 4, 5].map((star) => (
          <Ionicons
            key={star}
            name={star <= (value ?? 3) ? 'star' : 'star-outline'}
            size={32}
            color={theme.colors.secondary}
            onPress={() => onChange(star)}
            style={{ marginHorizontal: 2 }}
          />
        ))}
        <RatingValue>{value ?? 3} / 5</RatingValue>
      </StarRow>
    </StarRatingContainer>
  )
}

const StarRatingContainer = styled.View`
  width: 100%;
  gap: 8px;
`
const StarRatingTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
`
const StarRow = styled.View`
  flex-direction: row;
  align-items: center;
`
const RatingValue = styled.Text`
  font-family: ${theme.fonts.regular};
  color: ${theme.colors.primary};
  width: 40px;
  text-align: right;
  font-size: 14px;
`
