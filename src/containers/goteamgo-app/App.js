import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigation, { GoBottomTabStack } from './app/routes/Navigation'

export default function App() {

  return (
    <NavigationContainer>
      <Navigation />
      {/* <GoBottomTabStack/> */}
    </NavigationContainer>
  );

}


