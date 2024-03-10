import { View, Text, TextInput, ScrollView, TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import {  ChevronLeftIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation} from '@react-navigation/native';
import { SelectList } from 'react-native-dropdown-select-list';
import RadioButtonGroup, { RadioButtonItem } from "expo-radio-button";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { StatusBar } from 'expo-status-bar';


const Add = () => {

  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [iduser,setIduser] = useState(false)
  const [phoneas,setPhoneas] = useState(false)
  const [phoneasy,setPhoneasy] = useState(false)
  const [whatsapp, setWhatsapp] = useState(false)
  const [lang,setLang] = useState(false)

const getId = async()=>{
 const data = await AsyncStorage.getItem('id')
    setIduser(JSON.parse(data))
}
  
  const getPhoneas= async()=>{

    const data = await AsyncStorage.getItem('phone')
    setPhoneas(JSON.parse(data))
}
const getPhoneasy= async()=>{

  const data = await AsyncStorage.getItem('phone1')
  setPhoneasy(JSON.parse(data))
}
const getWhatsapp = async()=>{

  const data = await AsyncStorage.getItem('whatsapp')
  setWhatsapp(JSON.parse(data))
}

  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }




useEffect(()=>{

getId();
getPhoneas();
getPhoneasy();
getWhatsapp();
getLanguage()

},[])
  
  

  const [type, setType] = useState('');
  const [action, setAction] = useState(1);
  const [prix,setPrix] = useState('');
  const [currency,setCurrency] = useState(1);
  const [surface,setSurface] = useState('');
  const [chambre, setChambre] = useState('');
  const [salon, setSalon] = useState('');
  const [stock, setStock] = useState('0');
  const [douche, setDouche] = useState('');
  const [disposition, setDisposition] = useState(1);
  const [carreaux, setCarreaux] = useState(1);
  const [plafond, setPlafond] = useState(1);
  const [eau, setEau] = useState(1);
  const [porte, setPorte] = useState('');
  const [detail, setDetail]= useState('')

  
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

  const handleAdd = () =>{

    if(!prix){
        alert("Veuillez entrer le prix");
    }else{
    
      
        var Data = {
          iduser : iduser,
          type : type, 
          action :action,
          prix : prix,
          currency :currency,
          surface : surface? surface:'0' ,
          chambre : chambre ,
          salon : salon,
          stock :stock,
          douche :douche,
          disposition :disposition,
          carreaux:carreaux,
          plafond: plafond,
          eau :eau, 
          porte: porte?porte:'0',
          detail : detail,
          phone10:phoneas,
          phone11:phoneasy,
          whatsapp1:whatsapp
          
        }
        
        navigation.navigate(ROUTES.ADD1, Data)
  
    
      }
    }

  
  return (
    <ScrollView  className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >
      
      <StatusBar style="dark" className="bg-neutral-900" />
      
    {/* search bar */}

      <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
              <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                  <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
              </TouchableOpacity>
  
              <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 ">
                  <Text className="text-xl">
                    {
                        lang=='ki'?"Intambwe 1 / 3":
                        lang=='sw'? 'Hatua ya 1/3':
                        lang=='fr'?"Etape 1 / 3":
                        lang=='en'?"Step 1 / 3":''

                      }
                  </Text>
              </TouchableOpacity>
          </SafeAreaView>
      
          <View>  
              <Image
                 
                  source={ICONS.house9}
                  style={{width, height: height*0.50,borderBottomRightRadius:20,borderBottomLeftRadius:20}} 
              />
  
      
       
    <LinearGradient

          colors={['#38AAA4', 'rgba(23, 23, 23, 1)']}
          start={{y: 0.0, x: 0.0}}
          end={{y: 1.0, x: 0.0}}
          style={{marginTop:-230}} 
              className={"block rounded-xl mx-10   bg-neutral-50 p-4 "}> 
    <Text className="text-xl text-center text-bold text-white " >
              {
                 lang=='ki'?"UZUZA":
                 lang=='sw'? 'FOMU':
                 lang=='fr'?"FORMULAIRE":
                 lang=='en'?"FORM":''

              }
                      </Text>
    </LinearGradient>
     
      
      
          
            {/*Formulaire List*/}
            <SafeAreaView 
            className={"block rounded-lg mx-4 my-10 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}
    
    >
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
                  defaultOption={typeList[1]}
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
                selected={currency}
                onSelected={(value) => setCurrency(value)}
                radioBackground="#38AAA4">
                  
                   
                    <RadioButtonItem value="1"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          F
                          </Text>
                    } />
                    <RadioButtonItem
                    value="2"
                    label={
                        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                          USD
                          </Text>
                    }
                    />
                  
            </RadioButtonGroup>
            </View> 
            </View>

    { type == 2 || (type != 2 && action == 2)  ? '': (
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

    { type == 2 || (type != 2 && action == 2)? (

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
    
    { type == 2 ? '': ( 
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
                   marginTop:10}}
                selected={carreaux}
                onSelected={(value) => setCarreaux(value)}
                radioBackground="#38AAA4">

                    <RadioButtonItem value="1"
                    label={
                        <Text >
                          
                          {
                            lang=='ki'?"Isima":
                            lang=='sw'?'Ciment':
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
                            lang=='sw'?'Carreaux':
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
                   marginTop:10}}
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
                defaultOption={nombre[0]}
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
                defaultOption={nombre[1]}
                setSelected={(val) => setDouche(val)} 
                data={nombre} 
                save="value"
                />
        
       
            <View style={{marginLeft:10}}>
                <RadioButtonGroup
                selected={disposition}
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

    {type == 1 ? (

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
                defaultOption={nombre[1]}
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
onChangeText ={Text => setDetail(Text)} />
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

export default Add

