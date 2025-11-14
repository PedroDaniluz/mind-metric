export type RootStackParamList = {
  Welcome: undefined
  Onboarding: undefined
  Main: { screen?: keyof MainTabParamList } | undefined
  ActivityForm: undefined
}

export type MainTabParamList = {
  HomeTab: undefined
  History: undefined
}
