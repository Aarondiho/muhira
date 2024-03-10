import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, ICONS} from '../../constants';
import { styles } from '../../theme';
import {  ChevronLeftIcon, PencilIcon, PhoneIcon, TrashIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';
import RentList from '../../components/RentList';
import { fetchDeleteUser, fetchMyProperty } from '../../api/PropertyDb';
import { Phone } from 'react-native-feather';


const Profile = () => {



  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const route = useRoute()

  const {iduser} = route.params
  const [fname,setFname] = useState('')
  const [lname,setLname] = useState('')
  const [phone,setPhone] = useState('')
  const [phone1,setPhone1] = useState('')

  const [houses,setHouses] = useState({})

  const [lang,setLang] = useState(false)
  const [datas, setDatas] = useState([1,2,3,4,5]);


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

  useEffect(()=>{
  
    getFname()
    getLname()
    getPhone()
    getPhone1()
    getHouseList(iduser)
    getLanguage()
    
    },[])

    useEffect(()=>{

        getFname()
        getLname()
        getPhone()
        getPhone1()
        getHouseList(iduser)
        getLanguage()

        },[lang])
      

  
const getFname= async()=>{

    const data = await AsyncStorage.getItem('prenom')
    setFname(data)
}
const getLname= async()=>{

  const data = await AsyncStorage.getItem('nom')
  setLname(data)
}


const getPhone= async()=>{

  const data = await AsyncStorage.getItem('phone')
  setPhone(JSON.parse(data))
}
const getPhone1= async()=>{

const data = await AsyncStorage.getItem('phone1')
setPhone1(JSON.parse(data))
}



const getHouseList = async (id)=>{

  Data ={
    iduser:id,
  }
console.log(iduser)

  await fetchMyProperty(Data)
  .then((response)=>response.json())
  .then((response)=>{
    console.log(response)
    setHouses(response)
  })

}

const isOdd = (key)=>
{ 
 const num = Object.keys(houses).indexOf(key)
 return num % 2;
}

const handleDelete = async()=>{

  Data = {
          id:iduser
        }

  fetchDeleteUser(Data)
      .then((response)=>response.json())
      .then((response)=>{
      setLoading(false)
      
      if(response[0].Message == 1){
          alert('Supprime avec Succes')
      }

      })
}
 

  
  return (
    <ScrollView   className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >
      
      <StatusBar style="dark" className="bg-neutral-900" />
      
    {/* search bar */}

    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 " onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                
            </TouchableOpacity>
        </SafeAreaView>
    
        <View>  
            <Image
               
                source={ICONS.house6}
                style={{width, height: height*0.50,borderBottomRightRadius:30,borderBottomLeftRadius:30}} 
            />

    <View className="rounded-lg mx-4 mb-10 bg-white  " style={{marginTop:-200}}>
      <View style={styles.row}>
          <Image source={ICONS.agent}
          style={{height: height*0.1, width: width*0.2}}
          className="rounded-full"/>
          <Text className="text-xl text-center text-bold p-2 " >{fname} {lname}</Text>
          
    </View>
    {phone?(
      <View style={styles.row}>

        <PhoneIcon size={20} strokeWidth={2} color={COLORS.primary}/>  

        <Text className="text-xl text-center text-bold p-2 " >{phone}</Text>
    </View>
  ):''}

  {phone1?(
    <View style={styles.row}>

      <PhoneIcon size={20} strokeWidth={2} color={COLORS.primary}/>  

      <Text className="text-xl text-center text-bold p-2 " >{phone1}</Text>
    </View>
    ):''}

    </View>
            
           
         
    <View  
        className="rounded-lg mx-1 mb-10 bg-white  "
        style={{marginTop:-20}}
    >

<SafeAreaView className="rounded-lg mx-4 p-4  bg-neutral-50  dark:bg-neutral-700 ">
    

<View style={styles.rows}>

<TouchableOpacity

    onPress={()=>{}}
    activeOpacity={0.7}>

<LinearGradient
colors={['#38AAA4', 'chocolate']}
style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:2,
    width:170,
    height: 40,
    borderRadius: 10,
    
}}
start={{y: 0.0, x: 0.0}}
end={{y: 1.0, x: 0.0}}>

    <PencilIcon  size={20} strokeWidth={2} color={COLORS.white}/>
    <Text className="text-white">
       {
          lang=="ki"?"Hindura ijambokabanga":
          lang=="sw"? "Badilisha nenosili":
          lang=="fr"?"Changer Mot de Passe":
          lang=="en"?"Change Password":""
       }
                            
    </Text>
</LinearGradient>


</TouchableOpacity>

<TouchableOpacity
style={{marginLeft:10}}
    onPress={()=>handleDelete}
    activeOpacity={0.7}>

<LinearGradient
colors={['#38AAA4', 'red' ]}
style={{
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding:2,
    width:150,
    height: 40,
    borderRadius: 10,
}}
start={{y: 0.0, x: 0.0}}
end={{y: 1.0, x: 0.0}}>

<TrashIcon  size={20} strokeWidth={2} color={COLORS.white}/>
    <Text className="text-white">
      
        {
          lang=="ki"?"Futa Konte":
          lang=="sw"? "Futa akaunti":
          lang=="fr"?"Supprimer Compte":
          lang=="en"?"Delete Account":""
       }

    </Text>

</LinearGradient>


</TouchableOpacity>

</View>
</SafeAreaView>

<SafeAreaView className="rounded-lg mx-4 p-4 mt-5 bg-neutral-50  dark:bg-neutral-700 ">
    

    <TouchableOpacity
     onPress={()=>{}}
     activeOpacity={0.7}>
<View >
 <LinearGradient
   colors={['#38AAA4', 'black']}
   style={{
      textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '50%',
    height: 25,
    borderRadius: 20,
  }}
   start={{y: 0.0, x: 0.0}}
   end={{y: 1.0, x: 0.0}}>

   {/******************** Ajouter BUTTON *********************/}
   
     <Text style={styles.loginText}> 
        {
          lang=="ki"?"Ivyanje":
          lang=="sw"? "Vyangu":
          lang=="fr"?"Mes publications":
          lang=="en"?"My properties":""
       }</Text>
   
 </LinearGradient>
</View>

</TouchableOpacity>




</SafeAreaView>

            {/*House List*/}
            {
             Object.keys(houses).map((key) => {

              return (
                <View>
                 
                {key == 0?( 

                  <Text>
                     {
                          lang=="ki"?"Ntanakimwe uratangaza":
                          lang=="sw"? "Hakuna":
                          lang=="fr"?"Pas de Publications":
                          lang=="en"?"No propriete registered yet":""
                      }</Text>

                ):(

                  <RentList title={key} data={houses[key]}  backgd={isOdd(key)?'1':''} zone={key} hideSeeAll='1' titi={key} />
                 
                  )
                }
                </View>
              )
            })
            }
           


    </View>
    
   

      </View>
      

</ScrollView>
  )
}

export default Profile

