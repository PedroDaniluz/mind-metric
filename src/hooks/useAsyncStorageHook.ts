import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'
import { options } from '../constants/options'

interface RecordType {
  id: string
  title: string
  createdAt: string
  skills: { skill: string; intensity: number }[]
  selfRating: number
}

export function useAsyncStorageHook(deps: unknown[] = []) {
  const [rawSkills, setRawSkills] = useState<string[] | null>(null)
  const [rawRecords, setRawRecords] = useState<RecordType[] | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    Promise.all([
      AsyncStorage.getItem('skills'),
      AsyncStorage.getItem('records'),
    ]).then(([skillsValue, recordsValue]) => {
      setRawSkills(skillsValue ? JSON.parse(skillsValue) : [])
      setRawRecords(recordsValue ? JSON.parse(recordsValue) : [])
      setLoading(false)
    })
  }, deps)

  const mappedSkills = rawSkills
    ?.map((value) => options.find((opt) => opt.value === value))
    .filter((opt): opt is { label: string; value: string } => !!opt)

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

  return {
    rawSkills,
    mappedSkills,
    rawRecords,
    mappedRecords,
    loading,
    showOnboarding: Array.isArray(rawSkills) && rawSkills.length === 0,
    hasActivities: Array.isArray(rawRecords) && rawRecords.length > 0,
  }
}
