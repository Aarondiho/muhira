import { View, Text, ScrollView,SafeAreaView, Platform,Dimensions } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, ICONS, ROUTES } from '../constants';
import { styles } from '../theme';
import { TouchableOpacity } from 'react-native';
import { MagnifyingGlassIcon,  } from 'react-native-heroicons/outline'
import { ImageBackground } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLogout } from '../api/PropertyDb';
import { LinearGradient } from 'expo-linear-gradient';

const SearchBar = () => {

const navigation = useNavigation();

  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  
  const [loading, setLoading] = useState(false);

  const [iduser,setIduser] = useState(false)
  const [userType,setUserType] = useState(false)

  const [lang,setLang] = useState(false)
  

  useEffect(()=>{
      getId();
      getUserType();
      getLanguage()
    },[]); 
  
    const getLanguage = async()=>{
      const data = await AsyncStorage.getItem('lang')
         setLang(data)
     }
    const getId = async()=>{
      const data = await AsyncStorage.getItem('id')
         setIduser(JSON.parse(data))
     }

     const getUserType = async()=>{
      const data = await AsyncStorage.getItem('type')
         setUserType(JSON.parse(data))
     }

     const logout = async () => {

      setLoading(true)
      const keys = [
        'id',
        'nom', 
        'prenom',
        'email',
        'phone',
        'phone1',
        'whatsapp',
        'type'
      ]

    const Data = {
                  id:iduser
                  }
      
        setLoading(true);
      
        await fetchLogout(Data)
        .then((response)=>response.json())
        .then((response)=>{

          console.log(response)

          if(response[0].Message == 1 ){

            AsyncStorage.multiRemove(keys)
            setIduser(false)
            navigation.navigate(ROUTES.LOGIN,{add:2})

          }
      })
      
    
    }

    

  return (
    <ImageBackground source={ICONS.bgins} resizeMode="cover" >

          <View style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal:10,
                }}>

           
            
          <View 
                className="mx-4 mb-3 flex-row justify-between items-center border border-neutral-500 rounded-full mt-3  bg-neutral-100" 
                style={{width:width*0.45}}>
              
                <TouchableOpacity style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  paddingHorizontal:10,
                  height: height*0.06,
                }}
                    onPress={()=> userType==2?navigation.navigate(ROUTES.ADMINSEARCH):navigation.navigate(ROUTES.SEARCHES)}
                    
                > 
                <Text
                    className="p-2 text-black text-base font-semibold tracking-wider" >

                      {
                        lang=='ki'?'Rondera...':
                        lang=='sw'? 'Tafuta...':
                        lang=='fr'?'Recherche...':
                        lang=='en'?'Search...':''
                      }
                      
                    </Text>
                <View className="rounded-full p-1  bg-white">
                    <MagnifyingGlassIcon size="25" color={COLORS.primary}  />
                </View>
                    
                </TouchableOpacity>

            </View>
        {iduser?(
            <SafeAreaView className={"flex-row justify-between items-center px-1 "}>
                
                    <TouchableOpacity className="p-1 mr-4" >
                    <Text className="text-white"></Text>
                    </TouchableOpacity>
    
                    <TouchableOpacity style={styles.background}
                    onPress={logout} className="rounded-lg p-1">
                      <Text className="text-white"> 
                      {lang=='ki'?'Sohoka':lang=='sw'? 'Kutoka':lang=='fr'?'Déconnexion':lang=='en'?'Log out':''}
                     </Text>
                    </TouchableOpacity>
                </SafeAreaView>
                ):(
                <SafeAreaView className={"flex-row justify-between items-center px-1 "}>
                 

                    <TouchableOpacity style={{backgroundColor:'white'}}  className="rounded-lg p-1 mr-3" onPress={()=> navigation.navigate(ROUTES.REGISTER)}>
                    <Text style={COLORS.primary}>
                    
                    { 
                        lang=='ki'?"Iyandikishe":
                        lang=='sw'? 'Jisajili':
                        lang=='fr'?"S'inscrire":
                        lang=='en'?'Sign up':''}
                     
                    </Text>
                    </TouchableOpacity>

                    <LinearGradient
                        colors={['#1D8E3E',COLORS.gradientForm]}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className=" rounded-lg"
                    >
                    <TouchableOpacity className="rounded-lg p-1" onPress={()=> navigation.navigate(ROUTES.LOGIN,{add:0})}>
                    <Text  className="text-white">
                    {
                      lang=='ki'?"Kwinjira":
                      lang=='sw'? "Kuingiya":
                      lang=='fr'?"Se connecter":
                      lang=='en'?"Log in":""}
                    
                    </Text>
                    </TouchableOpacity>
                    </LinearGradient>
                
            </SafeAreaView>
            )}
            </View>

          </ImageBackground>
  )
}

export default SearchBar
