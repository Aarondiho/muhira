import { StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {Register,Forgot,Login, Detail, Add,EditProperty, Forgot1, ChangePassword, Photo} from '../screens';
import {COLORS, ROUTES} from '../constants';
import BottomTabNavigator from './BottomTabNavigator';
import Add1 from '../screens/home/Add1';
import Add2 from '../screens/home/Add2';


const Stack = createNativeStackNavigator()

const AuthNavigator = () => {
  return (
    <Stack.Navigator screenOptions={{}} initialRouteName={ROUTES.HOME}>
      <Stack.Screen
        name={ROUTES.FORGOT}
        component={Forgot}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.DETAIL} component={Detail} 
      options={{headerShown: false}}/>
      <Stack.Screen name={ROUTES.EDITPROPERTY} component={EditProperty} 
      options={{headerShown: false}}/>

      <Stack.Screen name={ROUTES.ADDHOUSE} component={Add} 
      options={{headerShown: false}}/>

      <Stack.Screen name={ROUTES.ADD1} component={Add1} 
      options={{headerShown: false}}/>
      
      <Stack.Screen name={ROUTES.ADD2} component={Add2} 
      options={{headerShown: false}}/>
      
    
      <Stack.Screen
        name={ROUTES.LOGIN}
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen name={ROUTES.PHOTO} component={Photo}
      options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.REGISTER} component={Register}
      options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.FORGOT1} component={Forgot1}
      options={{headerShown: false}} />
      <Stack.Screen name={ROUTES.CHANGE} component={ChangePassword}
      options={{headerShown: false}} />
      <Stack.Screen
        name={ROUTES.HOME}
        component={BottomTabNavigator}
        options={{headerShown: false}}
      />
    </Stack.Navigator>
  )
}

export default AuthNavigator

const styles = StyleSheet.create({})