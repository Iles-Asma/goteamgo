import React from 'react';
import { View } from 'react-native'
import { NavigationContainer } from '@react-navigation/native';
import Navigation from './app/routes/Navigation'
import GoCreateEvent from './app/screens/GoCreateEvent';

export default function App() {

  return (
    <NavigationContainer>
      <Navigation />
    </NavigationContainer>
  );

}


