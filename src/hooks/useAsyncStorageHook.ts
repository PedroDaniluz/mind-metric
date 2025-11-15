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
  const [rawSkills, setRawSkills] = useState<string[] | null>(null)
  const [rawRecords, setRawRecords] = useState<RecordType[] | null>()
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    AsyncStorage.getItem('skills').then((value) => {
      setRawSkills(value ? JSON.parse(value) : [])
      setLoading(false)
    })
  }, deps)

  useEffect(() => {
    AsyncStorage.getItem('records').then((value) => {
      setRawRecords(value ? JSON.parse(value) : null)
    })
  }, deps)

  return {
    rawSkills,
    rawRecords,
    loading,
    showOnboarding: Array.isArray(rawSkills) && rawSkills.length === 0,
    hasActivities: Array.isArray(rawRecords) && rawRecords.length > 0,
  }
}
