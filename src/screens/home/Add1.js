import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import { ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';

import { addProperties, fetchCommune, fetchProvince, fetchQuartier, fetchZone } from '../../api/PropertyDb';
import AsyncStorage from '@react-native-async-storage/async-storage';


const Add1 = () => {



  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [userType,setUserType] = useState(false)
  const [lang,setLang] = useState(false)

  const getUserType = async()=>{
    const data = await AsyncStorage.getItem('type')
       setUserType(JSON.parse(data))
   }

   const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

   

  const route = useRoute()
  const {iduser,type,action, prix,currency,surface,chambre, salon,stock, douche, disposition, carreaux, plafond, eau, porte, detail, phone10, phone11,whatsapp1} = route.params;
  
  
   // ADRESS 

   const [province, setProvince] = useState('');
   const [commune, setCommune] = useState('');
   const [zone, setZone] = useState(1);
   const [quartier, setQuartier] = useState('');
   const [avenue, setAvenue] = useState('');
   const [numero, setNumero] = useState();
   

    //CONTACT

  const [nom,setNom] = useState('')
  const [prenom,setPrenom] = useState('')
  const [phone, setPhone] = useState('');
  const [phone1, setPhone1] = useState('');
  const [whatsapp, setWhatsapp] = useState('');


  
  //List

  const [provinces,setProvinces]= useState([]);
  const [communes,setCommunes]= useState([]);
  const [zones,setZones]= useState([]);
  const [quartiers,setQuartiers]= useState([]);

 
  
  

useEffect(()=>{
  getUserType();
  getProvinceList();
  getCommuneList();
  getZoneList();
  getQuartierList();
  getLanguage()
  
},[]);



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
  })

}
const getZoneList = async ()=>{

  Data={
    type:0
  }

  await fetchZone(Data)
  .then((response)=>response.json())
  .then((response)=>{
  
      setZones(response)

  })

}

