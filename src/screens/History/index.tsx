import { PageContainer } from '../../components/PageContainter'
import { PageHeader } from '../../components/PageHeader'
import { WarningCard } from '../../components/WarningCard'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'
import { useIsFocused } from '@react-navigation/native'
import { options } from '../../constants/options'
import { CardShadow } from '../../components/CardShadow'
import styled from 'styled-components/native'
import theme from '../../styles/theme'
import { Ionicons } from '@expo/vector-icons'

export default function History() {
  const isFocused = useIsFocused()
  const { hasActivities, rawRecords } = useAsyncStorageHook([isFocused])

  // assign labels to skills in records
  const mappedRecords = rawRecords?.map((record) => ({
    activity: record.title,
    date: record.createdAt,
    skills: record.skills.map((skillObj) => {
      const option = options.find((o) => o.value === skillObj.skill)
      return {
        ...skillObj,
        label: option ? option.label : skillObj.skill,
      }
    }),
    rating: record.selfRating,
  }))

  return (
    <PageContainer>
      <PageHeader
        title="Histórico"
        subtitle="Registro detalhado de suas atividades"
      />
      {!hasActivities ? (
        <WarningCard />
      ) : (
        mappedRecords?.map((record, index) => (
          <HistoryCardShadow key={index}>
            <HistoryContent>
              <ActivityTitle>{record.activity}</ActivityTitle>
              <ActivityDate>
                {new Date(record.date).toLocaleDateString('pt-BR', {
                  day: '2-digit',
                  month: '2-digit',
                  year: 'numeric',
                  hour: '2-digit',
                  minute: '2-digit',
                })}
              </ActivityDate>
              <SkillTitle>Competências:</SkillTitle>
              {record.skills.map((skill, idx) => (
                <SkillItem key={idx} style={{ marginLeft: 8 }}>
                  {'\u2022'} {skill.label}: {skill.intensity}
                </SkillItem>
              ))}
            </HistoryContent>

            <RatingBarContainer>
              <RatingBarFill
                style={{ height: `${(record.rating / 5) * 100}%` }}
              />
              <Ionicons
                name="star-outline"
                size={12}
                color="#0000003d"
                style={{
                  position: 'absolute',
                  top: 4,
                  left: '50%',
                  transform: [{ translateX: -6 }],
                }}
              />
            </RatingBarContainer>
          </HistoryCardShadow>
        ))
      )}
    </PageContainer>
  )
}

const HistoryCardShadow = styled(CardShadow)`
  padding: 12px;
  flex-direction: row;
`
const HistoryContent = styled.View`
  flex: 1;
  gap: 2px;
`
const ActivityTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
`
const ActivityDate = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.secondary};
`
const SkillTitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 14px;
  color: ${theme.colors.primary};
`
const SkillItem = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.secondary};
`
const RatingBarContainer = styled.View`
  width: 10%;
  height: 100%;
  background-color: #e0e0e0;
  border-radius: 4px;
  overflow: hidden;
  justify-content: flex-end;
`
const RatingBarFill = styled.View`
  height: 100%;
  background-color: ${theme.colors.primary};
  border-radius: 4px;
`
