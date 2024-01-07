import React, { Children } from 'react';
import {StyleSheet, Platform, TouchableOpacity, Image, View, Text} from 'react-native';
import {COLORS, ROUTES,ICONS} from '../constants';
import {Home, Wallet, Notifications, Settings, Login, Register} from '../screens';
import SettingsNavigator from './SettingsNavigator';
import {useNavigation} from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import CenterButton from '../components/CenterButton';

const Tab = createBottomTabNavigator();

const customTabBarButton = ({children,onPress})=>{
    <TouchableOpacity
    style={{
      top:-10,
      justifyContent:'center',
      alignContent:'center',
      ...styles.shadow
    }}
    onPress={onPress}>
      <View 
      style={{
        width:70,
        height:70,
        borderRadius:35, 
      }}>
        {children}

      </View>

    </TouchableOpacity>


  }

const BottomTabNavigator = () => {

  const navigation = useNavigation();

  
  return (
    <Tab.Navigator
    screenOptions={{
      headerShown:false,
      showLabel:false,
      tabBarStyle: {
        position: 'absolute',
        bottom:25,
        left:20,
        right:20,
        elevation:0,
        backgroundColor:'#64A30A',
        borderRadius:15,
        height:70,
      
        
  }

  
}}
      
    
    >
      
      <Tab.Screen
        name="A LOUER"
        component={Wallet}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <Image source={ICONS.rent} style={{width:40,height:40,borderRadius:10}}></Image>
            </View>
          )
        }}
        
      />
       
       <Tab.Screen
        name="A VENDREs"
        component={Login}
        options={{
          tabBarIcon:({focused})=>(
            <Image source={ICONS.sale} style={{width:40,height:40,borderRadius:10}}></Image>
          ),
        }}
        
        
        
      />
      <Tab.Screen
        name="Ajouter"
        component={Register}
        options={{
          
          tabBarButton: () =>(
            <CenterButton/>
          )
          }}/>

    <Tab.Screen
        name="Recherche"
        component={Home}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <Image source={ICONS.sa} style={{width:40,height:40,borderRadius:10}}></Image>
            </View>
          )
        }}
        />
      <Tab.Screen
        name="Para"
        component={SettingsNavigator}
        options={{
          tabBarIcon:({focused})=>(
            <View style={{alignContent:'center',justifyContent:'center'}}>
            <Image source={ICONS.settings} style={{width:40,height:40,borderRadius:10}}></Image>
            </View>
          )
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
