import { useMemo } from 'react'
import { RadarChart } from 'react-native-gifted-charts'
import styled from 'styled-components/native'
import theme from '../../../styles/theme'
import { CardShadow } from '../../../components/CardShadow'
import { Dimensions } from 'react-native'

interface RadarChartCardProps {
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

export function RadarChartCard({
  mappedSkills,
  mappedRecords,
}: RadarChartCardProps) {
  const aggregatedRadarValues = useMemo(() => {
    if (!mappedSkills || !mappedRecords) return []

    const totals: Record<string, number> = {}

    mappedRecords.forEach((record) => {
      const rating = record.rating ?? 0

      record.skills.forEach((skillEntry) => {
        const key = skillEntry.skill
        const intensity = skillEntry.intensity ?? 0
        const value = rating * intensity

        if (!totals[key]) {
          totals[key] = 0
        }
        totals[key] += value
      })
    })

    return mappedSkills.map((skill) => totals[skill.value] ?? 0)
  }, [mappedSkills, mappedRecords])

  const labels = mappedSkills?.map((skill) => skill.label) || []

  const safeData = aggregatedRadarValues.length
    ? aggregatedRadarValues
    : labels.map(() => 0)

  const chartSize = Dimensions.get('window').width - 128

  return (
    <StyledCardShadow>
      <RadarTitle>Desempenho por Competência</RadarTitle>
      <RadarChart
        gridConfig={{
          fill: 'transparent',
          gradientColor: 'transparent',
          showGradient: false,
        }}
        labels={labels}
        data={safeData}
        chartSize={chartSize}
        labelsPositionOffset={-1}
        labelConfig={{
          fontFamily: theme.fonts.regular,
          stroke: theme.colors.primary,
        }}
      />
    </StyledCardShadow>
  )
}

const StyledCardShadow = styled(CardShadow)`
  padding: 16px 16px 4px 16px;
`
const RadarTitle = styled.Text`
  font-family: ${theme.fonts.bold};
  font-size: 16px;
  color: ${theme.colors.primary};
`
