import AsyncStorage from '@react-native-async-storage/async-storage'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { useNavigation } from '@react-navigation/native'
import { RootStackParamList } from '../../types/navigation'
import { options } from '../../constants/options'

import { Text } from 'react-native'
import PageHeader from '../../components/PageHeader'
import Button from '../../components/Button'
import {
  CheckboxBox,
  CheckBoxContainer,
  CheckboxLabel,
  CheckboxRow,
  CheckBoxTitle,
  Container,
} from './styles'

type NavigationProps = NativeStackNavigationProp<RootStackParamList, 'Welcome'>

const schema = z.object({
  competencias: z.array(z.string()).length(5, 'Selecione 5 competências'),
})

type TFormData = z.infer<typeof schema>

export default function Onboarding() {
  const navigation = useNavigation<NavigationProps>()
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: { competencias: [] },
  })

  async function onSubmit(data: TFormData) {
    try {
      await AsyncStorage.setItem(
        'competencias',
        JSON.stringify(data.competencias)
      )
      navigation.navigate('Main')
    } catch (e) {
      console.error('Erro ao salvar competências:', e)
    }
  }

  return (
    <Container>
      <PageHeader
        title="Onboarding"
        subtitle="Defina aqui os parâmetros de seu crescimento!"
      />
      <Controller
        control={control}
        name="competencias"
        render={({ field: { onChange, value } }) => (
          <CheckBoxContainer>
            <CheckBoxTitle>
              Selecione 5 competências para monitorar:
            </CheckBoxTitle>
            {options.map((opt) => (
              <CheckboxRow
                key={opt.value}
                onPress={() => {
                  if (value.includes(opt.value)) {
                    onChange(value.filter((v: string) => v !== opt.value))
                  } else {
                    onChange([...value, opt.value])
                  }
                }}
              >
                <CheckboxBox selected={value.includes(opt.value)} />
                <CheckboxLabel>{opt.label}</CheckboxLabel>
              </CheckboxRow>
            ))}
            {errors.competencias && (
              <Text style={{ color: 'red' }}>
                {errors.competencias.message}
              </Text>
            )}
          </CheckBoxContainer>
        )}
      />
      <Button text="Iniciar" onClick={handleSubmit(onSubmit)} />
    </Container>
  )
}
