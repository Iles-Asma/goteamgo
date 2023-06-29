// Navigation.js

import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import GoLogin from '../screens/GoLogin';
import GoSignup from '../screens/GoSignup';
import GoProfil from '../screens/GoProfil';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function BottomTabs() {
    return (
        <Tab.Navigator>
            {/* Affiche l'écran d'accueil */}
            <Tab.Screen name="GoSignup" component={GoSignup} />

            {/* Affiche l'écran de profil */}
            <Tab.Screen name="GoProfil" component={GoProfil} />
        </Tab.Navigator>
    );
}

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="Home" component={BottomTabs} />
        </Stack.Navigator>
    );
}
