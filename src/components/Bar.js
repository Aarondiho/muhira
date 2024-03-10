import { View, Text, SafeAreaView, Platform,Image, } from 'react-native'
import React, { useEffect,useState } from 'react'
import { ICONS, ROUTES } from '../constants';
import { styles } from '../theme';
import { StatusBar } from 'expo-status-bar';
import { TouchableOpacity } from 'react-native';
import { BellIcon, UserCircleIcon} from 'react-native-heroicons/outline'
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import Language from './Language';

const Bar = () => {
    const navigation = useNavigation()
    const ios = Platform.OS == 'ios';

    const [iduser,setIduser] = useState()

    useEffect(()=>{
        getId()
      },[]);
    
      const getId = async()=>{
        const data = await AsyncStorage.getItem('id')
           setIduser(JSON.parse(data))
       }


  return (
    <SafeAreaView className={ios? "-mb-2 ": "mb-1"}>
      <StatusBar style="dark" className="bg-neutral-900" />
      <View className="flex-row justify-between items-center mx-4 ">

        <View style={styles.row}>
        <Image source={ICONS.g} style={styles.mr7} ></Image>
        <Text className="text-black text-xl font-bold">MUHIRA</Text>
      </View>

   
      <Language/>
        

        <TouchableOpacity onPress={()=> navigation.navigate(ROUTES.NOTIFICATION)}>
          <BellIcon size="25" strokeWidth={2} color="black" />
        </TouchableOpacity>

        <TouchableOpacity onPress={()=> iduser? navigation.navigate(ROUTES.PROFILE,{iduser:iduser}) : navigation.navigate(ROUTES.LOGIN)}>
          <UserCircleIcon size="25" strokeWidth={2} color="black" />
        </TouchableOpacity>
        
      </View>
    </SafeAreaView>
  )
}

export default Bar