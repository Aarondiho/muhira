import React, { useEffect, useState } from 'react';
import {Search,SearchResults,AdminSearch,AdminResults} from '../screens';
import {ROUTES} from '../constants';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Stack = createNativeStackNavigator();

function SearchNavigator() {

  
  const [userType,setUserType] = useState(false)

  const getUserType = async()=>{
    const data = await AsyncStorage.getItem('type')
       setUserType(JSON.parse(data))
   }
   useEffect(()=>{
    getUserType();
  },[]);

  return (
    <Stack.Navigator
      screenOptions={{
        headerShown: false,
      }}
      initialRouteName={userType==2?ROUTES.ADMINSEARCH:ROUTES.SEARCH}>
      <Stack.Screen name={ROUTES.SEARCH} component={Search} />
      <Stack.Screen name={ROUTES.SEARCHRESULTS} component={SearchResults} />
      <Stack.Screen name={ROUTES.ADMINSEARCH} component={AdminSearch} />
      <Stack.Screen name={ROUTES.ADMINRESULTS} component={AdminResults} />
    </Stack.Navigator>
  );
}

export default SearchNavigator;
