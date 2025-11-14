import { createNativeStackNavigator } from '@react-navigation/native-stack'

import Welcome from '../screens/Welcome'
import Onboarding from '../screens/Onboarding'
import TabRoutes from './TabNavigator'
// import { useEffect, useState } from 'react'
// import AsyncStorage from '@react-native-async-storage/async-storage'

const Stack = createNativeStackNavigator()

export default function Routes() {
  // const [initialRoute, setInitialRoute] = useState<string | null>(null) -- definir localStorage

  // useEffect(() => {
  //   AsyncStorage.getItem('onboardingDone').then((value) => {
  //     setInitialRoute(value === 'true' ? 'Main' : 'Welcome')
  //   })
  // }, [])

  return (
    <Stack.Navigator
      initialRouteName="Welcome"
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Main" component={TabRoutes} />
    </Stack.Navigator>
  )
}
