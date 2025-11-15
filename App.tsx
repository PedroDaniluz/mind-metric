import { NavigationContainer } from '@react-navigation/native'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import Routes from './src/navigation/AppNavigator'
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
  Lato_900Black,
} from '@expo-google-fonts/lato'

export default function App() {
  const [fontsLoaded] = useFonts({
    Lato_300Light,
    Lato_400Regular,
    Lato_700Bold,
    Lato_900Black,
  })

  if (!fontsLoaded) {
    return null
  }

  return (
    <GestureHandlerRootView>
      <NavigationContainer>
        <Routes />
      </NavigationContainer>
    </GestureHandlerRootView>
  )
}
