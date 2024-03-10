import { TouchableOpacity,StyleSheet, Text, View,Image,Animated, } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, ICONS, ROUTES } from '../constants'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage'

const CenterButton = () => {
  const [opened,setOpened] = useState(false)
  const animation = useRef(new Animated.Value(0)).current;
  const navigation= useNavigation()

  const [id,setId] = useState(false)
  const getId = async()=>{

    const data = await AsyncStorage.getItem('id')
    setId(data)
}

  useEffect (()=>{

    getId();
  
    Animated.timing(animation,{
      
      toValue:opened? 1 : 0,
      duration:300,
      friction:2,
      useNativeDriver:false,
    }).start();
  },[opened,animation])


  return (

    <View 
    style={{ alignItems: "center",
    flex: 1,
    }}>
    


    <TouchableOpacity
        style={{
          top:-30,
          justifyContent:'center',
          alignContent:'center',
          marginLeft:20,
          ...styles.shadow
        }}

        onPress={() =>{setOpened(!opened);
          id ? navigation.navigate(ROUTES.ADDHOUSE):  navigation.navigate(ROUTES.LOGIN,{add:1})}
          }

    >
      <Animated.View 
            style={[
              styles.AddButtonInner,
              {
                transform: [
                  {
                  rotate:animation.interpolate({
                    inputRange:[0,1],
                    outputRange:['0deg','45deg']
                  })
                },
                ],
              },
            ]}
            >

            <Image source={ICONS.add} style={{width:60,height:60,
              borderRadius:50, }}></Image>

      </Animated.View>

    </TouchableOpacity>
</View>

  
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
        item:{
          position: "absolute",
          top: 5,
          left: 5,
          alignItems: "center",
          justifyContent: "center",
          width: 50,
          height: 50,
          borderRadius: 25,
          overflow:'visible'

        },
        box:{

        },
        AddButtonInner: {
          width:70,
          height:70,
        }

      });