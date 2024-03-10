import { View, Text, ScrollView,StyleSheet,SafeAreaView, Platform,Image,Animated } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import RentList from '../../components/RentList';
import Waiting from '../../components/Waiting';
import { fetchProperties,} from '../../api/PropertyDb';
import { useNavigation, useRoute } from '@react-navigation/native';
import { Dimensions } from 'react-native';
import Bar from '../../components/Bar';
import SearchBar from '../../components/SearchBar';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ROUTES } from '../../constants';


const All = () => {

  
 
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const navigation = useNavigation()

  const route = useRoute()
  const {type,action,redirect} = route.params;
  const [loading, setLoading] = useState(false);
  const [userType,setUserType] = useState(false)
  const [lang,setLang] = useState(false)
  const [datas, setDatas] = useState([1,2,3,4,5]);

  

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


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

  const getUserType = async()=>{
    const data = await AsyncStorage.getItem('type')
       setUserType(JSON.parse(data))
   }

  const [houses,setHouses] = useState({})
  

  const getHouseList = async (type,action)=>{

    setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:type,
      action:action,
      zone:'',
      quartier:'',
      limit:1
    }

    await fetchProperties(Data)
    .then((response)=>response.json())
    .then((response)=>{
      setHouses(response)
       
      setTimeout(function(){

        setLoading(false)
    
          }, 100);
    })

  }

  const isOdd = (key)=>
   { 
    const num = Object.keys(houses).indexOf(key)
    return num % 2;
  }




  return (
    
    <Animated.View className={"rounded-lg mb-10 bg-white "+topMargin} >
      {redirect==1?navigation.navigate(ROUTES.HOME):''}
  
    {/* search bar */}

    <Bar/>
    
    <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
            
          >
            
      <SearchBar/>


<View>
    
    </View>
             {
             Object.keys(houses).map((key) => {

              return (

                loading?(

                  <Waiting data={datas}/>
  
                ):(

                <RentList title={key} data={houses[key]}  backgd={isOdd(key)?'1':''} types ={type} zone={key} action={action} />
                ) 
              )
            })

            }
            <View className="mt-10"></View>
    </ScrollView>
   

    </Animated.View>
  )
}

export default All

  