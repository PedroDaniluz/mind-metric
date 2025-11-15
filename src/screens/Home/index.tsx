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
import { PageContainer } from '../../components/PageContainter'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from './types'

export default function Home() {
  const navigation = useNavigation<NavigationProps>()

  const { start, end } = getCurrentWeekInterval()
  const { hasActivities } = useAsyncStorageHook()

  return (
    <PageContainer>
      <PageHeader
        title="Dashboard"
        subtitle={`Semana atual: ${formatDateToDDMM(start)} - ${formatDateToDDMM(end)}`}
      />
      {!hasActivities && <WarningCard />}
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
    </PageContainer>
  )
}
