import { PageContainer } from '../../components/PageContainter'
import { NavigationProps } from './types'
import { useNavigation } from '@react-navigation/native'
import { PageHeader } from '../../components/PageHeader'
import { BackButton } from './components/BackButton'
import { TextInput } from './components/TextInput'
import { z } from 'zod'
import { Controller, useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import styled from 'styled-components/native'
import { Button } from '../../components/Button'
import { useLayoutEffect } from 'react'
import { tabBarDefaultStyle } from '../../navigation/TabNavigator/styles'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useAsyncStorageHook } from '../../hooks/useAsyncStorageHook'
import { SliderInput } from './components/SliderInput'
import { StarRatingInput } from './components/StarRatingInput'

const schema = z
  .object({
    title: z
      .string()
      .min(1, 'O título é obrigatório')
      .min(3, 'O título deve ter no mínimo 3 caracteres'),
    skillIntensities: z.record(z.string(), z.number().min(0).max(3)),
    selfRating: z.number({
      required_error: 'A autoavaliação é obrigatória',
    }),
  })
  .refine((data) => Object.values(data.skillIntensities).some((v) => v > 0), {
    message: 'Defina pelo menos uma competência com intensidade maior que 0.',
    path: ['skillIntensities'],
  })

type TFormData = z.infer<typeof schema>

export default function ActivityForm() {
  const navigation = useNavigation<NavigationProps>()

  // Hide tab bar on this screen
  useLayoutEffect(() => {
    navigation.getParent()?.setOptions({ tabBarStyle: { display: 'none' } })
    return () => {
      navigation.getParent()?.setOptions({ tabBarStyle: tabBarDefaultStyle })
    }
  }, [])

  const { mappedSkills, rawRecords } = useAsyncStorageHook()

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<TFormData>({
    resolver: zodResolver(schema),
    defaultValues: { title: '', selfRating: 3, skillIntensities: {} },
  })

  async function onSubmit(data: TFormData) {
    const skillsPayload = mappedSkills
      ?.map((skill) => ({
        skill: skill.value,
        intensity: data.skillIntensities[skill.value],
      }))
      .filter((s) => s.intensity > 0)

    const newRecord = {
      id: Date.now().toString(),
      title: data.title,
      createdAt: new Date().toISOString(),
      skills: skillsPayload,
      selfRating: data.selfRating,
    }

    try {
      const updated = [...(rawRecords ?? []), newRecord]
      await AsyncStorage.setItem('records', JSON.stringify(updated))
      navigation.goBack()
    } catch (error) {
      console.error('Erro ao salvar atividade', error)
    }
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

      <Controller
        control={control}
        name="skillIntensities"
        render={({ field: { onChange, value } }) => {
          return (
            <SliderInput
              title="Competências trabalhadas"
              options={mappedSkills || []}
              value={value}
              setValue={onChange}
              errorMessage={
                typeof errors.skillIntensities?.message === 'string'
                  ? errors.skillIntensities?.message
                  : undefined
              }
            />
          )
        }}
      />

      <Controller
        control={control}
        name="selfRating"
        render={({ field: { onChange, value } }) => (
          <StarRatingInput
            title="Autoavaliação (1 a 5)"
            value={value}
            onChange={onChange}
          />
        )}
      />

      <StyledButton text="Salvar Atividade" onClick={handleSubmit(onSubmit)} />
    </PageContainer>
  )
}

const StyledButton = styled(Button)`
  margin-top: auto;
`
