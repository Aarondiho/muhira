import React, { Children } from 'react';
import {StyleSheet, Platform, TouchableOpacity, Image, View, Text} from 'react-native';
import {COLORS, ROUTES,ICONS} from '../constants';
import {useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CenterButton from '../components/CenterButton';
import Search from '../screens/home/Search';
import Sale from '../screens/home/Sale';
import HomeNavigator from './HomeNavigator';
import { Home, Profile, Rent } from '../screens';
import { HomeIcon, HomeModernIcon, KeyIcon, MagnifyingGlassIcon, TagIcon, UserPlusIcon, } from 'react-native-heroicons/outline';
import SearchNavigator from './SearchNavigator';

const Tab = createBottomTabNavigator();

const BottomTabNavigator = () => {

  const navigation = useNavigation();

  
  return (
    <Tab.Navigator
    initialRouteName={HomeNavigator}
    screenOptions={{
      headerShown:false,
      showLabel:false,
      tabBarStyle: {
        position: 'absolute',
        bottom:15,
        left:15,
        right:20,
        elevation:0,
        backgroundColor:'white',
        borderRadius:15,
        height:60,
      
        
  }

  
}}
      
    
    >

<Tab.Screen
        name="ACCEUIL"
        component={HomeNavigator}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <HomeIcon size="30" strokeWidth={2} color="black" />
            </View>
          )
        }}
        />
        <Tab.Screen
        name={ROUTES.SEARCHES}
        component={SearchNavigator}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <MagnifyingGlassIcon size="30" strokeWidth={2} color="black" />
            </View>
          )
        }}
        />

     

      

     

      
 <Tab.Screen
        name="Ajouter"
        component={Home}
        options={{
          tabBarButton: () =>(
            <CenterButton/>
          )
          }}/>

          
    <Tab.Screen
        name="A LOUER"
        component={Rent}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <KeyIcon size="30" strokeWidth={2} color="black" />
            </View>
          )
        }}
        
      />
       <Tab.Screen
        name="A VENDRE"
        component={Sale}
        options={{
          tabBarIcon:({focused})=>(
            <TagIcon size="30" strokeWidth={2} color="black" />
          ),
        }}
        
        
        
      />
  
      
    </Tab.Navigator>
  );
}

export default BottomTabNavigator;

const styles = StyleSheet.create({
  shadow: {
    shadowColor:'#7F5DF0',
    shadowOffset: {
      width:8,
      height:10,

    },
    shadowOpacity:0.25,
    shadowRadius:3.5,
    elevation:0
  },
});
