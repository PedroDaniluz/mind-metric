import { useMemo } from 'react'
import { Dimensions } from 'react-native'
import styled from 'styled-components/native'
import { PieChart } from 'react-native-gifted-charts'
import theme from '../../../styles/theme'
import { CardShadow } from '../../../components/CardShadow'

interface DonutChartCardProps {
  mappedSkills?: { label: string; value: string }[]
  mappedRecords?: {
    activity: string
    date: string
    skills: {
      label: string
      skill: string
      intensity: number
    }[]
    rating: number
  }[]
}

export function DonutChartCard({
  mappedSkills,
  mappedRecords,
}: DonutChartCardProps) {
  const chartSize = Dimensions.get('window').width - 128
  const radius = chartSize / 2.5
  const innerRadius = radius * 0.6

  const pieData = useMemo(() => {
    if (!mappedSkills || !mappedRecords) return []

    const totals: Record<string, number> = {}

    mappedRecords.forEach((record) => {
      record.skills.forEach((skillEntry) => {
        const key = skillEntry.skill
        const intensity = skillEntry.intensity ?? 0
        const value = intensity

        if (!totals[key]) {
          totals[key] = 0
        }
        totals[key] += value
      })
    })

    const colors = [
      '#4B9352',
      '#476967',
      '#E8862A',
      '#FFC300',
      '#504769',
      '#695747',
      '#E17055',
    ]

    return mappedSkills
      .map((skill, index) => {
        const value = totals[skill.value] ?? 0
        if (value === 0) return null

        return {
          value,
          color: colors[index % colors.length],
          text: skill.label,
        }
      })
      .filter(
        (item): item is { value: number; color: string; text: string } => !!item
      )
  }, [mappedSkills, mappedRecords])

  if (!pieData.length) return

  const total = pieData.reduce((sum, item) => sum + item.value, 0)

  return (
    <StyledCardShadow>
      <RadarTitle>Pontos por Atividade</RadarTitle>

      <PieChart
        data={pieData}
        donut
        radius={radius}
        innerRadius={innerRadius}
        textColor={theme.colors.primary}
        textSize={11}
        textBackgroundColor="white"
        centerLabelComponent={() => (
          <CenterLabelContainer>
            <CenterLabelTitle>Total</CenterLabelTitle>
            <CenterLabelValue>{total}</CenterLabelValue>
          </CenterLabelContainer>
        )}
      />

      <LegendContainer>
        {pieData.map((item) => (
          <LegendItem key={item.text}>
            <LegendColorDot style={{ backgroundColor: item.color }} />
            <LegendLabel>{item.text}</LegendLabel>
          </LegendItem>
        ))}
      </LegendContainer>
    </StyledCardShadow>
  )
}

const StyledCardShadow = styled(CardShadow)`
  gap: 10px;
  padding: 16px 16px 16px 16px;
  align-items: center;
`
const RadarTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
  margin-bottom: 8px;
  width: 100%;
`
const CenterLabelContainer = styled.View`
  align-items: center;
  justify-content: center;
`
const CenterLabelTitle = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.primary};
`
const CenterLabelValue = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 18px;
  color: ${theme.colors.primary};
`
const LegendContainer = styled.View`
  flex-direction: row;
  flex-wrap: wrap;
  gap: 12px;
  align-items: center;
  justify-content: center;
`
const LegendItem = styled.View`
  flex-direction: row;
  align-items: center;
  gap: 4px;
  justify-content: center;
`
const LegendColorDot = styled.View`
  width: 10px;
  height: 10px;
  border-radius: 5px;
`
const LegendLabel = styled.Text`
  font-family: ${theme.fonts.regular};
  font-size: 12px;
  color: ${theme.colors.primary};
`
