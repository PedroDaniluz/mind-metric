import { PageHeader } from '../../components/PageHeader'
import { WarningCard } from '../../components/WarningCard'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'
import { useIsFocused } from '@react-navigation/native'
import { Ionicons } from '@expo/vector-icons'
import {
  ActivityDate,
  ActivityTitle,
  HistoryCardShadow,
  HistoryContent,
  RatingBarContainer,
  RatingBarFill,
  SkillItem,
  SkillTitle,
  StyledPageContainer,
} from './styles'

export default function History() {
  const isFocused = useIsFocused()
  const { hasActivities, mappedRecords } = useAsyncStorageHook([isFocused])

  return (
    <StyledPageContainer>
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
    </StyledPageContainer>
  )
}
