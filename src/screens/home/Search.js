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


const Search = () => {



  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [lang,setLang] = useState(false)


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }




  const [type, setType] = useState('');
  const [action, setAction] = useState(1);
  const [prix,setPrix] = useState('');
  const [prix1,setPrix1] = useState('');
  const [surface,setSurface] = useState('');
  const [surface1,setSurface1] = useState('');
  const [chambre, setChambre] = useState('');
  const [salon, setSalon] = useState('');
  const [disposition, setDisposition] = useState('3');
  const [carreaux, setCarreaux] = useState('3');
  const [plafond, setPlafond] = useState('3');

  // ADRESS 
  
  const [province, setProvince] = useState('');
  const [commune, setCommune] = useState('');
  const [zone, setZone] = useState('');
  const [quartier, setQuartier] = useState('');

  //List

  const [provinces,setProvinces]= useState([]);
  const [communes,setCommunes]= useState([]);
  const [zones,setZones]= useState([]);
  const [quartiers,setQuartiers]= useState([]);

  const All =[
                {
                  'key':'0',
                  'value':lang=='ki'?"Zose":
                          lang=='sw'?'Zote':
                          lang=='fr'?"Tous":
                          lang=='en'?"All":''
                }
              ]

  const All1 =[
                {
                  'key':'0',
                  'value':lang=='ki'?"Zose":
                          lang=='sw'?'Zote':
                          lang=='fr'?"Tous":
                          lang=='en'?"All":'',
                  'province':province
                }
              ]

  const All2 =[
                {
                  'key':'0',
                  'value':lang=='ki'?"Zose":
                          lang=='sw'?'Zote':
                          lang=='fr'?"Tous":
                          lang=='en'?"All":'',
                  'commune': commune
                }
              ]
  const All3 =[
                {
                  'key':'0',
                  'value':lang=='ki'?"Zose":
                          lang=='sw'?'Zote':
                          lang=='fr'?"Tous":
                          lang=='en'?"All":'',
                  'zone':zone
                }
              ]
  
  const ObjectSize = (obj) => {
    var size = 0,
      key;
    for (key in obj) {
      if (obj.hasOwnProperty(key)) size++;
    }
    return size;
  };
  

useEffect(()=>{
  getQuartierList();
  getZoneList();
  getCommuneList();
  getProvinceList();
  getLanguage()
},[]);

useEffect(()=>{
  getQuartierList();
  getZoneList();
  getCommuneList();
  getProvinceList();
  getLanguage()
},[lang]);



const getProvinceList = async ()=>{

  await fetchProvince()
  .then((response)=>response.json())
  .then((response)=>{
  
      setProvinces(response)

  })

}

const getCommuneList = async ()=>{

  await fetchCommune()
  .then((response)=>response.json())
  .then((response)=>{

      setCommunes(response)
      console.log(response)
  })

}
const getZoneList = async ()=>{

  await fetchZone(Data)
  .then((response)=>response.json())
  .then((response)=>{
  
      setZones(response)

  })

}

const getQuartierList = async ()=>{

  await fetchQuartier(Data)
  .then((response)=>response.json())
  .then((response)=>{
  
      setQuartiers(response)

  })

}

    
const provincesList = provinces.map(({
  id_province: key,
  name_province: value,
  
}) => ({
  key,
  value
}));



const commsList = communes.map(({

          id_comm: key,
          name_comm: value,
          province:province
          
        }) => ({
          key,
          value,
          province
        }));

    


const zonesList = zones.map(({
  id_zone: key,
  name_zone: value,
  commune: commune 
  
}) => ({
  key,
  value,
  commune
}));

const quartiersList = quartiers.map(({
  id_quart: key,
  name_quart: value,
  zone : zone
  
}) => ({
  key,
  value,
  zone
}));

const provinceList = [...All, ...provincesList]
const commList = [...All1,...commsList]
const zoneList = [...All2,...zonesList]
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


