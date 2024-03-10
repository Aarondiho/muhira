import { View, Text, Dimensions } from 'react-native'
import React from 'react'
import * as Progress from 'react-native-progress';
import {  theme } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
const {width, height} =  Dimensions.get('window');

 const Loading = () => {


  return (
    <SafeAreaView style={{height, width}} className="absolute flex-row justify-center items-center">
        <Progress.CircleSnail  thickness={12} size={160} color={theme.background} />
         
    </SafeAreaView >
   
  )
}

export default Loading 