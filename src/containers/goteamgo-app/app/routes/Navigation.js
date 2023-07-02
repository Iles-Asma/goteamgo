import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import GoLogin from '../screens/GoLogin';
import GoSignup from '../screens/GoSignup';
import GoProfil from '../screens/GoProfil';
import GoEvent from '../screens/GoEvent';
import GoCreerAnnonce from '../screens/GoCreerAnnonce';
import GoChoixAction from '../screens/GoChoixAction';
import GoDispoVoitures from '../screens/GoDispoVoitures';
import GoCreateEvent from '../screens/GoCreateEvent'
import GoRedirectionSignup from '../screens/GoRedirectSignup';
import GoThanksShareCar from '../screens/GoThanksShareCar'

const RootStack = createNativeStackNavigator();
const HomeStack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator initialRouteName="GoEvent" screenOptions={{ headerShown: false }}>
        <HomeStack.Screen name="GoEvent" component={GoEvent} />
        <HomeStack.Screen name="GoChoixAction" component={GoChoixAction} />
        <HomeStack.Screen name="GoCreerAnnonce" component={GoCreerAnnonce} />
        <HomeStack.Screen name="GoDispoVoitures" component={GoDispoVoitures} />
        <HomeStack.Screen name="GoCreateEvent" component={GoCreateEvent} />
        <HomeStack.Screen name="GoThanksShareCar" component={GoThanksShareCar} />
    </HomeStack.Navigator>
  );
}

function BottomTabs() {
  return (
    <Tab.Navigator screenOptions={{ headerShown: false }}>
        <Tab.Screen
            name="HomeStack"
            component={HomeStackNavigator}
            options={{
                tabBarLabel: 'Événements',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="calendar" color={color} size={size} />
                ),
            }}
        />
        <Tab.Screen
            name="GoProfil"
            component={GoProfil}
            options={{
                tabBarLabel: 'Profil',
                tabBarIcon: ({ color, size }) => (
                    <Icon name="person" color={color} size={size} />
                ),
            }}
        />
    </Tab.Navigator>
  );
}

export default function Navigation() {
  return (
    <RootStack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
        <RootStack.Screen name="GoLogin" component={GoLogin} />
        <RootStack.Screen name="GoSignup" component={GoSignup} />
        <HomeStack.Screen name="GoRedirectionSignup" component={GoRedirectionSignup} options={{gestureEnabled: false}}/>
        <RootStack.Screen name="Home" component={BottomTabs} options={{ headerShown: false, gestureEnabled: false }}  />
    </RootStack.Navigator>
  );
}
