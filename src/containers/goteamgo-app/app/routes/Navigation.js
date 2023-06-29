import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import GoLogin from '../screens/GoLogin'
import GoSignup from '../screens/GoSignup'
import GoProfil from '../screens/GoProfil';

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="GoSignup" component={GoSignup} />
        </Stack.Navigator>
    );
}

const Tab = createBottomTabNavigator();
export function Navigator() {


    return (
        <Tab.Navigator>
            {/*  Affiche l'ecran d'accueil */}
            <Tab.Screen name="GoSignup" component={GoSignup} />

            {/* affiche l'ecrande profil */}
            <Tab.Screen name="GoProfil" component={GoProfil} />
        </Tab.Navigator>
    );
}



