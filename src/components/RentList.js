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

const RentList = ({data,title,backgd,types,action,zone,quartier,room,hideSeeAll,titi}) => {
 
  const navigation = useNavigation();

  
  const [lang,setLang] = useState(false)

    const getLanguage = async()=>{
     const data = await AsyncStorage.getItem('lang')
        setLang(data)
    }

    useEffect(()=>{
      getLanguage()
    },[]);
  




  const nextPageAll =()=>{

   navigation.navigate(ROUTES.ALL,{type:types,action:action,redirect:''})

  }

  const nextPageZone =()=>{
 
   const zoneRoute = navigation.navigate(ROUTES.ZONE,{type:types,action:action,zone:zone})
 
   }

   const nextPageQuarter =()=>{
    
    const zoneRoute = navigation.navigate(ROUTES.QUARTIER,{type:types,action:action,quartier:quartier})
  
    }


  const handleClick = (item)=>{
    navigation.push(ROUTES.DETAIL, item);
          }

   
    

  return (
    <ImageBackground source={backgd? ICONS.bgins:ICONS.backgdi} resizeMode="cover" >
    <View className={"mb-8 "} style={backgd}>
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-xl mx-4 mb-5 font-bold mt-7" style={backgd?{color:'white'} : {color:COLORS.black}}>
          {
            types == 3? currencyFormat(title): title}
            {
              room?types ==2?' Are':
               types == 3?
                lang=='ki'?' Igiciro ':
                lang=='sw'? ' Bei':
                lang=='fr'?' Prix':
                lang=='en'?' Price':''
              :
                lang=='ki'?' Ivyumbe ':
                lang=='sw'? ' Vyumba ':
                lang=='fr'?' Chambres':
                lang=='en'?' Rooms':'':''
              }  
            {
              titi==1?lang=='ki'?"Inzu":
                      lang=='sw'? 'Nyumba':
                      lang=='fr'?"Maison":
                      lang=='en'?"House":''
              :
               titi==2?lang=='ki'?"Parasera":
                       lang=='sw'? "Parcelle":
                       lang=='fr'?"Parcelle":
                       lang=='en'?"Plot":''
               
               :
               titi==3?lang=='ki'?"Imangazini & Ibiro":
                      lang=='sw'? "Duka & Ofisi":
                      lang=='fr'?"Magasin & Bureau":
                      lang=='en'?"Shop & Office":''
                      :''
            }</Text>
     
            <TouchableOpacity onPress={ zone? quartier?nextPageQuarter : nextPageZone : nextPageAll}>
              <Text style={{color:'red'}} className="text-sm font-bold"> 
              {
                  hideSeeAll?'':
                    lang=='ki'?"Raba Zose":
                    lang=='sw'? "Angalia Zote":
                    lang=='fr'?"Voir Tous":
                    lang=='en'?"See All":''
              }
              </Text>
            </TouchableOpacity>
         
      
      </View>

    
    <Carousel
          data={data}
          key={data}
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

export default RentList

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

   
      <TouchableWithoutFeedback onPress={()=> handleClick(item)} >
        
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
                          lang=='ki'?"zarafashwe zose ":
                          lang=='sw'? 'zisha banwa':
                          lang=='fr'?"Tous deja prise":
                          lang=='en'?" Already taken":''

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
          
        <SafeAreaView style={{marginTop:-10}} className={"absolute z-20 w-full flex-row justify-between items-center px-2 -mt-30 "+topMargin}>
              <LinearGradient 
                        colors={['transparent', 'rgba(23, 23, 23, 1)']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-sm"
                    >
                      <View style={styles.rows}>
                      <MapPinIcon size="15" strokeWidth={2} color="white" />
                      <Text className=' font-bold ' style={{color:'white'}}>
                           {item.name_quart}
                      </Text>

                      </View>
            </LinearGradient>
             <LinearGradient 
                        colors={['#38AAA4', item.action==1?COLORS.gradientForm:'red']} 
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-lg"
                    >
                      <View style={styles.rows}>
                      <Text className='font-bold text-white' >
                      {
                      
                        item.action==1?
                          lang=='ki'?"panga":
                          lang=='sw'? 'kodisha':
                          lang=='fr'?"A louer":
                          lang=='en'?"For rent":''
                          :
                          lang=='ki'?"gura":
                          lang=='sw'? 'Uza':
                          lang=='fr'?"A vendre":
                          lang=='en'?"For sale":''

                      }
                      </Text>

                      </View>
            </LinearGradient>

            
            
        </SafeAreaView> 
        
          <Image  
              source={{uri: imgPath}} 

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

                        <View className="border-r-2 border-r-neutral-400 px-1 items-center" style={item.type==1?{width:'40%'}:{width:'50%'}}>
                        
                        <Text className="text-white font-semibold text-xs text-center ">
                            { currencyFormat(item.price)} {item.currency==1?' F':' $ '}
                            </Text>
                        </View>
                        <View className={ item.type==1?"border-r-2 border-r-neutral-400 ":"" +" items-center "} style={item.type==1?{width:'35%'}:{width:'50%'}}>
                            
                            <Text className="text-neutral-300 font-semibold text-xs text-white text-center ">
                            {
                              item.type == 1 ? item.room == 1 & item.salon == 0? 
                                lang=='en'?'Room':'Chambrette':
                              item.salon+
                                lang=='ki'?' Ivyumbe ':
                                lang=='sw'? ' Vyumba ':
                                lang=='fr'?' Chambres':
                                lang=='en'?' Rooms':'' :
                              item.type == 2 ?item.are+" Are " : 
                              item.floor == 1? 
                              
                                lang=='ki'?"Isima":
                                lang=='sw'?'Ciment':
                                lang=='fr'?"Ciment":
                                lang=='en'?"Cement":''
                        
                               : 
                               lang=='ki'?"Ikaro":
                               lang=='sw'?'Carreaux':
                               lang=='fr'?"Carreaux":
                               lang=='en'?"Tiles":''
                            } 
                            </Text>
                        </View>
                        
                        {item.type==1?(

                        <View className=" items-center" style={{width:'25%'}}>
                          
                            <Text className="text-neutral-300 font-semibold text-xs text-white text-center ">
                            {
                              item.type == 1 ? item.floor == 1?  
                                 lang=='ki'?"Isima":
                                 lang=='sw'?'Ciment':
                                 lang=='fr'?"Ciment":
                                 lang=='en'?"Cement":''
                         
                                : 
                                lang=='ki'?"Ikaro":
                                lang=='sw'?'Carreaux':
                                lang=='fr'?"Carreaux":
                                lang=='en'?"Tiles":''
                                 :''
                            } 
                            </Text>
                        </View>

                        ):''}
                    </View>
                        
                        
                    </LinearGradient>
                   
          </View>
          )} 
          
      </TouchableWithoutFeedback>
  )
}