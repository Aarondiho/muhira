import { View, Text, ScrollView,Dimensions,SafeAreaView, Platform,Image,Animated } from 'react-native'
import React, { useEffect, useState } from 'react'
import RentList from '../../components/RentList';
import { ICONS, ROUTES } from '../../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Waiting from '../../components/Waiting';
import { fetchProperties} from '../../api/PropertyDb';
import { useNavigation, useRoute } from '@react-navigation/native';
import { ImageBackground } from 'react-native';
import Bar from '../../components/Bar';
import SearchBar from '../../components/SearchBar';


const   Quartier  = () => {

  
  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');
  const [loading, setLoading] = useState(true);
  const [userType,setUserType] = useState(false)
  const [lang,setLang] = useState(false)
  const [datas, setDatas] = useState([1,2,3,4,5]);


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

  const getUserType = async()=>{
    const data = await AsyncStorage.getItem('type')
       setUserType(JSON.parse(data))
   }
  const [houses,setHouses] = useState({})

  const navigation = useNavigation
  const route = useRoute()
  const {type,action,quartier} = route.params;
  
  useEffect(()=>{
    getHouseList(type,action);
    getUserType();
    getLanguage()
  },[]);

    useEffect(()=>{
      getHouseList(type,action);
      getUserType();
      getLanguage()
    },[lang]);

  const getHouseList = async (type,action)=>{

    Data ={
      userType:userType?userType:1,
      type:type,
      action:action,
      zone:'',
      quartier:quartier,
      limit:1
    }

    await fetchProperties(Data)
    .then((response)=>response.json())
    .then((response)=>{
      setHouses(response)
    })

  }

  const isOdd = (key)=>
   { 
    const num = Object.keys(houses).indexOf(key)
    return num % 2;
  }



  setTimeout(function(){

    setLoading(false)

      }, 1000);


  return (
    
    <Animated.View className={"rounded-lg mb-10 bg-white "+topMargin} >

    
    {/* search bar */}

    <Bar/>
    

    <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
            
          >
            
      <SearchBar/>


<View>
    
    </View>
     
            <ImageBackground source={ICONS.bgins} resizeMode="cover">
             <Text className="text-white text-3xl font-bold text-center mb-3" style={{marginTop:20,padding:3}}>{quartier}</Text>
            </ImageBackground>
            {
              loading?(
              
              <Waiting data={datas}/>

              ):(
             
                  Object.keys(houses).map((key) => {

                    return (

                     

                      <RentList title={key} data={houses[key]} page={ROUTES.DETAIL} backgd={isOdd(key)?'1':''} types={type} zone={quartier}  room='1' hideSeeAll='1' action={action} />
                      
                    )
                    
                  })
                )

            }
            <View className="mt-10"></View>
    </ScrollView>
  

    </Animated.View>
  )
}

export default Quartier

  