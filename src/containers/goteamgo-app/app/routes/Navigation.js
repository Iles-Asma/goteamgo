import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoLogin from '../screens/GoLogin'
import GoSignup from '../screens/GoSignup'

const Stack = createNativeStackNavigator();

export default function Navigation() {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name="Access" component={GoAccess} />
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="GoSignup" component={GoSignup} />
        </Stack.Navigator>
    );
}
