import AsyncStorage from '@react-native-async-storage/async-storage'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { useNavigation } from '@react-navigation/native'
import { options } from '../../constants/options'

import { PageHeader } from '../../components/PageHeader'
import { Button } from '../../components/Button'
import { NavigationProps } from './types'
import { PageContainer } from '../../components/PageContainter'
import { CheckboxInput } from '../../components/CheckboxInput'

const schema = z.object({
  skills: z.array(z.string()).length(5, 'Selecione 5 competências'),
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
    defaultValues: { skills: [] },
  })

  async function onSubmit(data: TFormData) {
    try {
      await AsyncStorage.setItem('skills', JSON.stringify(data.skills))
      navigation.navigate('Main')
    } catch (e) {
      console.error('Erro ao salvar competências:', e)
    }
  }

  return (
    <PageContainer>
      <PageHeader
        title="Onboarding"
        subtitle="Defina aqui os parâmetros de seu crescimento!"
      />
      <Controller
        control={control}
        name="skills"
        render={({ field: { onChange, value } }) => (
          <CheckboxInput
            title="Selecione 5 competências para monitorar:"
            options={options}
            value={value}
            onChange={onChange}
            errorMessage={errors.skills?.message}
          />
        )}
      />
      <Button text="Iniciar" onClick={handleSubmit(onSubmit)} />
    </PageContainer>
  )
}
