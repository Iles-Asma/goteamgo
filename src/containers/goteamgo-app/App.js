import React from 'react';
import 'react-native-gesture-handler';
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/routes/Navigation'

export default function App() {

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );

}