const getQuartierList = async ()=>{

  await fetchQuartier()
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
  
  const commList = communes.map(({
  
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
  commune:commune 
  
  }) => ({
  key,
  value,
  commune
  }));
  
  const quartierList = quartiers.map(({
  id_quart: key,
  name_quart: value,
  zone : zone
  
  }) => ({
  key,
  value,
  zone
  }));
  
  
  


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
const zonesListe = zonesList.filter(obj=>obj.commune === commune)
const quartierListe = quartierList.filter(obj=>obj.zone === zone)

  const handleAdd = async () =>{

    if(prix == ""){
        alert("Veuillez entrer le prix");
    }else if(type == ""){

        alert("Veuillez choisir type");
        
    }else{
    
      
        var Data = { 
          id:0,
          nom:nom?nom:0,
          prenom:prenom?prenom:0,
          iduser : iduser,
          type : type, 
          action :action,
          prix : prix,
          currency :currency,
          surface : surface ,
          chambre : chambre ,
          salon : salon,
          stock :stock,
          douche :douche,
          disposition :disposition,
          carreaux:carreaux,
          plafond: plafond,
          eau :eau, 
          porte: porte,
          detail:detail,
          province  :province,
          commune : commune , 
          zone :zone , 
          quartier : quartier,
          avenue : avenue, 
          numero : numero, 
          phone : phone, 
          phone1 : phone1,
          whatsapp:whatsapp
          
        }

        await addProperties(Data)
        .then((response)=>response.json())
        .then((response)=>{
          
          if(response[0].Message==1){
          
            navigation.navigate(ROUTES.ADD2,{id:response[0].Id})  
          }
          else{
            alert('Error')
          }
            
        })
        
        
    
    }
    }

  
  return (
    <ScrollView  className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >

      
<SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
              <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                  <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
              </TouchableOpacity>
  
              <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 ">
                  <Text className="text-xl">
                      {
                        lang=='ki'?"Intambwe 2 / 3":
                        lang=='sw'? 'Hatua ya 2 / 3':
                        lang=='fr'?"Etape 2 / 3":
                        lang=='en'?"Step 2 / 3":''

                      }
                  </Text>
              </TouchableOpacity>
          </SafeAreaView>
      
          <View>  
              <Image
                 
                  source={ICONS.house5}
                  style={{width, height: height*0.50,borderBottomRightRadius:20,borderBottomLeftRadius:20}} 
              />
  
      
       
    <LinearGradient

          colors={['#38AAA4', 'rgba(23, 23, 23, 1)']}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 0.0}}
          style={{marginTop:-235}} 
              className={"block rounded-xl mx-10   bg-neutral-50 p-3 "}> 
    <Text className="text-xl text-center text-bold text-white " >
                    {
                        lang=='ki'?"AHIRI & NIMERO TWOKURONKAKO ":
                        lang=='sw'? 'ANWANI NA MAWASILIANO':
                        lang=='fr'?"ADRESSE & CONTACTES":
                        lang=='en'?"ADRESSE & CONTACT":''

                      }
      </Text>
    </LinearGradient>
     
     
             
           
            {/*Formulaire List*/}
            <SafeAreaView className="block rounded-lg mx-4 my-4 mt-10 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 ">
    

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
                        
                        setSelected={(val) => setProvince(val)} 
                        data={provincesList} 
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
                        defaultOption={zonesListe[0]}
                        setSelected={(val) => setZone(val)} 
                        data={zonesListe} 
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
                              defaultOption={quartierListe[0]}
                              setSelected={(val) => setQuartier(val)} 
                              data={quartierListe} 
                              save="key"
                              />
                      </View>
              
                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                        {
                          lang=='ki'?"Ibarabara":
                          lang=='sw'? 'Barabara':
                          lang=='fr'?"Avenue,Rue":
                          lang=='en'?"Avenue, Street":''

                        }
                      </Text>
                    <TextInput style={styles.input} placeholder="Buconyorie, 2eme Avenue" 
                    Value={avenue}
                    onChangeText={text=>setAvenue(text)} />
                    </View>

                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                      
                    {
                          lang=='ki'?"Nimero":
                          lang=='sw'? 'Numero':
                          lang=='fr'?"Numero":
                          lang=='en'?"Number":''
                    }

                    </Text>
                    <TextInput style={styles.input} placeholder="2" keyboardType='numeric' 
                    Value={numero}
                    onChangeText={text=>setNumero(text)}/>
                    </View>

                    </SafeAreaView>

                    <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
                    


                    <Text className="text-2xl ">   
                      {
                        lang=='ki'?"NIMERO ZAWE ":
                        lang=='sw'? 'MAWASILIANO':
                        lang=='fr'?"CONTACTES":
                        lang=='en'?"CONTACT":''

                      } </Text>
                    {userType==2?(
                      <View>
                      <View>
                      <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                        { 
                            lang=="ki"?"Izina":
                            lang=="sw"? "Jina":
                            lang=="fr"?"Nom":
                            lang=="en"?"Lastname":""
                          }
                        </Text>
                      <TextInput style={styles.input} placeholder="Mugisha" 
                      Value={nom}
                      onChangeText={text=>setNom(text)}/>
                      </View>
                       <View>
                       <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                         
                          { lang=="ki"?"Iritazirano":
                            lang=="sw"? "Jina":
                            lang=="fr"?" Prénom":
                            lang=="en"?"Firstname":""
                          }
                         
                         </Text>
                       <TextInput style={styles.input} placeholder="Alfred" 
                       Value={prenom}
                       onChangeText={text=>setPrenom(text)}/>
                       </View>
                       </View>
                    ):''}
                    {(
                      phone10 || userType != 2?'':
                        
                        <View>
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                           {
                              lang=="ki"?"Telefone 1":
                              lang=="sw"? "Simu 1":
                              lang=="fr"?" Téléphone 1":
                              lang=="en"?"Telephone 1":""
                            }
                          </Text>
                        <TextInput style={styles.input} placeholder="+25761552799" keyboardType='numeric' 
                        Value={phone}
                        onChangeText={text=>setPhone(text)}/>
                        </View>
                        )}

                  {(
                      phone11 || userType != 2?'':
                    
                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                            {
                              lang=="ki"?"Telefone 2":
                              lang=="sw"? "Simu 2":
                              lang=="fr"?" Téléphone 2":
                              lang=="en"?"Telephone 2":""
                            }
                    </Text>
                    <TextInput style={styles.input} placeholder="+25771456789" keyboardType='numeric' 
                    Value={phone1}
                    onChangeText={text=>setPhone1(text)}/>
                    </View>
                    )}

                  {(
                      whatsapp1 || userType != 2?'':
                    
                    <View>
                    <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                      Whatsapp </Text>
                    <TextInput style={styles.input} placeholder="+25771456789" keyboardType='numeric' 
                    Value={whatsapp}
                    onChangeText={text=>setWhatsapp(text)}/>
                    </View>
                    )}
                    

                    </SafeAreaView>

              <SafeAreaView className="rounded-lg mx-4 p-4  bg-neutral-50  dark:bg-neutral-700 ">
                    
                <TouchableOpacity
                            onPress={handleAdd}
                            activeOpacity={0.7} >
                      <View >
                        <LinearGradient
                          colors={['#38AAA4', 'rgba(23, 23, 23, 1)']}
                          style={styles.loginBtn}
                          start={{y: 0.0, x: 0.0}}
                          end={{y: 1.0, x: 0.0}}>

                          {/******************** Ajouter BUTTON *********************/}
                          
                            <Text style={styles.loginText}>
                              
                            {
                              lang=="ki"?"Ahakurikira":
                              lang=="sw"? "Endelea":
                              lang=="fr"?"Suivant":
                              lang=="en"?"Next":""
                            }
                            </Text>
                          
                        </LinearGradient>
                      </View>
                      
                      </TouchableOpacity>
              </SafeAreaView>

       

    </View>
    
   

</ScrollView>
  )
}

export default Add1

