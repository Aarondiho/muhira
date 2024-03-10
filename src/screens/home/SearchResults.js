import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import { MapPinIcon, XMarkIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import {  fetchSearchResults,  imgUrl } from '../../api/PropertyDb';
import { StatusBar } from 'expo-status-bar';
import { TouchableWithoutFeedback } from 'react-native';
import AsyncStorage, { useAsyncStorage } from '@react-native-async-storage/async-storage';


const SearchRsults = () => {



  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const route = useRoute()
  const {type ,action,prix ,prix1 ,surface ,surface1,chambre ,salon ,disposition ,carreaux,plafond, province ,commune  , zone  , quartier } = route.params;

  const [results, setResults] = useState([])
  const [lang,setLang] = useState(false)


  const getLanguage = async()=>{
    const data = await useAsyncStorage.getItem('lang')
       setLang(data)
   }


  const ObjectSize = (obj) => {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  

useEffect(()=>{
  handleSearch();
  getLanguage()
},[]);

useEffect(()=>{
  handleSearch();
  getLanguage()
},[lang]);




const handleSearch = async() =>{

    
      
  var Data = {
    type : type, 
    action :action,
    prix : prix,
    prix1 : prix1,
    surface : surface,
    surface1 : surface1,
    chambre : chambre ,
    salon : salon,
    disposition :disposition,
    carreaux:carreaux,
    plafond: plafond, 
    province  :province,
    commune : commune, 
    zone :zone, 
    quartier : quartier,
    
  }

  await fetchSearchResults(Data)
    .then((response)=>response.json())
    .then((response)=>{
      
      setResults(response)
    })

}

  
  return (
    <ScrollView  className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >
<StatusBar style="dark" className="bg-neutral-900" />

    
      
        <SafeAreaView className="bg-neutral-200 flex-1">

        {/* search input */}
        <TouchableOpacity
        onPress={()=>navigation.navigate(ROUTES.SEARCH)}
            className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full mt-10" >
            <Text
                placeholder="Search Movie" 
                style={{color:'lightgray'}} 
                className="pb-1 pl-6 flex-1 text-base font-semibold text-white tracking-wider" 
            >
                      {
                        lang=='ki'?'Rondera...':
                        lang=='sw'? 'Tafuta...':
                        lang=='fr'?'Recherche...':
                        lang=='en'?'Search...':''
                      }
            </Text>
            <View
                className="rounded-full p-3 m-1 bg-neutral-500" 
            >
                <XMarkIcon size="25" color="white" />
                
            </View>
        </TouchableOpacity>

        {/* search results */}
        
              
                    <Text className="text-black font-semibold ml-1 mt-5">
                    {
                        lang=='ki'?'Ivyabonetse':
                        lang=='sw'? 'Matokeo':
                        lang=='fr'?'Resultants':
                        lang=='en'?'Results':''
                      }
                    </Text>
                    <View className="flex-row justify-between flex-wrap">
                        {
                            results.map((item, index)=>{
                                return (
                                    <TouchableWithoutFeedback
                                        key={index} 
                                        onPress={()=>navigation.navigate(ROUTES.DETAIL, item)}>
                                        <View className="space-y-2 mb-4 mt-5 mx-2">

                                        
                                          
                                           
                                            <LinearGradient 
                                                colors={[COLORS.primary, 'black']} 
                                                start={{ x: 0.5, y: 0 }}
                                                end={{ x: 0.5, y: 1 }}
                                                className=" rounded-xl"
                                            >
                                              <View style={styles.rowss}>
                                              <MapPinIcon size="15" strokeWidth={2} color="white" />
                                              <Text className='text-white font-bold '>
                                                  {item.quarter}
                                              </Text>

                                              </View>

                                              <Text className="text-gray-300 ml-1 text-center">
                                              {
                                              item.type == 1 ? 
                                              item.salon==0?lang=='ki'?'Chambrette':
                                                            lang=='sw'? 'Chumba':
                                                            lang=='fr'?'Chambrette':
                                                            lang=='en'?'Room':'':
                                              item.room>1? lang=='ki'?'Ivyumbe '+ item.room +' na Salon '+item.salon>1?item.salon:'':
                                                           lang=='sw'? 'Vyumba ' + item.room +' na Salon '+item.salon>1?item.salon:'':
                                                           lang=='fr'?item.room+' Chambres'+item.salon>1?item.salon+' Salons ':' Salon':
                                                           lang=='en'?item.room+' Rooms'+item.salon>1?item.salon+' Living Rooms ':' Living Room':'': 
                                                           lang=='ki'?'Icumba '+  item.room+' na Salon '+item.salon>1?item.salon:'':
                                                           lang=='sw'? 'Cumba ' +  item.room+' na Salon '+item.salon>1?item.salon:'':
                                                           lang=='fr'?item.room+' Chambre'+item.salon>1?item.salon+' Salons ':' Salon':
                                                           lang=='en'?item.room+' Room'+item.salon>1?item.salon+' Living Rooms ':' Living Room':'':
                                              item.type == 2 ? 'Are':
                                                                lang=='ki'?"Hasi":
                                                                lang=='sw'?'Sakafu':
                                                                lang=='fr'?"Au sol":
                                                                lang=='en'?"Floor":'' 
                                              }
                                            </Text>
                                          </LinearGradient>
                                          <Image 
                                                source={{uri: imgUrl+item.img}} 
                                                // source={require('../assets/images/moviePoster2.png')}
                                                className="rounded-3xl" 
                                                style={{ width: width*0.44, height: height*0.3}} 
                                            />
                                        </View>
                                    </TouchableWithoutFeedback>
                                )
                            })
                        }
                    </View>
                    <View style={{marginBottom:50}}></View>
                    
               
            
        
    </SafeAreaView>


</ScrollView>
  )
}

export default SearchRsults