const nombre = [
  {key:"0", value:"0"},
  {key:"1", value:"1"},
  {key:"2", value:"2"},
  {key:"3", value:"3"},
  {key:"4", value:"4"},
  {key:"5", value:"5"},
  {key:"6", value:"6"},
  {key:"7", value:"7"},
  {key:"8", value:"8"},
  {key:"9", value:"9"},
  {key:"10", value:"10"},
  {key:"11", value:"11"},
  {key:"12", value:"12"},
  {key:"13", value:"13"},
  {key:"14", value:"14"},
  {key:"15", value:"15"},
  {key:"16", value:"16"},
  {key:"17", value:"17"},
  {key:"18", value:"18"},
  {key:"19", value:"19"},
  {key:"20", value:"20"},
]


const commListe = commList.filter(obj=>obj.province === province)
const zoneListe = zoneList.filter(obj=>obj.commune === commune)
const quartierListe = quartierList.filter(obj=>obj.zone === zone)

const handleSearch = async() =>{

    
      
  var Data = {
    type : type, 
    action :action,
    prix : prix?prix:0,
    prix1 : prix1?prix1:0,
    surface : surface? surface:0 ,
    surface1 : surface1? surface1:0 ,
    chambre : chambre ,
    salon : salon,
    disposition :disposition== 3? 0 :disposition,
    carreaux:carreaux== 3? 0 :carreaux,
    plafond: plafond== 3? 0 : plafond, 
    province  :province=='Tous'?0:province,
    commune : commune=='Tous'?0:commune , 
    zone :zone=='Tous'?0:zone , 
    quartier : quartier=='Tous'?0:quartier,
    
  }

  navigation.navigate(ROUTES.SEARCHRESULTS,Data)
 
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

    {type==2?"":(

        <View>

            
              <RadioButtonGroup
                 containerStyle={{  
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop:20}}
                selected={action}
                onSelected={(value) => setAction(value)}
                radioBackground="#38AAA4">

                    <RadioButtonItem value="1"
                    label={
                        <Text >
                            {
                                lang=='ki'?"Irakoteshwa":
                                lang=='sw'? 'Kwa kukodisha':
                                lang=='fr'?"A louer":
                                lang=='en'?"For rent":''
              
                            } 
                        </Text>
                    } />
                    <RadioButtonItem
                    style={{marginLeft:10}}
                    value="2"
                    label={
                      <Text >
                      {
                           lang=='ki'?"Iragurishwa":
                           lang=='sw'? 'Inauzwa':
                           lang=='fr'?"A vendre":
                           lang=='en'?"For sale":''
         
                       } 
                   </Text>
                    }
                    />
            </RadioButtonGroup>
            
           </View>
    )}
        
        </View>
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
        <View style={styles.row}>
        <Text className="text-center text-sm mr-1">

          {
             lang=='ki'?"Kuva":
             lang=='sw'? 'Kutoka':
             lang=='fr'?"De":
             lang=='en'?"From":''
         
          } 

        </Text>
        
        
        <TextInput style={styles.input} placeholder="200000000" keyboardType='numeric' 
        value = {prix}
        onChangeText ={text =>setPrix(text)}/>


        <Text className="text-center text-sm ml-1 mr-1">
        {
             lang=='ki'?"Gushika":
             lang=='sw'? 'Kufika':
             lang=='fr'?"A":
             lang=='en'?"To":''
         
          } 

        </Text>

        
        <TextInput 
            style={styles.input} 
            placeholder="40000000" 
            keyboardType='numeric' 
            value = {prix1}
            onChangeText ={text =>setPrix1(text)}
        />
               
          
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
        <View style={styles.row}>
              <Text className="text-center text-sm mr-1">          
                {
                  lang=='ki'?"Kuva":
                  lang=='sw'? 'Kutoka':
                  lang=='fr'?"De":
                  lang=='en'?"From":''
         
              } 
          </Text>


              <TextInput style={styles.input} placeholder="200 Ares" keyboardType='numeric' 
              value = {surface}
              onChangeText ={text =>setSurface(text)}/>


              <Text className="text-center text-sm ml-1 mr-1">
                
              {
                lang=='ki'?"Gushika":
                lang=='sw'? 'Kufika':
                lang=='fr'?"A":
                lang=='en'?"To":''
         
            } 
              </Text>


              <TextInput 
                  style={styles.input} 
                  placeholder="400 Ares" 
                  keyboardType='numeric' 
                  value = {surface1}
                  onChangeText ={text =>setSurface1(text)}
              />
   
           </View>
      </View>

    ):''} 
           </SafeAreaView>

  { type == 2 ? '': (          
 <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
    
    
        <View>
       
    
        <View>
              <Text className="mb-2  text-xl  font-medium leading-tight text-neutral-800 dark:text-neutral-50  ">
                  {
                      lang=='ki'?"Hasi":
                      lang=='sw'?'Sakafu':
                      lang=='fr'?"Au sol":
                      lang=='en'?"Floor":''
                
                    }
              </Text>

            
              <RadioButtonGroup
                 containerStyle={{  
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                   marginTop:10}}

                selected={carreaux}
                onSelected={(value) => setCarreaux(value)}
                radioBackground="#38AAA4">


                    <RadioButtonItem value="3"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          
                          {
                            lang=='ki'?"Zose":
                            lang=='sw'?'Zote':
                            lang=='fr'?"Tous":
                            lang=='en'?"All":''
                    
                          }

                        </Text>
                    } />
                   

                    <RadioButtonItem value="1"
                    style={{marginLeft:10}}
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          
                          {
                            lang=='ki'?"Isima":
                            lang=='sw'?'Saruji':
                            lang=='fr'?"Ciment":
                            lang=='en'?"Cement":''
                    
                          }

                        </Text>
                    } />
                    <RadioButtonItem
                    value="2"
                    style={{marginLeft:10}}
                    
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          
                          {
                            lang=='ki'?"Ikaro":
                            lang=='sw'?'Vigae':
                            lang=='fr'?"Carreaux":
                            lang=='en'?"Tiles":''
                    
                          }                       

                        </Text>
                    }
                    />
            </RadioButtonGroup>
            
           </View>

           <View >
              <Text className="mb-2 mt-5 text-xl font-medium leading-tight text-neutral-800 dark:text-neutral-50  ">
                

              {
                  lang=='ki'?"Parafo":
                  lang=='sw'?'Dari':
                  lang=='fr'?"Plafond":
                  lang=='en'?"Ceiling":''
                    
              }

              </Text>

            
              <RadioButtonGroup
                containerStyle={{  
                  flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginBottom: 10,
                   marginTop:10}}
                selected={plafond}
                onSelected={(value) => setPlafond(value)}
                radioBackground="#38AAA4">

                    <RadioButtonItem value="3"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          
                          {
                            lang=='ki'?"Zose":
                            lang=='sw'?'Zote':
                            lang=='fr'?"Tous":
                            lang=='en'?"All":''
                    
                          }

                        </Text>
                    } />

                    <RadioButtonItem value="1"
                    style={{marginLeft:10}}
                    label={
                      <Text >
                        {
                        lang=='ki'?"Isanzwe":
                        lang=='sw'?'Rahisi':
                        lang=='fr'?"Simple":
                        lang=='en'?"Simple":''
                
                        } 
                    </Text>
                  } />
                    <RadioButtonItem
                    style={{marginLeft:10}}
                    value="2"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          Dubai
                        </Text>
                    }
                    />
            </RadioButtonGroup>
            
           </View>


    

        
       
    {type == 3 ? '':(


      <View>
        <View>
        
        <View>
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
            {
              lang=='ki'?"Ivyumba":
              lang=='sw'?'Vyumba':
              lang=='fr'?"Chambres":
              lang=='en'?"Rooms":''
            
            } 
          </Text>
          <SelectList 
                defaultOption={nombre[1]}
                setSelected={(val) => setChambre(val)} 
                data={nombre} 
                save="value"
                />
        </View>

        <View>
  
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
            {
              lang=='ki'?"Ama Salon":
              lang=='sw'?'Salon':
              lang=='fr'?"Salons":
              lang=='en'?"Living rooms":''
            
              } 
        </Text>
        <SelectList 
                defaultOption={nombre[0]}
                setSelected={(val) => setSalon(val)} 
                data={nombre} 
                save="value"
                />
        </View>
        
        
       
        </View>
    


        <View style={{marginTop:30}}>
       
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {
              lang=='ki'?"Dushe na Toilette":
              lang=='sw'?'Bafuni':
              lang=='fr'?"Douche et Toilette":
              lang=='en'?"Bathroom":''
            
            }
        </Text>

            <View style={{marginLeft:10}}>
                <RadioButtonGroup
                containerStyle={{  
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    marginBottom: 10,
                    marginTop:20,
                    padding:5}}
                selected={3}
                onSelected={(value) => setDisposition(value)}
                radioBackground="#38AAA4">
                  
                   
                  <RadioButtonItem value="3"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50" >
                          
                          {
                            lang=='ki'?"zose":
                            lang=='sw'?'Zote':
                            lang=='fr'?"Tous":
                            lang=='en'?"All":''
                    
                          }

                        </Text>
                    } />
                   
                    <RadioButtonItem value="1"
                    style={{marginLeft:10}} 
                    label={
                      <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                         {
                            lang=='ki'?"Hanze":
                            lang=='sw'?'nje':
                            lang=='fr'?"Déhors":
                            lang=='en'?"Out":''
                    
                          }
                        </Text>
                  } />
                    <RadioButtonItem
                    style={{marginLeft:10}}
                    value="2"
                    label={
                      <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                        {
                        lang=='ki'?"Indani":
                        lang=='sw'?'Ndani':
                        lang=='fr'?"À l'intérieur":
                        lang=='en'?"Inside":''
                
                        }
                      </Text>
                  }
                  />
                  
            </RadioButtonGroup>
            </View> 

            </View>
       

       </View> 
    )}

   

