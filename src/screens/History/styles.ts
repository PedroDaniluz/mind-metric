import styled from 'styled-components/native'
import { PageContainer } from '../../components/PageContainter'
import { CardShadow } from '../../components/CardShadow'
import theme from '../../styles/theme'

export const StyledPageContainer = styled(PageContainer)`
  margin-bottom: 48px;
`
export const HistoryCardShadow = styled(CardShadow)`
  padding: 12px;
  flex-direction: row;
  align-items: stretch;
`
export const HistoryContent = styled.View`
  flex: 1;
  gap: 2px;
`
export const ActivityTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
`
export const ActivityDate = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.secondary};
`
export const SkillTitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.primary};
`
export const SkillItem = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.secondary};
`
export const RatingBarContainer = styled.View`
  width: 10%;
  align-self: stretch;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  justify-content: flex-end;
  position: relative;
`
export const RatingBarFill = styled.View`
  width: 100%;
  background-color: ${theme.colors.primary};
  border-radius: 4px;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 0;
`
