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
import { styles } from '../../theme';


const   Quartier2  = () => {

  
  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');
  const [loading, setLoading] = useState(false);
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
  const [lands,setLands] = useState([])
  const [apparts,setApparts] = useState([])

  const navigation = useNavigation
  const route = useRoute()
  const {zone,name_zone} = route.params;
  
  useEffect(()=>{
    getHouseList();
    getUserType();
    getBureauList();
    getLandList();
  },[]);


    useEffect(()=>{
      getHouseList();
      getUserType();
      getBureauList();
      getLandList();
    },[lang]);

  const getHouseList = async ()=>{

setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:1,
      action:'',
      zone:name_zone,
      quartier:'',
      limit:1
    }

    console.log(Data)
    await fetchProperties(Data)
    .then((response)=>response.json())
    .then((response)=>{

      setHouses(response)

      setTimeout(function(){

        setLoading(false)
    
          }, 100);
    })

  }

  const getLandList = async ()=>{

setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:2,
      action:'',
      zone:name_zone,
      quartier:'',
      limit:1
    }

    await fetchProperties(Data)
    .then((response)=>response.json())
    .then((response)=>{

      setLands(response)

      setTimeout(function(){

        setLoading(false)
    
          }, 100);
    })

  }

  const getBureauList = async ()=>{
    setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:3,
      action:'',
      zone:name_zone,
      quartier:'',
      limit:1
    }

    await fetchProperties(Data)
    .then((response)=>response.json())
    .then((response)=>{

      setApparts(response)

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
             <Text className="text-white text-3xl font-bold text-center mb-3" style={{marginTop:20,padding:3}}>{name_zone}</Text>
            </ImageBackground>
            <View>
            <Text style={styles.loginContinueTxt}className="mt-5">Maisons </Text>
            {
             Object.keys(houses).map((key) => {

              return (

                loading?(
              
                  <Waiting data={datas}/>

                  ):(


                houses[key].Message==0?'':

                <RentList title={key} data={houses[key]} page={ROUTES.DETAIL} backgd={isOdd(key)?'1':''} types='1' zone={name_zone} quartier={key}  action='' />
                 
              )
              )
            })

            }
            </View>
            <View>
            <Text style={styles.loginContinueTxt} className="mt-5">Parcelles</Text>
            {
             Object.keys(lands).map((key) => {

              return (

                lands[key].Message==0?'':

                <RentList title={key} data={lands[key]} page={ROUTES.DETAIL} backgd={isOdd(key)?'1':''} types='2' zone={name_zone} quartier={key}  action='' />
                 
              )
            })

            }
            </View>
            <View>
            <Text style={styles.loginContinueTxt} className="mt-5">Magasin &  Bureau </Text>

            {
             

             Object.keys(apparts).map((key) => {
                  
              return (

                apparts[key].Message==0?'':

                <RentList title={key} data={apparts[key]} page={ROUTES.DETAIL} backgd={isOdd(key)?'1':''} types='3' zone={name_zone} quartier={key}  action='' />
                 
              )
            })

            }
            </View>
            <View className="mt-10"></View>
    </ScrollView>
 
    </Animated.View>
  )
}

export default Quartier2

  