import { View, Text, Image, Dimensions, TouchableOpacity, ScrollView, Platform,Linking,Button  } from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import { LinearGradient } from 'expo-linear-gradient'
import { PhoneIcon, ChevronLeftIcon, CurrencyDollarIcon, CameraIcon, TrashIcon, } from 'react-native-heroicons/outline';
import { CubeIcon, HeartIcon, HomeIcon, KeyIcon, MapPinIcon, PencilIcon, StopIcon} from 'react-native-heroicons/solid';
import { SafeAreaView } from 'react-native-safe-area-context';
import { styles, theme } from '../../theme';
import { COLORS, ICONS, ROUTES } from '../../constants';
import PhotoList from '../../components/PhotoList';
import { fetchDelete, fetchGalery, fetchOccupied, fetchSimilar, imgUrl } from '../../api/PropertyDb';
import { ImageBackground } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Loading from '../../components/Loading';
import Waiting from '../../components/Waiting';
import RentList from '../../components/RentList';

const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
const verticalMargin = ios? '':' my-3';
var {width, height} = Dimensions.get('window');


const Detail = () => {


  const navigation = useNavigation();
  const [isFavourite, toggleFavourite] = useState(false);
  const [loading, setLoading] = useState(false);


  const [userType,setUserType] = useState(false)
  const [iduser,setIduser] = useState('')
  const [lang,setLang] = useState(false)
  const [datas, setDatas] = useState([1,2,3,4,5]);
  const [housees,setHouses] = useState([])
  
  const [photos,setPhotos] = useState([])



    const route = useRoute()
    const {id_property,type,action,price,currency,are,room,stock,salon,bathroom,disposition,carreaux,roof,
    water,houses,detail,img,id_province,name_province,id_comm,name_comm,id_zone,name_zone,id_quart,name_quart,avenue,numero,owner,status,date_pub,id_user,first_name,
    last_name,username,email,phone,phone1,whatsapp,online} = route.params;

  


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


  useEffect(()=>{
    getLanguage()
    getUserType();
    getPhotosList(id_property)
    getId();
    getSimilar()
    },[]);

      useEffect(()=>{
        getLanguage()
        getUserType();
        getPhotosList(id_property)
        getId();
        getSimilar()
        },[lang]);
  
    
    const getId = async()=>{
        const data = await AsyncStorage.getItem('id')
        setIduser(JSON.parse(data))
   }
     
    const getUserType = async()=>{
      const data = await AsyncStorage.getItem('type')
         setUserType(JSON.parse(data))
     }
  


    const imgPath= imgUrl+img

    const phoneFormat = (num) => {
        return num.toString().replace(/(\d)(?=(\d{2})+(?!\d))/g, '$1 ')
     }

     const dialCall = (number) => {
        let phoneNumber = '';
        const numberog = '+257'+number
        if (Platform.OS === 'android') { phoneNumber = `tel:${numberog}`; }
        else {phoneNumber = `telprompt:${numberog}`; }
        Linking.openURL(phoneNumber);
     };

     const tsappText = (number,msg) => {
        
        const numberog = '+257'+number
        let phoneNumber = 'whatsapp://send?text= idInzu'+msg+'&phone='+number;
        Linking.openURL(phoneNumber);
     };

     const currencyFormat= (num) => {
        return num.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, '$1.')
      }

     
    const handleOccupied = async()=>{

        setLoading(true)

        Data = {
                id:id_property,
                status:status
              }

        fetchOccupied(Data)
            .then((response)=>response.json())
            .then((response)=>{
                
            setLoading(false)

            if(response[0].Message == 1){
                alert('Modifie avec Succes')
            }

            })
      }

      const handleModify = async()=>{

        Data =
            {
                id : id_property,
                type : type,
                action : action,
                price : price,
                currency : currency,
                are : are,
                room : room,
                stock : stock,
                salon : salon,
                bathroom : bathroom,
                disposition : disposition,
                carreaux : carreaux,
                roof : roof,
                water : water,
                houses : houses,
                detail : detail,
                img : img,
                province : id_province,
                commune : id_comm,
                zone : id_zone,
                quarter : id_quart,
                avenue : avenue,
                numero : numero,
                owner : owner,
                status : status,
                date_pub : date_pub,
                id_user : id_user,
                first_name : first_name,
                last_name : last_name,
                username : username,
                email : email,
                phone : phone,
                phone1 : phone1,
                whatsapp : whatsapp,
                online: online

            }

            navigation.navigate(ROUTES.EDITPROPERTY,Data);
        
      }

      const [showBox, setShowBox] = useState(true);

  const showConfirmDialog = () => {
    return Alert.alert(
      "Are your sure?",
      "Are you sure you want to remove this beautiful box?",
      [
        // The "Yes" button
        {
          text: "Yes",
          onPress: () => {
            setShowBox(false);
          },
        },
        // The "No" button
        // Does nothing but dismiss the dialog when tapped
        {
          text: "No",
        },
      ]
    );
  };
   

      const handleDelete = async()=>{

           setLoading(true)

        Data = {
                id:id_property
              }

        fetchDelete(Data)
            .then((response)=>response.json())
            .then((response)=>{
                
               
            setLoading(false)
            
            if(response[0].Message == 1){
                alert('Supprime avec Succes')

                navigation.goBack()
            }

            })
       
      }


      
  const getSimilar = async ()=>{

    setLoading(true)

    Data ={
      id:id_property,
      type:type,
      action:action,
      zone:id_zone,
      room:room,
      price:price
    }

    
    await fetchSimilar(Data)
    .then((response)=>response.json())
    .then((response)=>{

      
      setHouses(response)

     
      setLoading(false)


    })

  }

 
  
  const getPhotosList = async()=>{

    Data ={
        id_prop : id_property
    }

    await fetchGalery(Data)
    .then((response)=>response.json())
    .then((response)=>{

      setPhotos(response)


     
    })

  }




  return (
    <View>
    

    <ScrollView>
            <View>

      {/* back button and movie poster */}
      <View className="w-full">

         {/* <View style={styles.screen}>
            {showBox && <View style={styles.box}></View>}
            <Button title="Delete" onPress={() => showConfirmDialog()} />
        </View> */}
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}}
             className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                <HeartIcon size="35" color={isFavourite? theme.background: 'white'} />
            </TouchableOpacity>
        </SafeAreaView>

       
    
                <View>  
                    <Image 
                        // source={require('../assets/images/moviePoster2.png')} 
                        source={{uri: imgPath}} 
                        style={{width, height: height*0.55}} 
                    />
                    
                    <LinearGradient 
                        colors={['transparent', 'grey']} 
                        style={{width, height: height*0.13}}
                        start={{ x: 0.5, y: 0 }}
                        end={{ x: 0.5, y: 1 }}
                        className="absolute bottom-0"
                    >
                       <View className="mt-6">
                        
                        <Text className="text-2xl text-white font-bold text-center">
                        {
                              type == 1 ? 
                                salon==0?lang=='en'?'Room':'Chambrette'
                                                
                                                :
                                                
                                room>1? lang=='ki'?'Ivyumbe '+ room +' na Salon '+salon>1?salon:'':
                                            lang=='sw'? 'Vyumba ' + room +' na Salon '+salon>1?salon:'':
                                            lang=='fr'?room+' Chambres'+salon>1?salon+' Salons ':' Salon':
                                            lang=='en'?room+' Rooms'+salon>1?salon+' Living Rooms ':' Living Room':''
                                            
                                            :

                                            lang=='ki'?'Icumba '+  room+' na Salon '+salon>1?salon:'':
                                            lang=='sw'? 'Cumba ' +  room+' na Salon '+salon>1?salon:'':
                                            lang=='fr'?room+' Chambre'+salon>1?salon+' Salons ':' Salon':
                                            lang=='en'?room+' Room'+salon>1?salon+' Living Rooms ':' Living Room':''
                                            
                                            :

                                type == 2 ? 'Are':
                                                    lang=='ki'?"Imangazini & Ibiro":
                                                    lang=='sw'? "Duka & Ofisi":
                                                    lang=='fr'?"Magasin & Bureau":
                                                    lang=='en'?"Shop & Office":''

                        }
                            
                        </Text>
                        
                    </View>
                    </LinearGradient>
                </View>
                
        <Text className="mx-10 mt-5"> 
                {

                    lang=='ki'?"Yashizweko  "+date_pub:
                    lang=='sw'? "Ilitangazwa  "+date_pub:
                    lang=='fr'?"Publie le " +date_pub:
                    lang=='en'? "Published on " +date_pub:''
                    }
                    </Text>

        <Text className="text-3xl text-center my-6">
                {
                    lang=='ki'?"Nimero ":
                    lang=='sw'? "Nambari ":
                    lang=='fr'?"Numero ":
                    lang=='en'? "Number ":''
                }
            : {id_property}
        </Text>

    <ImageBackground source={ICONS.backgdi} resizeMode="cover" >
                   
        
        <SafeAreaView className={"block rounded-lg mx-4 mt-5 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}>
          
                
                        

          <View style={{marginTop:-20,
                    ...styles.rows}}>
            
  
          
          <TouchableOpacity
                    activeOpacity={0.7}
                    style={{justifyContent:'center',alignItems:'center',...styles.camera}}
                    >
                        <LinearGradient
                            colors={['#38AAA4', 'red']}
                            start={{y: 0.0, x: 0.0}}
                            end={{y: 1.0, x: 0.0}}
                            style={{justifyContent:'center',alignItems:'center',width:70,height:70,borderRadius:20}}>
                    <KeyIcon size="50" strokeWidth={2.5} color="white"/>
                </LinearGradient>
                    
                    <Text className="text-black text-bold  text-center mt-2">
                        {
                            action==1?
            
                                lang=='ki'?"Irakoteshwa":
                                lang=='sw'? 'Kwa kukodisha':
                                lang=='fr'?"A louer":
                                lang=='en'?"For rent":''

                                :
                                
                                lang=='ki'?"Iragurishwa":
                                lang=='sw'? 'Inauzwa':
                                lang=='fr'?"A vendre":
                                lang=='en'?"For sale":''
                        }
                        </Text>
  
                </TouchableOpacity> 
                
                <TouchableOpacity
                    activeOpacity={0.7}
                    style={{justifyContent:'center',alignItems:'center',...styles.camera}}
                    >
                <LinearGradient
                colors={['#38AAA4', 'chocolate']}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}
                style={{justifyContent:'center',alignItems:'center',width:70,height:70,borderRadius:20}}>
  
                
                    <CurrencyDollarIcon  size="50" strokeWidth={2.5} color="white"/>
            </LinearGradient>

            <Text className="text-black text-bold mt-2 text-center ">
                            {currencyFormat(price)} {currency==1?' F':' $'} </Text>
             </TouchableOpacity> 

            {type==2?'':(
            <TouchableOpacity
                    activeOpacity={0.7}
                    style={{justifyContent:'center',alignItems:'center',...styles.camera}}
                    >
                    <LinearGradient
                            colors={['#38AAA4', 'red']}
                            start={{y: 0.0, x: 0.0}}
                            end={{y: 1.0, x: 0.0}}
                            style={{justifyContent:'center',alignItems:'center',width:70,height:70,borderRadius:20}}>
  
                
                    <CubeIcon  size="50" strokeWidth={2.5} color="white"/>
                    
                    </LinearGradient>
                    <Text className="text-black text-bold mt-2  text-center ">
                        {
                            type == 2 ? '':
                            carreaux == 1 ? 
                                lang=='ki'?"Isima":
                                lang=='sw'?'Saruji':
                                lang=='fr'?"Ciment":
                                lang=='en'?"Cement":'' 
                                
                                :

                                lang=='ki'?"Ikaro":
                                lang=='sw'?'Vigae':
                                lang=='fr'?"Carreaux":
                                lang=='en'?"Tiles":''
                        
                              
                          }
                    </Text>
                    
            </TouchableOpacity> 
            
                    )}
  
          
          </View>
 
  
       
      </SafeAreaView> 
{ type == 2 ? '': ( 
      <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
    
    
        <View >
       
           

        <Text className="text-2xl text-bold -mt-2">
            
        {
            lang=='ki'?"UKO IMEZE":
            lang=='sw'? 'MAELEZO':
            lang=='fr'?"DETAILS":
            lang=='en'?"DETAILS":''
        
        }

        </Text>

        <View className="mx-7">
        <View >
        <Text className="mb-2  mt-5 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
            {
                lang=='ki'?"Dushe na Toilette":
                lang=='sw'?'Bafuni':
                lang=='fr'?"Douche et Toilette":
                lang=='en'?"Bathroom":''
          
            }  :  { bathroom} {disposition==1? 
                
                                lang=='ki'?"Hanze":
                                lang=='sw'?'nje':
                                lang=='fr'?"Déhors":
                                lang=='en'?"Out":''
                                     
                                     :
                                     
                                lang=='ki'?"Indani":
                                lang=='sw'?'Ndani':
                                lang=='fr'?"À l'intérieur":
                                lang=='en'?"Inside":''
                            }
            </Text>
        </View>

        <View >
        <Text className="mb-2  mt-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50">
                {
                     lang=='ki'?"Amatara n'amazi":
                     lang=='sw'? 'Umeme na Maji':
                     lang=='fr'?"Electricite et Eau":
                     lang=='en'?"Electricity and Water":''
              
                  } :  {water ==1?  
                    
                        lang=='ki'?"Uririhira":
                        lang=='sw'? 'Unajilipa':
                        lang=='fr'?"Exclus ":
                        lang=='en'?"Excluded":''
                            :
                        lang=='ki'?"Nturiha":
                        lang=='sw'? 'Haulipi':
                        lang=='fr'?"Inclus ":
                        lang=='en'?"Included":''
                           
                           }
            </Text>
        </View>
    

        <View >
              <Text className="mb-2 mt-2 text-ms font-medium leading-tight text-neutral-800 dark:text-neutral-50  ">
                        {
                            lang=='ki'?"Parafo":
                            lang=='sw'?'Dari':
                            lang=='fr'?"Plafond":
                            lang=='en'?"Ceiling":''
                    
                        } : {roof==1?
                                lang=='ki'?"Isanzwe":
                                lang=='sw'?'Rahisi':
                                lang=='fr'?"Simple":
                                lang=='en'?"Simple":'' 
                                    : 
                                'Dubai'
                            }
                </Text>

           </View>
       
    {type == 3 ? '':(
      <View>
        <View>
        
       
        {salon>0?(
        <View>

            
  
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-2">
            {
              lang=='ki'?"Salon":
              lang=='sw'?'Salon':
              lang=='fr'?"Salons":
              lang=='en'?"Living rooms":''
            
              }  : { salon}
            </Text>
           
        </View>

        ):''}
        
        <View>
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-2">
            {
            lang=='ki'?"Akumba ka Stoke":
            lang=='sw'?'Sebule':
            lang=='fr'?"Chambres de Stock":
            lang=='en'?"Stock rooms":''
          
            }  :  { stock}</Text>
           
        </View>
       
       
        </View>

       </View> 
    )}

    {type == 1 ? (

        <View>
        <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-2">
            {
               lang=='ki'?"Inzu birikumwe murupangu ":
               lang=='sw'?'Nyumba katika Kiwanja kimoja':
               lang=='fr'?"Maisons dans la meme Parcelle ":
               lang=='en'?"Houses in the same Plot ":''
             
            }   : {houses}
            </Text>
            
        </View>
  ):''}

</View>



{detail?(
    <View>
            <Text className="text-black text-xl mt-5 mb-3">
                
            {
                lang=='ki'?"Ibindi":
                lang=='sw'?'Mambo mengine ya kutaja ':
                lang=='fr'?"Autres details à mentionner":
                lang=='en'?"Other details to mention":''
                
            }       

            </Text>
                        <Text className="text-neutral-600 tracking-wide">
                            {
                               detail
                            }
                        </Text>
            </View>
        ):''}

</View>
</SafeAreaView>
)}
                    <View className="my-6 mx-5 space-y-2 ">
                        
                       <Text className="text-2xl">
                       {
                        lang=='ki'?"AHIRI  ":
                        lang=='sw'? 'ANWANI ':
                        lang=='fr'?"ADRESSE ":
                        lang=='en'?"ADRESSE ":''

                      }
                       </Text>

                        <View style={styles.rows} className="mt-10 mb-10">
                        <MapPinIcon size="40" strokeWidth={2} color="#38AAA4" />
                        <Text className=' font-bold text-center text-xl ml-2 mt-5' style={{color:'black'}}>
                         {name_quart} ,  { name_zone} - { name_comm} , { name_province}
                         </Text> 
                         </View>

                        
                    </View>
                </ImageBackground>

                  {/* person details */}

        {iduser != owner?(

<View 
className="flex-1  mt-8 mb-10" 
contentContainerStyle={{paddingBottom: 20}}>
{/* back button */}
        <View 
            className={"flex-row justify-between items-center mx-4 z-10 "}>
            <TouchableOpacity style={{backgroundColor:'#38AAA4'}} className="rounded-xl p-1" >
            <Text className="text-MS text-white font-bold text-center items-center">
                {userType? userType==1?
                    lang=='ki'?"UMU AGENT":
                    lang=='sw'? 'AGENT':
                    lang=='fr'?"AGENT":
                    lang=='en'?"AGENT":''
                            :
                    lang=='ki'?"NYENEYO ":
                    lang=='sw'? 'ANWANI ':
                    lang=='fr'?"PROPRIETAIRE ":
                    lang=='en'?"LANDLORD":''
                            :
                    'AGENT'}</Text>
            </TouchableOpacity>

        
        </View>

    <View>
        <View 
            className="flex-row justify-center"
            style={{
                shadowColor: 'gray',
                shadowRadius: 40,
                shadowOffset: {width: 0, height: 2},
                shadowOpacity: 1,
            }}
        >
        </View>
    
        <View className="mt-6 mb-10">
            <Text className="text-xl text-black font-bold text-center">
                 {first_name} {last_name} 
                
            </Text>


            {phone?(

        <View style={styles.row}>
                <Text className="text-black text-base text-center">
                <PhoneIcon size={20} strokeWidth={2} color={COLORS.primary}/>  
                +257 {phone?phoneFormat(phone):''}
                </Text>

                <TouchableOpacity
                style={{marginLeft:10}}
                    onPress={()=>dialCall(phone)}
                    activeOpacity={0.7}>
                <View >
                <LinearGradient
                colors={['#38AAA4', 'red']}
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '150%',
                    height: 30,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                {/******************** Ajouter BUTTON *********************/}
                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70}}>
                
                
                <Text style={styles.loginText}>
                    {
                    lang=="ki"?"telefona":
                    lang=="sw"? "Mpigie simu":
                    lang=="fr"?" Apéler":
                    lang=="en"?"Call":""
                    }
                </Text>
                </View>
                </LinearGradient>
                </View>

                </TouchableOpacity>
                
        </View>
        ):''}

        {phone1?(
        <View style={styles.row}>
                <Text className="text-black text-base text-center">
                <PhoneIcon size={20} strokeWidth={2} color={COLORS.primary}/>  
                +257 {phone1?phoneFormat(phone1):''}
                </Text>

                <TouchableOpacity
                style={{marginLeft:10}}
                    onPress={()=>dialCall(phone1)}
                    activeOpacity={0.7}>
                <View >
                <LinearGradient
                colors={['#38AAA4', 'chocolate']}
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '150%',
                    height: 30,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                {/******************** Ajouter BUTTON *********************/}
                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70}}>
                
                <Text style={styles.loginText}>
                    
                    {
                        lang=="ki"?"telefona":
                        lang=="sw"? "Mpigie simu":
                        lang=="fr"?" Apéler":
                        lang=="en"?"Call":""
                    }

                </Text>
                </View>
                </LinearGradient>
                </View>

                </TouchableOpacity>
                
        </View>
        ):''}
        {whatsapp?(
        <View style={styles.row}>
                
                <Image source={ICONS.whatsapp}
                style={{width:width*0.07,height:height*0.04}}/>
                 <Text className="text-black text-base text-center">
                    +257 {whatsapp? phoneFormat(whatsapp):''}
                </Text>

                <TouchableOpacity
                style={{marginLeft:10}}
                    onPress={()=> tsappText(whatsapp,id_property)}
                    activeOpacity={0.7}>
                <View >
                <LinearGradient
                colors={['#38AAA4', 'black' ]}
                style={{
                    textAlign: 'center',
                    justifyContent: 'center',
                    alignItems: 'center',
                    width: '150%',
                    height: 30,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                <View style={{flexDirection: 'row',
                            alignItems: 'center',
                            justifyContent: 'center',
                            width: 70}}>
                
                
                <Text style={styles.loginText}>
                    

                    {
                        lang=="ki"?"Andika":
                        lang=="sw"? "Mtumiye":
                        lang=="fr"?"Contacter":
                        lang=="en"?"Enter Chat":""
                    }

                </Text>
                </View>
                </LinearGradient>
                </View>

                </TouchableOpacity>
                
        </View>
        ):''}
           
            
        </View>

        </View>
    

    </View>
    
    ):(

        <View 
className="flex-1  mt-8 mb-10" 
contentContainerStyle={{paddingBottom: 20}}>
{/* back button */}
        <View 
            className={"flex-row justify-between items-center mx-4 z-10 "}>
            <TouchableOpacity style={{backgroundColor:'#38AAA4'}} className="rounded-xl p-1" >
            <Text className="text-xl text-white font-bold text-center ">
                </Text>
            </TouchableOpacity>

        
        </View>

        <View>
        
    
        <View className="mt-6 mb-10">
        
        <View style={styles.row}>
                
                <TouchableOpacity
                style={{marginLeft:10}}
                    onPress={handleOccupied}
                    activeOpacity={0.7}>
                
                <LinearGradient
                colors={['#38AAA4', 'red']}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:10,
                    width:120,
                    height: 40,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                <StopIcon  size={20} strokeWidth={2} color={COLORS.white}/>
                <Text className="text-white">
                    {
                        status==1?
                            lang=="ki"?action==1?"Yarafashwe":"Yaragurishijwe":
                            lang=="sw"?action==1?"Isha kodeshwa":"isha uzishwa":
                            lang=="fr"?action==1?"Deja louer":"Deja vendu":
                            lang=="en"?action==1?"Already rented":"Already Sold":""
                                :
                            lang=="ki"?action==1?"Irapangishwa":"Iragurishwa":
                            lang=="sw"?action==1?"Inakodeshwa":"inauzishwa":
                            lang=="fr"?action==1?"A louer":"A vendu":
                            lang=="en"?action==1?"For rent":"For sale":""
                    }
                </Text>
                
                </LinearGradient>
                

                </TouchableOpacity>

{/* Button pour Editer */}

                <TouchableOpacity
                style={{marginLeft:50}}
                    onPress={()=>navigation.navigate(ROUTES.ADD2,{id:id_property})}
                    activeOpacity={0.7}>
                <View >
                <LinearGradient
                colors={['#38AAA4', 'chocolate']}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:10,
                    width:120,
                    height: 40,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                    <CameraIcon  size={20} strokeWidth={2} color={COLORS.white}/>
                    <Text className="text-white">
                        
                    {
                            lang=="ki"?"Ongerako Amafoto":
                            lang=="sw"?"Ongeza Pica":
                            lang=="fr"?"Ajouter Photos":
                            lang=="en"?"Add Pictures":""
                    }

                    </Text>

                </LinearGradient>
                </View>

                

                </TouchableOpacity>
                </View>
                <View style={styles.rows}>

                <TouchableOpacity
               
                    onPress={handleModify}
                    activeOpacity={0.7}>
               
                <LinearGradient
                colors={['#38AAA4', 'black' ]}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:10,
                    width:120,
                    height: 40,
                    borderRadius: 10,
                    
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                    <PencilIcon  size={20} strokeWidth={2} color={COLORS.white}/>
                    <Text className="text-white">
                        
                        {
                                lang=="ki"?"Guhindura":
                                lang=="sw"?"Ongeza Pica":
                                lang=="fr"?"Editer":
                                lang=="en"?"Edit":""
                        }


                    </Text>
                </LinearGradient>
                

                </TouchableOpacity>

                <TouchableOpacity
                style={{marginLeft:50}}
                    onPress={handleDelete}
                    activeOpacity={0.7}>
                
                <LinearGradient
                colors={['#38AAA4', 'darkblue' ]}
                style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding:10,
                    width:120,
                    height: 40,
                    borderRadius: 10,
                }}
                start={{y: 0.0, x: 0.0}}
                end={{y: 1.0, x: 0.0}}>

                <TrashIcon  size={20} strokeWidth={2} color={COLORS.white}/>
                    <Text className="text-white">
                    {
                                lang=="ki"?"Yifurte":
                                lang=="sw"?"Futa":
                                lang=="fr"?"Supprimer":
                                lang=="en"?"Delete":""
                        }
                    </Text>
                
                </LinearGradient>
                

                </TouchableOpacity>
                
        </View>
       
           
            
        </View>

        

    </View>
      

     </View>
 


    )}

                    {/* person movies */}

                    
                     <PhotoList title={
                            lang=='ki'?"Amafoto":
                            lang=='sw'? "Pica":
                            lang=='fr'?"Photos":
                            lang=='en'?"Photos":''
                        }
                        data={photos} />  

                  
                
                </View>

    

   

      
                </View>

                <View>
                    

                {
                    loading?(

                        <Waiting data={datas}/>

                    ):(
                        
                    housees.Message?'':

                        <RentList 

                        title={

                        lang=='ki'?"Izo bisa":
                        lang=='sw'? 'Zenye zinafanana':
                        lang=='fr'?"Similaires":
                        lang=='en'?"Similkar":''
                        } 

                        data={housees} page={ROUTES.DETAIL} backgd="" types="1" zone="" action=""/>
                    )}


                </View>
         
                

    </ScrollView>
    

</View>
    
  )
}

export default Detail