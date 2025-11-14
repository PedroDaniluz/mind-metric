import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'
import Button from '../components/Button'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

export default function Onboarding() {
  const navigation = useNavigation<NavigationProps>()
  return <Button text="Iniciar" onClick={() => navigation.navigate('Main')} />
}
