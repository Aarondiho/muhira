import { View, ImageBackground , Image, TouchableWithoutFeedback, Dimensions,Text, Platform } from 'react-native'
import React, { useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import {MapPinIcon,} from 'react-native-heroicons/outline'
import { ICONS} from '../constants';



const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');



const Waiting = ({data}) => {
 
  const navigation = useNavigation();

  return (
    <ImageBackground source={ICONS.backgdi} resizeMode="cover" >
    <View className='mt-6 mb-6' >
      

    
    <Carousel
          data={data}
          renderItem={

            ({item})=> <RentCard item={item} />
          
          }
          firstItem={1}
          inactiveSlideOpacity={0.60}
          sliderWidth={width}
          itemWidth={width*0.62}
          slideStyle={{display: 'flex', alignItems: 'center'}}
          
      />
       <View className="mx-4 flex-row justify-between  items-center">
        <ImageBackground   source={ICONS.bgins} resizeMode="cover"
        className="text-black text-xl mx-4 mb-5  font-bold"></ImageBackground >
     
            <TouchableOpacity>
              <ImageBackground   source={ICONS.bgins} resizeMode="cover"
              style={styles.text} className="text-lg font-bold"></ImageBackground >
            </TouchableOpacity>
         
      
      </View>
  </View>
  </ImageBackground>
)
}

export default Waiting

const RentCard = ({item})=>{
  

  return (

   
      <TouchableWithoutFeedback  >
        
          
            <View>
          
        <SafeAreaView style={{marginTop:-10}} className={"absolute z-20 w-full flex-row justify-between items-center px-2 -mt-30"+topMargin}>
              <LinearGradient 
                        colors={['transparent', 'grey']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-lg"
                    >
                      <View style={styles.rows}>
                      <MapPinIcon size="15" strokeWidth={2} color="white" />
                      <ImageBackground  source={ICONS.bgins} resizeMode="cover"
                      className=' font-bold' style={{color:'white',width:80}}>
                      </ImageBackground >

                      </View>
            </LinearGradient>
            <LinearGradient 
                        colors={['transparent', 'grey']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-lg"
                    >
                      <View style={styles.rows}>
                      <Text className='font-bold text-white' style={{width:40,marginLeft:10}}>
                      </Text>

                      </View>
            </LinearGradient>

            
            
        </SafeAreaView> 
        
          <Image  
              source={ICONS.bck} 

              style={{
                  width: width * 0.6,
                  height: height * 0.4
              }}
              className="rounded-3xl" 
          />
          
          
          <LinearGradient 
                        colors={['transparent','grey']} 
                        style={{width:width * 0.6, height: height*0.084}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0 rounded-b-3xl"
                    >
                      
                    <View className="-mx-5 p-5 flex-row justify-between items-center  rounded-full ">

                        <View className="border-r-2 border-r-neutral-400 px-1 items-center" style={{width:'50%'}}>
                        
                        <ImageBackground source={ICONS.bgins} resizeMode="cover"
                         className="text-white font-semibold text-xs text-center ">
                            </ImageBackground >
                        </View>
                        <View className={ item.type==1?"border-r-2 border-r-neutral-400 ":"" +" items-center "} style={{width:'50%'}}>
                            
                            <ImageBackground  source={ICONS.bgins} resizeMode="cover"
                            className="text-neutral-300 font-semibold text-xs text-white text-center ">
                            </ImageBackground >
                        </View>
                        
                     

                        <View className=" items-center" style={{width:'25%'}}>
                          
                            <ImageBackground source={ICONS.bgins} resizeMode="cover"
                             className="text-neutral-300 font-semibold text-xs text-white text-center ">
                             
                            </ImageBackground >
                        </View>

                        
                    </View>
                        
                        
                    </LinearGradient>
                   
          </View>
       
          
      </TouchableWithoutFeedback>
  )
}