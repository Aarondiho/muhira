import { View, Text, TextInput,ActivityIndicator, TouchableOpacity,SafeAreaView, Image, ScrollView, TouchableWithoutFeedback, Dimensions, Platform } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import { ChevronLeftIcon,CloudArrowDownIcon,TrashIcon,CameraIcon,FolderIcon, CloudArrowUpIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import { FlatList } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';




export default function Notification() {

    const ios = Platform.OS == 'ios';
    const topMargin = ios? '':' mt-6';

    const {width, height} =  Dimensions.get('window');

    const navigation = useNavigation();
    const [loading, setLoading] = useState(false);
    const [results, setResults] = useState([1,2,3,4,5,6,7,8,9,10])

    const [lang,setLang] = useState(false)

  const [datas, setDatas] = useState([1,2,3,4,5]);


  
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

   useEffect(()=>{

    getLanguage()

   
 },[]);

    
    
    const renderItem =({item})=>{

    
  
    return(
      <View style={{flexDirection:'row',margin:1,alignItems:'center',gap:2}}>
        
        <Text className=" text-black mb-3 bg-neutral-50 rounded-lg mx-4 my-4  p-6 ">
                  
                  Nyaragasa uyifotore uyandikishe ngaha abandi bataragutanga,  
                  kuko turiha  20% kunzu  yo gupanga na 5% kunzu canke parasera igurishwa
                  abakiriya bacu bakiyishima,  abavyandikishije ngaha gusa. Aba kiriya bacu ni benshi kuburyo
                 tubura nivyo tubaha.
                  </Text>
       
  
      </View>
  
    )
  
  }
    
  
  
    
    return (
      <ScrollView className={"rounded-lg mb-10 bg-white "+topMargin}
      showsVerticalScrollIndicator={false} 
      contentContainerStyle={{marginBottom:10}}
    >
  
        {loading? (
            <View 
            >
             
  
            </View>
  
          ):(
  
            <View>
        
      {/* search bar */}
  
      <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-1 "+topMargin}>
              <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 " onPress={()=> navigation.goBack()}>
                  <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
              </TouchableOpacity>
  
              <TouchableOpacity>
                
                </TouchableOpacity>
          </SafeAreaView>
      
          <View>  
              <Image
                 
                  source={ICONS.house9}
                  style={{width, height: height*0.25,borderBottomRightRadius:30,borderBottomLeftRadius:30}} 
              />
  
              
             
           
      <View  className="rounded-lg mx-2 mb-10 bg-white "
              
              Style={{marginBottom:10,marginTop:-20}}
            >
              
              {/*Formulaire List*/}
              <SafeAreaView className={"block  shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
            
  
          <FlatList data={results} renderItem={renderItem}/>
          
  
         
  
       
      </SafeAreaView> 
  
  
      </View>
      
     
  
        </View>
        </View>
        )
          }
        
  
  </ScrollView>
    )

}
