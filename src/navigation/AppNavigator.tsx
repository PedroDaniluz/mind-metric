import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/Welcome'
import Onboarding from '../screens/Onboarding'
import TabRoutes from './TabNavigator'
import { useAsyncStorageHook } from '../hooks/useAsyncStorageHook'

const Stack = createNativeStackNavigator()

export default function Routes() {
  const { showOnboarding, loading } = useAsyncStorageHook()

  if (loading) {
    return null
  }

  return (
    <Stack.Navigator
      initialRouteName={showOnboarding ? 'Welcome' : 'Main'}
      screenOptions={{ headerShown: false }}
    >
      <Stack.Screen name="Welcome" component={Welcome} />
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Main" component={TabRoutes} />
    </Stack.Navigator>
  )
}
