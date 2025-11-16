import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Welcome from '../screens/Welcome'
import Onboarding from '../screens/Onboarding'
import TabRoutes from './TabNavigator'
import { useAsyncStorageHook } from '../hooks/useAsyncStorageHook'

const Stack = createNativeStackNavigator()

export default function Routes() {
  const { showOnboarding, loading } = useAsyncStorageHook()

  if (loading) return null

  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      {showOnboarding ? (
        <>
          <Stack.Screen name="Welcome" component={Welcome} />
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Main" component={TabRoutes} />
        </>
      ) : (
        <Stack.Screen name="Main" component={TabRoutes} />
      )}
    </Stack.Navigator>
  )
}
