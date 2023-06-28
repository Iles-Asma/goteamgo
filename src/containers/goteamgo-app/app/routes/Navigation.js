<<<<<<< HEAD
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

=======
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import GoAccess from '../screens/GoAccess';
>>>>>>> 9812305 (login navigation)
import GoLogin from '../screens/GoLogin'
import GoSignup from '../screens/GoSignup'

const Stack = createNativeStackNavigator();

<<<<<<< HEAD
export default function Navigation() {
    return (
        <Stack.Navigator initialRouteName="GoLogin" screenOptions={{ headerShown: false }}>
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="GoSignup" component={GoSignup} />
        </Stack.Navigator>
    );
}
=======
export default function AcessStack() {

    return (
        <Stack.Navigator screenOptions={{ headerShown: true }}>
            <Stack.Screen name="Access" component={GoAccess} />
            <Stack.Screen name="GoLogin" component={GoLogin} />
            <Stack.Screen name="GoSignup" component={GoSignup} />
        </Stack.Navigator>

    )

}

>>>>>>> 9812305 (login navigation)
