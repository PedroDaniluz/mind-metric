import AsyncStorage from '@react-native-async-storage/async-storage'
import { useEffect, useState } from 'react'

export function useAsyncStorageHook() {
  // ========== GETTERS ==========
  const [skills, setSkills] = useState<string[] | null>()
  const [records, setRecords] = useState()

  useEffect(() => {
    AsyncStorage.getItem('skills').then((value) => {
      setSkills(value ? JSON.parse(value) : null)
    })
  }, [])

  useEffect(() => {
    AsyncStorage.getItem('records').then((value) => {
      setRecords(value ? JSON.parse(value) : null)
    })
  }, [])

  return {
    skills,
    records,
    hasActivities: records && Object.keys(records).length > 0,
    showOnboarding: skills === null,
  }
}