</View>



</SafeAreaView>
)}

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
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 ">
                      {
                        lang=='ki'?"Intara":
                        lang=='sw'? 'Province':
                        lang=='fr'?"Province":
                        lang=='en'?"Province":''

                      }
                  </Text>  
                        <SelectList 
                            defaultOption={provinceList[0]}
                            setSelected={(val) => setProvince(val)} 
                            data={provinceList} 
                            save="key"
                            /> 
                    </View>

                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                      {
                        lang=='ki'?"Komine":
                        lang=='sw'? 'Commune':
                        lang=='fr'?"Commune":
                        lang=='en'?"Commune":''

                      }
                  </Text>   

                        <SelectList 
                            defaultOption={commListe[0]}
                            setSelected={(val) => setCommune(val)} 
                            data={commListe} 
                            save="key"
                            />
                    </View>
                    <View>
                    
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                        {
                          lang=='ki'?"Zone":
                          lang=='sw'? 'Zone':
                          lang=='fr'?"Zone":
                          lang=='en'?"Zone":''

                        }
                  </Text>
                    
                       <SelectList 
                            defaultOption={zoneListe[0]}
                            setSelected={(val) => setZone(val)} 
                            data={zoneListe} 
                            save="key"
                            />
                    </View>
                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                        {
                          lang=='ki'?"Karitiye, Umutumba":
                          lang=='sw'? 'Quartier, Colline':
                          lang=='fr'?"Quartier, Colline":
                          lang=='en'?"Quarter, Village":''

                        }
                      </Text>
                    <SelectList 
                            defaultOption={quartierList[0]}
                            setSelected={(val) => setQuartier(val)} 
                            data={quartierListe} 
                            save="key"
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
          
            <Text style={styles.loginText}>
              
               {
                 lang=='ki'?'Rondera':
                 lang=='sw'? 'Tafuta':
                 lang=='fr'?'Recherche':
                 lang=='en'?'Search':''
               }

            </Text>
          
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

export default Search

