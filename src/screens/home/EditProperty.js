import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import {  ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import { StatusBar } from 'expo-status-bar';
import { addProperties, fetchCommune, fetchProvince, fetchQuartier, fetchZone } from '../../api/PropertyDb';
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditProperty = () => {

  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  
  const [lang,setLang] = useState(false)


  const route = useRoute()

    const {id,type,action,price,currency,are,room,stock,salon,bathroom,disposition,carreaux,roof,
    water,houses,detail,img,province,commune,zone,quarter,avenue,numero,owner,status,date_pub,id_user,first_name,
    last_name,username,email,phone,phone1,whatsapp,online} = route.params;


  
      
  const [iduser,setIduser] = useState(false)
  const [types, setType] = useState(type);
  const [actions, setAction] = useState(action);
  const [prix,setPrix] = useState(price);
  const [currencies,setCurrency] = useState(currency);
  const [surface,setSurface] = useState(are);
  const [chambre, setChambre] = useState(room);
  const [salons, setSalon] = useState(salon);
  const [stocks, setStock] = useState(stock);
  const [douche, setDouche] = useState(bathroom);
  const [dispositions, setDisposition] = useState(disposition);
  const [carreau, setCarreaux] = useState(carreaux);
  const [plafond, setPlafond] = useState(roof);
  const [eau, setEau] = useState(water);
  const [porte, setPorte] = useState(houses);
  const [details, setDetail]= useState(detail)

   // ADRESS 

   const [province1, setProvince] = useState(province);
   const [commune1, setCommune] = useState(commune);
   const [zone1, setZone] = useState(zone);
   const [quartier, setQuartier] = useState(quarter);
   const [avenues, setAvenue] = useState(avenue);
   const [numeros, setNumero] = useState(numero);


   const [nom,setNom] = useState('')
   const [prenom,setPrenom] = useState('')
 

  
  const typeList = [
      {key:'1', value:'Maison'},
      {key:'2', value:'Parcelle'},
      {key:'3', value:'Bureau & Magasin'}
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

//List

const [provinces,setProvinces]= useState([]);
const [communes,setCommunes]= useState([]);
const [zones,setZones]= useState([]);
const [quartiers,setQuartiers]= useState([]);

const getLanguage = async()=>{
  const data = await AsyncStorage.getItem('lang')
     setLang(data)
 }




useEffect(()=>{

  getProvinceList()
  getCommuneList()
  getZoneList()
  getQuartierList()
  getId()
  getLanguage()

},[]);

useEffect(()=>{

  getProvinceList()
  getCommuneList()
  getZoneList()
  getQuartierList()
  getId()
  getLanguage()

},[lang]);

const getId = async()=>{
  const data = await AsyncStorage.getItem('id')
  setIduser(JSON.parse(data))
}



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



const commListe = commList.filter(obj=>obj.province === province1)
const zonesListe = zonesList.filter(obj=>obj.commune === commune1)
const quartierListe = quartierList.filter(obj=>obj.zone === zone1)



  const handleAdd = async () =>{

    if(!prix){
        alert("Veuillez entrer le prix");
    }else{
    
      
      var Data = { 
        id:id,
        nom:nom?nom:0,
        prenom:prenom?prenom:0,
        iduser : iduser,
        type : types, 
        action :actions,
        prix : prix,
        currency :currencies,
        surface : surface ,
        chambre : chambre ,
        salon : salons,
        stock :stocks,
        douche :douche,
        disposition :dispositions,
        carreaux:carreau,
        plafond: plafond,
        eau :eau, 
        porte: porte,
        detail:details,
        province  :province1,
        commune : commune1 , 
        zone :zone1 , 
        quartier : quartier,
        avenue : avenues, 
        numero : numeros, 
        phone : phone, 
        phone1 : phone1,
        whatsapp:whatsapp
       
        
      }

      await addProperties(Data)
        .then((response)=>response.json())
        .then((response)=>{
          
          if(response[0].Message==1){

            alert('Modifie avec succes')
          
            navigation.navigate(ROUTES.PROFILE,{iduser:iduser})  
          }
          else{
            alert('Error')
          }
            
        })
      
  
    
      }
    }

  
  return ( 
  <ScrollView  className={"rounded-lg bg-white "+topMargin}
  showsVerticalScrollIndicator={false} 
>

    
<SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            
        </SafeAreaView>
    
        <View>  
            <Image
               
                source={ICONS.house7}
                style={{width, height: height*0.25,borderBottomRightRadius:30,borderBottomLeftRadius:30}} 
            />

            
           
         
    <ScrollView  className="rounded-lg mx-4 mb-10 bg-white  "
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{marginBottom:10}}
            style={{marginTop:-20}}
          >
            {/*Formulaire List*/}
            <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}
    
    >
    <Text className="text-2xl text-center text-bold p-2 " style={{marginTop:-20}}>
              {
                 lang=='ki'?"UZUZA":
                 lang=='sw'? 'FOMU':
                 lang=='fr'?"FORMULAIRE":
                 lang=='en'?"FORM":''

              }  
    </Text>
    
        <View >
          <View>
          <Text className="mb-2 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            
          {
                 lang=='ki'?"Ubwoko":
                 lang=='sw'? 'Aina':
                 lang=='fr'?"Type":
                 lang=='en'?"Type":''

              }
          </Text>
          <SelectList 
                  defaultOption={typeList[typeList.findIndex(obj => obj.key === types)]}
                  setSelected={(val) => setType(val)} 
                  data={typeList} 
                  save="key"
                  />
          </View>

        <View>

            
              <RadioButtonGroup
                 containerStyle={{  
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                marginBottom: 10,
                marginTop:20}}
                selected={actions}
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
        
        </View>
        <Text className="mb-2 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
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

        <TextInput style={styles.input} placeholder="2.000.000.000.000" keyboardType='numeric' 
        value = {prix}
        onChangeText ={text =>setPrix(text)}/>
        

        <View style={{marginLeft:50}}>
                <RadioButtonGroup
                selected={currencies}
                onSelected={(value) => setCurrency(value)}
                radioBackground="#38AAA4">
                  
                   
                    <RadioButtonItem value="1"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">BIF</Text>
                    } />
                    <RadioButtonItem
                    value="2"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">USD</Text>
                    }
                    />
                  
            </RadioButtonGroup>
            </View> 
            </View>

    { types == 2 || (types != 2 && action == 2)  ? '': (
            <View >
              <Text className="mb-2 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5 ">
                  {
                     lang=='ki'?"Amatara n'amazi":
                     lang=='sw'? 'Umeme na Maji':
                     lang=='fr'?"Electricite et Eau":
                     lang=='en'?"Electricity and Water":''
              
                  }
              </Text>

            
              <RadioButtonGroup
                containerStyle={{  
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'center',
                padding:5,
                marginBottom: 10,
                 marginTop:10}}
                selected={eau}
                onSelected={(value) => setEau(value)}
                radioBackground="#38AAA4">

                    <RadioButtonItem value="1"
                    label={
                      <Text >
                         {
                          lang=='ki'?"Uririhira":
                          lang=='sw'? 'Unajilipa':
                          lang=='fr'?"Exclus ":
                          lang=='en'?"Excluded":''
                  
                        }
                      </Text>
                  } />
                    <RadioButtonItem
                    style={{marginLeft:10}}
                    value="2"
                    label={
                      <Text >
                       

                        {
                          lang=='ki'?"Nturiha":
                          lang=='sw'? 'Haulipi':
                          lang=='fr'?"Inclus ":
                          lang=='en'?"Included":''
                  
                        }
                      </Text>
                  }
                  />
            </RadioButtonGroup>
            
           </View>

    )}

    { types == 2 || (types != 2 && action == 2)? (

            <View>
              <Text className="mb-2 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                  {
                      lang=='ki'?"Uko ingana muma are":
                      lang=='sw'? 'Eneo kwa are ':
                      lang=='fr'?"Superficie en are ":
                      lang=='en'?"Area in are ":''
                        
                  }
              </Text>

              <TextInput style={styles.input} placeholder="100" keyboardType='numeric' 
                       value = {surface}
                       onChangeText ={text =>setSurface(text)}/>

                      
           </View>

    ):''} 
  </SafeAreaView>
 <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
    
    { types == 2 ? '': ( 
        <View>
       
           

        <Text className="text-2xl text-bold">
           {
               lang=='ki'?"IBINDI":
               lang=='sw'? 'MAELEZO':
               lang=='fr'?"DETAILS":
               lang=='en'?"DETAILS":''
            
            }
        </Text>


    
        <View>
              <Text className="mb-2 ml-5 mt-5 text-ms  font-medium leading-tight text-neutral-800 dark:text-neutral-50  ">
                                
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
                   marginTop:10

                  }}

                  selected={carreau}
                  onSelected={(value) => setCarreaux(value)}
                  radioBackground="#38AAA4">

                  <RadioButtonItem value="1"
                    label={
                      <Text >
                        
                        {
                          lang=='ki'?"Isima":
                          lang=='sw'?'Saruji':
                          lang=='fr'?"Ciment":
                          lang=='en'?"Cement":''
                  
                        }
                      </Text>
                  } />
                    <RadioButtonItem
                    style={{marginLeft:10}}
                    value="2"
                    label={
                      <Text >
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
              <Text className="mb-2 ml-5 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50  ">
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
                   marginTop:10
                  }}
                  
                selected={plafond}
                onSelected={(value) => setPlafond(value)}
                radioBackground="#38AAA4">

                <RadioButtonItem value="1"
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
                    <Text >Dubai</Text>
                }
                    />
            </RadioButtonGroup>
            
           </View>
       
    {types == 3 ? '':(
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
                defaultOption={nombre[chambre]}
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
                defaultOption={nombre[salons]}
                setSelected={(val) => setSalon(val)} 
                data={nombre} 
                save="value"
                />
        </View>
        
        <View>
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
           {
            lang=='ki'?"Akumba ka Stoke":
            lang=='sw'?'Sebule':
            lang=='fr'?"Chambres de Stock":
            lang=='en'?"Stock rooms":''
          
            } 
        </Text>
             
        <SelectList 
                defaultOption={nombre[stocks]}
                setSelected={(val) => setStock(val)} 
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
        <View style={styles.row}>
            <SelectList style={{width:20}}
                defaultOption={nombre[douche]}
                setSelected={(val) => setDouche(val)} 
                data={nombre} 
                save="value"
                />
        
       
            <View style={{marginLeft:10}}>
                <RadioButtonGroup
                selected={dispositions}
                onSelected={(value) => setDisposition(value)}
                radioBackground="#38AAA4">
                  
                   
                <RadioButtonItem value="1"
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

       </View> 
    )}

    {types == 1 ? (

        <View>
               <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                        {
                          lang=='ki'?"Inzu birikumwe murupangu (Uhuzuza ubishatse)":
                          lang=='sw'?'Nyumba katika Kiwanja kimoja (Si lazima)':
                          lang=='fr'?"Maisons dans la meme Parcelle (Optionel)":
                          lang=='en'?"Houses in the same Plot (Optional)":''
                  
                          } 
          </Text>
          <SelectList 
                defaultOption={nombre[porte]}
                setSelected={(val) => setPorte(val)} 
                data={nombre } 
                save="value"
                />
        </View>
  ):''}

