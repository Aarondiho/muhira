import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useState } from 'react'
import { ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import { ChevronLeftIcon, MagnifyingGlassIcon, } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { fetchCommune, fetchProvince, fetchQuartier, fetchZone,  } from '../../api/PropertyDb';
import { StatusBar } from 'expo-status-bar';
import AsyncStorage from '@react-native-async-storage/async-storage';


const AdminSearch = () => {



  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');




  const [type, setType] = useState('');
  const [idProperty, setIdProperty] = useState('');
  const [prix,setPrix] = useState('');
  const [lang,setLang] = useState(false)


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

  
  
  const [surface,setSurface] = useState('');

 //ADRESS
  const [quartier, setQuartier] = useState('');

  //List

 
  const [quartiers,setQuartiers]= useState([]);
  
  const All3 =[{'key':'0','value':'Tous','zone':'Bdi'}]
  
  const ObjectSize = (obj) => {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  

useEffect(()=>{
 
  getQuartierList()
  getLanguage()
},[]);

useEffect(()=>{

  getQuartierList()
  getLanguage()
},[lang]);




const getQuartierList = async ()=>{

  await fetchQuartier(Data)
  .then((response)=>response.json())
  .then((response)=>{
  
      setQuartiers(response)

  })

}

    

const quartiersList = quartiers.map(({
  id_quart: key,
  name_quart: value,
  zone : zone
  
}) => ({
  key,
  value,
  zone
}));


const quartierList = [...All3,...quartiersList]



  
  const typeList = [

      {key:'1', value:lang=='ki'?"Inzu":
                      lang=='sw'? 'Nyumba':
                      lang=='fr'?"Maison":
                      lang=='en'?"House":''},
      {key:'2', value:lang=='ki'?"Parasera":
                      lang=='sw'? "Parcelle":
                      lang=='fr'?"Parcelle":
                      lang=='en'?"Plot":''},
      {key:'3', value:lang=='ki'?"Imangazini & Ibiro":
                      lang=='sw'? "Duka & Ofisi":
                      lang=='fr'?"Magasin & Bureau":
                      lang=='en'?"Shop & Office":''}
        ]


const handleSearch = async() =>{
  var Data = {
    idProperty: idProperty?idProperty:0,
    type : type, 
    prix : prix?prix:0,
    surface : surface? surface:0 ,
    quartier : quartier=='Tous'?0:quartier,
    
  }

  navigation.navigate(ROUTES.ADMINRESULTS,Data)
 
}

  
  return (
    <ScrollView  className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >
<StatusBar style="dark" className="bg-neutral-900" />

   
      
    <View>
      
    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 " onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 ">
                <MagnifyingGlassIcon size="35" color='black' />
            </TouchableOpacity>
        </SafeAreaView>
    
        <View>  
            <Image
               
                source={ICONS.house6}
                style={{width, height: height*0.50,borderBottomRightRadius:30,borderBottomLeftRadius:30}} 
            />

    
            
           
         
    <View  className="rounded-lg mx-4 mb-10 bg-white  "
           
            style={{marginTop:-200}}
          >
            {/*Formulaire List*/}
            <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
            
            <View>
            <Text className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
            ID
            </Text>
        <TextInput style={styles.input} placeholder="01" keyboardType='numeric' 
        value = {idProperty}
        onChangeText ={text =>setIdProperty(text)}/>

    </View>
       
        <View >
          <View>
          <Text className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            
            {
                 lang=='ki'?"Ubwoko":
                 lang=='sw'? 'Aina':
                 lang=='fr'?"Type":
                 lang=='en'?"Type":''

              }    

          </Text>
          <SelectList 
                  defaultOption={typeList[0]}
                  setSelected={(val) => setType(val)} 
                  data={typeList} 
                  save="key"
                  />
          </View>

   
        
        </View>
        <View>
            <Text className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
            {
              action==1?
                lang=='ki'?"Amahera/kukwezi":
                lang=='sw'? 'Bei/mwezi':
                lang=='fr'?"Prix/mois":
                lang=='en'?"Price/month":''
                :
                lang=='ki'?"Agiciro":
                lang=='sw'? 'Bei':
                lang=='fr'?"Prix":
                lang=='en'?"Price":""
            }
            </Text>
        

        
        
        <TextInput style={styles.input} placeholder="200000000" keyboardType='numeric' 
        value = {prix}
        onChangeText ={text =>setPrix(text)}/>

    </View>

    { type == 2 || (type != 2 && action == 2)? (

      <View>
        <Text className="mb-2 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
            {
                  lang=='ki'?"Uko ingana muma are (Uhuzuza ubishatse)":
                  lang=='sw'? 'Eneo kwa are (Si lazima)':
                  lang=='fr'?"Superficie en are (Optionel)":
                  lang=='en'?"Area in are (Optionel)":''
                    
              }
        </Text>
        

              <TextInput style={styles.input} placeholder="200 Ares" keyboardType='numeric' 
              value = {surface}
              onChangeText ={text =>setSurface(text)}/>


            
          
      </View>

    ):''} 
           </SafeAreaView>

 
<SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
    


                    <Text className="text-2xl ">
                      
                      {
                          lang=='ki'?"AHIRI  ":
                          lang=='sw'? 'ANWANI ':
                          lang=='fr'?"ADRESSE ":
                          lang=='en'?"ADRESSE ":''
  
                        }
  
                      </Text>

                    
                  
                    <View>
                    {
                      lang=='ki'?'Rondera':
                      lang=='sw'? 'Tafuta':
                      lang=='fr'?'Recherche':
                      lang=='en'?'Search':''
                    }
                    <SelectList 
                            defaultOption={quartierList[0]}
                            setSelected={(val) => setQuartier(val)} 
                            data={quartierList} 
                            save="value"
                            />
                    </View>
                   
                </SafeAreaView>

           <SafeAreaView className="rounded-lg mx-4 p-4  bg-neutral-50  dark:bg-neutral-700 ">
    

           <TouchableOpacity
            onPress={ handleSearch}
            activeOpacity={0.7}>
      <View >
        <LinearGradient
          colors={['#38AAA4', 'rgba(23, 23, 23, 1)']}
          style={styles.loginBtn}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 0.0}}>

          {/******************** Ajouter BUTTON *********************/}
          
            <Text style={styles.loginText}> {
                 lang=='ki'?'Rondera':
                 lang=='sw'? 'Tafuta':
                 lang=='fr'?'Recherche':
                 lang=='en'?'Search':''
               }</Text>
          
        </LinearGradient>
      </View>
      
    </TouchableOpacity>
      
      
    </SafeAreaView>
    

        <View style={{marginTop:70}}>

            </View> 

    </View>
    
   

</View>
</View>
      

</ScrollView>
  )
}

export default AdminSearch

