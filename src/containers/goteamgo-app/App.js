import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import Navigation, { GoBottomTabStack } from './app/routes/Navigation'
import Navigator from './app/routes/Navigation'

import GoEvent from './app/screens/GoEvent';

export default function App() {

  return (
    <NavigationContainer>
      {/* <Navigation /> */}
      {/* <GoBottomTabStack /> */}
      <GoEvent />
    </NavigationContainer>
  );

}


