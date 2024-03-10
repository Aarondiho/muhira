import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function App() {

  AsyncStorage.setItem('lang','ki');
   // isAuthenticated = is...
   return (
    <NavigationContainer>
      {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
      <AuthNavigator />
    </NavigationContainer>
  );
}

