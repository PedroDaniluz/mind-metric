import { Text } from 'react-native'
import { PageContainer } from '../../components/PageContainter'
import { PageHeader } from '../../components/PageHeader'
import { WarningCard } from '../../components/WarningCard'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'

export default function History() {
  const { hasActivities } = useAsyncStorageHook()
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
