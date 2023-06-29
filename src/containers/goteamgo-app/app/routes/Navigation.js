import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';


import GoLogin from '../screens/GoLogin'
import GoSignup from '../screens/GoSignup'
import GoProfil from '../screens/GoProfil';

const GoTeamStack = createNativeStackNavigator();
export default function Navigation() {
    return (
        <GoTeamStack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
            <GoTeamStack.Screen name="GoLogin" component={GoLogin} />
            <GoTeamStack.Screen name="GoSignup" component={GoSignup} />
        </GoTeamStack.Navigator>
    );
}

const GoBottomTab = createBottomTabNavigator();
export function GoBottomTabStack() {


    return (
        <GoBottomTab.Navigator>
            {/*  Affiche l'ecran d'accueil */}
            <GoBottomTab.Screen name="GoSignup" component={GoSignup} />

            {/* affiche l'ecrande profil */}
            <GoBottomTab.Screen name="GoProfil" component={GoProfil} />
        </GoBottomTab.Navigator>
    );
}



