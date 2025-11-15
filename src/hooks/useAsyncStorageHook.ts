import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

interface RecordType {
  id: string
  title: string
  createdAt: string
  skills: { skill: string; intensity: number }[]
  selfRating: number
}

export function useAsyncStorageHook(deps: unknown[] = []) {
  const [skills, setSkills] = useState<string[] | null>()
  const [records, setRecords] = useState<RecordType[] | null>()

  useEffect(() => {
    AsyncStorage.getItem('skills').then((value) => {
      setSkills(value ? JSON.parse(value) : null)
    })
  }, deps)

  useEffect(() => {
    AsyncStorage.getItem('records').then((value) => {
      setRecords(value ? JSON.parse(value) : null)
    })
  }, deps)

  return {
    skills,
    records,
    showOnboarding: skills === null,
    hasActivities: !!records && records.length > 0,
  }
}
