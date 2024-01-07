import { TouchableOpacity,StyleSheet, Text, View,Image } from 'react-native'
import React from 'react'
import { ICONS } from '../constants'

const CenterButton = () => {
  return (
    
    <TouchableOpacity
        style={{
          top:-30,
          justifyContent:'center',
          alignContent:'center',
          marginLeft:20,
          ...styles.shadow
        }}
    >
      <View 
            style={{
              width:70,
              height:70,
            }}>

            <Image source={ICONS.add} style={{width:60,height:60,
              borderRadius:50, }}></Image>

      </View>

    </TouchableOpacity>


  
  )
}

export default CenterButton

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