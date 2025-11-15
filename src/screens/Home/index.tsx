import { PageHeader } from '../../components/PageHeader'
import { Button } from '../../components/Button'
import { Ionicons } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { WarningCard } from '../../components/WarningCard'
import {
  formatDateToDDMM,
  getCurrentWeekInterval,
} from '../../ultils/dateHelpers'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'
import { useIsFocused, useNavigation } from '@react-navigation/native'
import { NavigationProps } from './types'
import { RadarChartCard } from './components/RadarChartCard'
import { DonutChartCard } from './components/DonutChart'
import { StyledPageContainer } from './styles'

export default function Home() {
  const navigation = useNavigation<NavigationProps>()
  const isFocused = useIsFocused()

  const { start, end } = getCurrentWeekInterval()
  const { hasActivities, mappedSkills, mappedRecords } = useAsyncStorageHook([
    isFocused,
  ])

  return (
    <StyledPageContainer>
      <PageHeader
        title="Dashboard"
        subtitle={`Semana atual: ${formatDateToDDMM(start)} - ${formatDateToDDMM(end)}`}
      />
      {!hasActivities ? (
        <WarningCard />
      ) : (
        <>
          <DonutChartCard
            mappedSkills={mappedSkills}
            mappedRecords={mappedRecords}
          />
          <RadarChartCard
            mappedSkills={mappedSkills}
            mappedRecords={mappedRecords}
          />
        </>
      )}

      <Button
        text="Registrar atividade"
        variant="bordered"
        icon={
          <Ionicons
            name="add-circle-outline"
            size={24}
            color={theme.colors.primary}
          />
        }
        onClick={() => navigation.navigate('ActivityForm')}
      />
    </StyledPageContainer>
  )
}
