import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { Ionicons } from '@expo/vector-icons'
import theme from '../styles/theme'

// Telas
import Home from '../screens/Home'
import ActivityForm from '../screens/ActivityForm'
import History from '../screens/History'
import styled from 'styled-components/native'

const Tab = createBottomTabNavigator()
const HomeStack = createNativeStackNavigator()

function HomeWithFormStack() {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={Home} />
      <HomeStack.Screen name="ActivityForm" component={ActivityForm} />
    </HomeStack.Navigator>
  )
}

export default function TabRoutes() {
  return (
    <Tab.Navigator
      initialRouteName="HomeTab"
      screenOptions={{
        headerShown: false,
        tabBarActiveTintColor: theme.colors.primary,
        tabBarInactiveTintColor: 'gray',
        tabBarStyle: {
          position: 'absolute',
          left: 20,
          right: 20,
          height: 72,
          bottom: 20,
          borderRadius: 24,
          backgroundColor: theme.colors.background,
          borderTopWidth: 0,
          ...theme.shadows.default,
        },
        tabBarItemStyle: {
          paddingVertical: 8,
        },
        tabBarIconStyle: {
          height: '100%',
          width: '100%',
        },
      }}
    >
      <Tab.Screen
        name="HomeTab"
        component={HomeWithFormStack}
        options={{
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

const IconWrapper = styled.View<{ $focused?: boolean }>`
  width: 80%;
  height: 100%;
  border-radius: 24px;
  justify-content: center;
  align-items: center;
  ${({ $focused }) =>
    $focused &&
    `
    background-color: ${theme.colors.primary};
    shadow-color: ${theme.shadows.default.shadowColor};
    shadow-offset: ${theme.shadows.default.shadowOffset.width}px ${theme.shadows.default.shadowOffset.height}px;
    shadow-radius: ${theme.shadows.default.shadowRadius}px;
    elevation: ${theme.shadows.default.elevation};
  `}
`
