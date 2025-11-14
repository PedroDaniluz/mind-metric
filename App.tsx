import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View } from 'react-native'
import {
  useFonts,
  Lato_300Light,
  Lato_400Regular,
  Lato_700Bold,
} from '@expo-google-fonts/lato'

export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.tsx to start working on your app!</Text>
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
})
