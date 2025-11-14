import styled from 'styled-components/native'
import logoImg from '../../assets/logo.png'
import Button from '../components/Button'

import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../types/navigation'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

const Welcome = () => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <Container>
      <Logo source={logoImg} />
      <Button
        text="Iniciar"
        onClick={() => navigation.navigate('Onboarding')}
      />
    </Container>
  )
}

const Container = styled.View`
  flex: 1;
  padding: 76px 40px;
  justify-content: space-between;
  align-items: center;
  overflow: hidden;
`

const Logo = styled.Image.attrs({
  resizeMode: 'contain',
})`
  height: 148px;
  aspect-ratio: 1.9;
`

export default Welcome
