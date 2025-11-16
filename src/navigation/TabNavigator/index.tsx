import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import theme from '../../styles/theme'
import { BlurView } from 'expo-blur'

import Home from '../../screens/Home'
import ActivityForm from '../../screens/ActivityForm'
import History from '../../screens/History'
import { StyleSheet } from 'react-native'
import { IconWrapper, tabBarDefaultStyle } from './styles'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()

function HomeWithFormStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen
        name="Home"
        component={Home}
        options={{ title: 'Home' }}
      />
      <HomeStack.Screen
        name="ActivityForm"
        component={ActivityForm}
        options={{ title: 'Registro de Atividade' }}
      />
    </HomeStack.Navigator>
  )
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarShowLabel: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: tabBarDefaultStyle,
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarIconStyle: {
          height: '100%',
          width: '100%',
        },
        tabBarBackground: () => (
          <BlurView
            intensity={40}
            style={{ ...StyleSheet.absoluteFillObject, borderRadius: 24 }}
          />
        ),
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeWithFormStack}
        options={{
          title: 'Home',
          tabBarIcon: ({ focused, color, size }) => (
            <IconWrapper $focused={focused}>
              <Ionicons
                name="home-outline"
                size={size}
                color={focused ? theme.colors.background : color}
              />
            </IconWrapper>
          ),
        }}
      />
      <Tab.Screen
        name="Histórico"
        component={History}
        options={{
          tabBarIcon: ({ focused, color, size }) => (
            <IconWrapper $focused={focused}>
              <Ionicons
                name="time-outline"
                size={size}
                color={focused ? theme.colors.background : color}
              />
            </IconWrapper>
          ),
        }}
      ></Tab.Screen>
    </Tab.Navigator>
  )
}
