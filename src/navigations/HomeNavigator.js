import React from 'react';
import {Home, Zone,All,Profile,Quartier} from '../screens';
import {ROUTES} from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import Notification from '../screens/home/Notification';
import Quartier2 from '../screens/home/Quartier2';


const Stack = createNativeStackNavigator();

function HomeNavigator() {
  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={ROUTES.HOME_TAB}>
      <Stack.Screen name={ROUTES.HOME_TAB} component={Home} />
      <Stack.Screen name={ROUTES.ALL} component={All} />
      <Stack.Screen name={ROUTES.ZONE} component={Zone} />
      <Stack.Screen name={ROUTES.QUARTIER} component={Quartier} />
      <Stack.Screen name={ROUTES.QUARTIER2} component={Quartier2} />
      <Stack.Screen name={ROUTES.PROFILE} component={Profile} />
      <Stack.Screen name={ROUTES.NOTIFICATION} component={Notification} />
    </Stack.Navigator>
  );
}

export default HomeNavigator;
