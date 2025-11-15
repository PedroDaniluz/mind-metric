import styled from 'styled-components/native'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import { Ionicons } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import CardShadow from '../../components/CardShadow'
import { Text } from 'react-native'

export default function Home() {
  const { start, end } = getCurrentWeekInterval()

  const [hasData, setHasData] = useState<boolean>(false)

  useEffect(() => {
    AsyncStorage.getItem('registros').then((value) => {
      setHasData(value?.length ? true : false)
    })
  }, [])

  return (
    <Container>
      <PageHeader
        title="Dashboard"
        subtitle={`Semana atual: ${formatDateToDDMM(start)} - ${formatDateToDDMM(end)}`}
      />
      {!hasData && (
        <CardShadow
          style={{
            padding: 12,
            alignItems: 'center',
            gap: 16,
            width: '100%',
            display: 'flex',
            flexDirection: 'row',
          }}
        >
          <Ionicons
            name="alert-circle-outline"
            size={48}
            color={theme.colors.secondary}
          />
          <Text>Registre atividades para acompanhar seu desenvolvimento</Text>
        </CardShadow>
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
        onClick={() => {}}
      />
    </Container>
  )
}

function getCurrentWeekInterval() {
  const now = new Date()
  const firstDayOfWeek = new Date(now)
  firstDayOfWeek.setDate(now.getDate() - now.getDay())
  const lastDayOfWeek = new Date(firstDayOfWeek)
  lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6)
  return { start: firstDayOfWeek, end: lastDayOfWeek }
}

function formatDateToDDMM(date: Date) {
  return date.toLocaleDateString('pt-BR', {
    day: '2-digit',
    month: '2-digit',
  })
}

const Container = styled.View`
  flex: 1;
  padding: 76px 40px;
  gap: 24px;
  align-items: center;
  overflow: hidden;
`
