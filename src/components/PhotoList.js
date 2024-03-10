import { View, Text, Image, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React, { useEffect, useState } from 'react'
import Carousel from 'react-native-snap-carousel';
import { useNavigation } from '@react-navigation/native';
import { LinearGradient } from 'expo-linear-gradient';
import { styles } from '../theme';
import { SafeAreaView } from 'react-native-safe-area-context';
import { TouchableOpacity } from 'react-native';
import {  imgUrl } from '../api/PropertyDb';
import {MapPinIcon} from 'react-native-heroicons/outline'
import { ICONS, ROUTES,  COLORS } from '../constants';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';



const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');



const currencyFormat= (num) => {
  return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
}

const PhotoList = ({data,title}) => {


 
  const navigation = useNavigation();

  
  const [lang,setLang] = useState(false)

    const getLanguage = async()=>{
     const data = await AsyncStorage.getItem('lang')
        setLang(data)
    }

    useEffect(()=>{
      getLanguage()
    },[]);
  

  const handleClick = (imgPath)=>{
    navigation.push(ROUTES.PHOTO, {imgPath:imgPath});
          }

   
    

  return (
    <ImageBackground source={ICONS.backgdi} resizeMode="cover" >
    <View className={"mb-8 "} >
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-xl mx-4 mb-5 font-bold mt-7" style={{color:COLORS.primary}}>
                {title}
           </Text>
     
           
         
      
      </View>

    
    <Carousel
          data={data}
          renderItem={

            ({item})=> <RentCard handleClick={handleClick}  item={item} />
          
          }
          firstItem={1}
          inactiveSlideOpacity={0.60}
          sliderWidth={width}
          itemWidth={width*0.62}
          slideStyle={{display: 'flex', alignItems: 'center'}}
          
      />
       <View className="mx-4 flex-row justify-between  items-center">
        <Text className="text-black text-xl mx-4 mb-5  font-bold"></Text>
     
            <TouchableOpacity>
              <Text style={styles.text} className="text-lg font-bold"></Text>
            </TouchableOpacity>
         
      
      </View>
  </View>
  </ImageBackground>
)
}

export default PhotoList

const RentCard = ({item,handleClick})=>{

  const imgPath= imgUrl+item.img


  
  const [lang,setLang] = useState(false)

    const getLanguage = async()=>{
     const data = await AsyncStorage.getItem('lang')
        setLang(data)
    }

    useEffect(()=>{
      getLanguage()
    },[]);
  

  

  


  return (

   
      <TouchableWithoutFeedback onPress={()=> handleClick(imgPath)} >
        
          {item.Message == 0?(
            <View>
        <SafeAreaView style={{marginTop:70}} className="absolute z-20 w-full flex-row justify-between items-center mt-100 px-4 ">
        <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 1)']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-xl"
                        style={{textAlign: 'center',
                        justifyContent: 'center',
                        alignItems: 'center',
                        width: '100%',}}
                    >
                      <View >
                      <Text className='text-white  font-bold text-3xl text-center'>
                      {
                          lang=='ki'?"ntazindi foto":
                          lang=='sw'? 'Hakuna':
                          lang=='fr'?"No Photos":
                          lang=='en'?" No Photos":''

                        }
                      </Text>

                      </View>
            </LinearGradient>

            
        </SafeAreaView> 
              <Image  
              source={ICONS.norecord} 

              style={{
                  width: width * 0.6,
                  height: height * 0.4
              }}
              className="rounded-3xl" 
          />
            </View>
          ):(
            <View>
          
        
        
          <Image  
              source={{uri: imgPath}} 

              style={{
                  width: width * 0.6,
                  height: height * 0.4
              }}
              className="rounded-3xl" 
          />
          
          
        
                   
          </View>
          )} 
          
      </TouchableWithoutFeedback>
  )
}
                     
