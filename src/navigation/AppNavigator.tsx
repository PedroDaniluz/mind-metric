import { useEffect, useState } from 'react'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../screens/Welcome'
import Onboarding from '../screens/Onboarding'
import TabRoutes from './TabNavigator'

const Stack = createNativeStackNavigator()

export default function Routes() {
  const [initialRoute, setInitialRoute] = useState<string | null>(null)

  useEffect(() => {
    AsyncStorage.getItem('competencias').then((value) => {
      setInitialRoute(value?.length ? 'Main' : 'Welcome')
    })
  }, [])

  if (!initialRoute) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={initialRoute}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Main" component={TabRoutes} />
    </Stack.Navigator>
  )
}