</View>

)}
<View>
<Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
    {
      lang=='ki'?"Ibindi wokwongerako atari adrese":
      lang=='sw'?'Mambo mengine ya kutaja ':
      lang=='fr'?"Autres details à mentionner (Pas adresse)":
      lang=='en'?"Other details to mention (not adress)":''
      
    } 
  
  </Text>
             
<TextInput multiline={true}   textAlignVertical="top" style={styles.input} 
  value={detail}
onChangeText ={Text => setDetail(Text)} />
  </View>

</SafeAreaView>

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
            defaultOption={provincesList[provincesList.findIndex(obj => obj.key === province1)]}
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
            defaultOption={commListe[commListe.findIndex(obj => obj.key === commune1)]}
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
            defaultOption={zonesListe[zonesListe.findIndex(obj => obj.key === zone1)]}
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
                  defaultOption={quartierListe[quartierListe.findIndex(obj => obj.key === quartier)]}
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
          value={avenues}
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
            value={numeros}
            onChangeText={text=>setNumero(text)}/>
        </View>

        </SafeAreaView>


           <SafeAreaView className="rounded-lg mx-4 p-4  bg-neutral-50  dark:bg-neutral-700 ">
    

           <TouchableOpacity
            onPress={handleAdd}
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
                        lang=='ki'?"Hindura":
                        lang=='sw'? 'JTuma':
                        lang=='fr'?"Envoyer":
                        lang=='en'?'Submit':''

                      }
              </Text>
          
        </LinearGradient>
      </View>
      
    </TouchableOpacity>
      
      
    </SafeAreaView>
    

       

    </ScrollView>
    
   

      </View>
      

</ScrollView>
  )
}

export default EditProperty

