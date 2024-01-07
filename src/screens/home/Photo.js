import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform,Linking,Button  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { PhoneIcon, ChevronLeftIcon, CurrencyDollarIcon, CameraIcon, TrashIcon, } from 'react-native-heroicons/outline';
import { CubeIcon, HeartIcon, HomeIcon, KeyIcon, MapPinIcon, PencilIcon, StopIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../../theme';
import { COLORS, ICONS, ROUTES } from '../../constants';
import PhotoList from '../../components/PhotoList';
import { fetchDelete, fetchGalery, fetchOccupied, fetchSimilar, imgUrl } from '../../api/PropertyDb';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import Waiting from '../../components/Waiting';
import RentList from '../../components/RentList';

const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
const verticalMargin = ios? '':' my-3';
var {width, height} = Dimensions.get('window');


const Photo = () => {


  const navigation = useNavigation();
  


    const route = useRoute()
    const {imgPath} = route.params;

 
  return (
    
 
    <ScrollView 
        contentContainerStyle={{paddingBottom: 20}} >
        
      
        

      {/* back button and movie poster */}
      <View className="w-full">

        
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}}
             className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity >
              
            </TouchableOpacity>
        </SafeAreaView>

       
    
                <View>  
                    <Image 
                       
                        source={{uri: imgPath}} 
                        style={{width, height}} 
                    />
                    
             
                </View>
     
 </View>
    

    </ScrollView>


    
  )
}

export default Photo