import logoImg from '../../../assets/logo.png'
import { Button } from '../../components/Button'
import { StyledPageContainer, Logo } from './styles'
import { useNavigation } from '@react-navigation/native'
import { NavigationProps } from './types'

const Welcome = () => {
  const navigation = useNavigation<NavigationProps>()
  return (
    <StyledPageContainer>
      <Logo source={logoImg} />
      <Button
        text="Iniciar"
        onClick={() => navigation.navigate('Onboarding')}
      />
    </StyledPageContainer>
  )
}

export default Welcome
