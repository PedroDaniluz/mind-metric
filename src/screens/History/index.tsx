import { Text } from 'react-native'
import { PageContainer } from '../../components/PageContainter'
import { PageHeader } from '../../components/PageHeader'
import { WarningCard } from '../../components/WarningCard'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'
import { useIsFocused } from '@react-navigation/native'

export default function History() {
  const isFocused = useIsFocused()
  const { hasActivities } = useAsyncStorageHook([isFocused])
  return (
    <PageContainer>
      <PageHeader
        title="Histórico"
        subtitle="Registro detalhado de suas atividades"
      />
      {!hasActivities ? <WarningCard /> : <Text>histórico</Text>}
    </PageContainer>
  )
}
