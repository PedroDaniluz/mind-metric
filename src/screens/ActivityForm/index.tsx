import { PageContainer } from '../../components/PageContainter'
import { NavigationProps } from './types'
import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '../../components/PageHeader'
import { BackButton } from '../../components/BackButton'
import { TextInput } from '../../components/TextInput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components/native'
import { Button } from '../../components/Button'
import { useLayoutEffect } from 'react'
import { tabBarDefaultStyle } from '../../navigation/TabNavigator'

const schema = z.object({
  title: z
    .string()
    .min(1, 'O título é obrigatório')
    .min(3, 'O título deve ter no mínimo 3 caracteres'),
})

type TFormData = z.infer<typeof schema>

export default function ActivityForm() {
  const navigation = useNavigation<NavigationProps>()

  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: tabBarDefaultStyle })
    }
  }, [])

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '' },
  })

  function onSubmit(data: TFormData) {
    console.log('Atividade registrada:', data)
  }

  return (
    <PageContainer>
      <BackButton onPress={() => navigation.goBack()} />
      <PageHeader title="Registrar Atividade" />
      <Controller
        control={control}
        name="title"
        render={({ field: { onChange, value } }) => (
          <TextInput
            title="Título da Atividade"
            placeholder="ex: Reunião com equipe"
            onChange={onChange}
            value={value}
            errorMessage={errors.title?.message}
          />
        )}
      />
      <ButtonContainer>
        <Button text="Salvar Atividade" onClick={handleSubmit(onSubmit)} />
      </ButtonContainer>
    </PageContainer>
  )
}

const ButtonContainer = styled.View`
  margin-top: auto;
  width: 100%;
`
