// Navigation.js
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Icon from 'react-native-vector-icons/Ionicons';

import GoLogin from '../screens/GoLogin';
import GoSignup from '../screens/GoSignup';
import GoProfil from '../screens/GoProfil';
import GoEvent from '../screens/GoEvent';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator screenOptions={{ headerShown: false }}>
            {/* Example Home Screen */}
            <Tab.Screen
                name="GoEvent"
                component={GoEvent}
                options={{
                    tabBarLabel: 'Événements',
                    tabBarIcon: ({ color, size }) => (
                        <Icon name="calendar" color={color} size={size} />
                    ),
                }}
            />

            {/* Profile Screen */}
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
        <Stack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="GoSignup" component={GoSignup} />
            <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
    );
}
