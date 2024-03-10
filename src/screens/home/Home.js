import { ImageBackground,View, Text, ScrollView,Platform,Image,Animated } from 'react-native'
import React, { useEffect,  useState } from 'react'
import RentList from '../../components/RentList';
import { COLORS, ICONS, ROUTES } from '../../constants';
import { TouchableOpacity } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchProperties, fetchZone} from '../../api/PropertyDb';
import { useNavigation } from '@react-navigation/native';
import Bar from '../../components/Bar';
import SearchBar from '../../components/SearchBar';
import Waiting from '../../components/Waiting';
import { styles } from '../../theme';


const Home = () => {

 const navigation = useNavigation();

  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';

  const [loading, setLoading] = useState(false);
  const [iduser,setIduser] = useState(false)
  const [userType,setUserType] = useState(false)
  const [lang,setLang] = useState(false)

  const [datas, setDatas] = useState([1,2,3,4,5]);


  
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

  const [houses,setHouses] = useState([])
  const [lands,setLands] = useState([])
  const [apparts,setApparts] = useState([])
  const [zones,setZones]= useState([]);

  useEffect(()=>{
     getAppartsList();
     getLandList();
     getHouseList();
     getZoneList();
     getUserType();
     getId();
     getLanguage()

    
  },[]);

  useEffect(()=>{

       getAppartsList();
       getLandList();
       getHouseList();
       getZoneList();
       getUserType();
       getId();
       getLanguage()


    },[lang]);


  const getZoneList = async ()=>{

    Data={
      type:1
    }

    await fetchZone(Data)
    .then((response)=>response.json())
    .then((response)=>{
    
        setZones(response)
  
    })
  
  }

  const getHouseList = async ()=>{

    setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:1,
      action:'',
      zone:'',
      quartier:'',
      limit:0
    }

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
      zone:'',
      quartier:'',
      limit:0
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

  const getAppartsList = async ()=>{

    setLoading(true)

    Data ={
      userType:userType?userType:1,
      type:3,
      action:'',
      zone:'',
      quartier:'',
      limit:0
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

  


  return (
    
    
       <Animated.View className={"rounded-lg mb-10 bg-white "+topMargin} >

    
    {/* search bar */}
    
    <Bar/>
    

    <ScrollView 
            showsVerticalScrollIndicator={false} 
            contentContainerStyle={{paddingBottom: 10}}
            
          >
            
      <SearchBar/>

      <ScrollView 
              horizontal
              showsHorizontalScrollIndicator={false}
              className="text-center mx-2"
          >
      
      
      {
                  zones && zones.map((item)=>{
                      return (
                          <TouchableOpacity 
                          onPress={()=>navigation.navigate(ROUTES.QUARTIER2,{zone:item.id_zone,name_zone:item.name_zone})}
                              className="mr-4 mb-2 items-center">
                              <View 
                                  className="overflow-hidden rounded-full h-15 w-15 items-center border border-neutral-1000 mt-5">
                                  <Image 
                                      className="rounded-2xl h-10 w-10"
                                      source={ICONS.house1} 
                                  />
                              </View>
                              
                            
                              <Text className="text-neutral-600 text-xs">
                              {
                                item.name_zone.length>14? item.name_zone.slice(0,14)+'..': item.name_zone
                                  }
                              </Text>
                          </TouchableOpacity>
                      )
                  })
              }
        </ScrollView>
     
              {/*House List*/}
          {loading?(

                <Waiting data={datas}/>

              ):(

            <RentList 
            
              title={
                
                lang=='ki'?"Inzu":
                lang=='sw'? 'Nyumba':
                lang=='fr'?"Maison":
                lang=='en'?"House":''
              } 
              
              data={houses} page={ROUTES.DETAIL} backgd="" types="1" zone="" action=""/>
        )}
        <ImageBackground source={ICONS.bgins} resizeMode="cover" imageStyle={{ borderRadius: 30}} className='mx-3 mt-2 mb-2'>
      <View  className="transition delay-300 duration-300 ease-in-out">
        <Text className="text-xl font-bold mx-6 mt-6 text-white" >
          
        {
                
                lang=='ki'?"Panga canke Gura?":
                lang=='sw'? 'Kodi au Uza':
                lang=='fr'?"Louer ou Acheter?":
                lang=='en'?"Rent or Buy":''
              }
        </Text>

        {
                lang=='ki'?(

              <View className=" text-white justify-center mx-6 mt-4 mb-6">

                <Text className=" text-white mb-2">
                 
                 
                       Rondeza inzu canke Parasera wipfuza hama uheze uhamagare umu agent wacu kugira wishikire 
                       aho biri ubirabe neza ushimye uheze upange canke ugure.
                      
                    </Text>
                    
                
                </View>)
                :

                lang=='sw'? 

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                    Tafuta kati ya nyumba na ardhi tuliyo nayo, ikiwa una nia piga simu wakala wetu akupeleke
                      walipo. kama una nia, kodisha au kununua.
                      
                    </Text>
                    
                    
                    
                    </View>):

                lang=='fr'?(

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                     
                    Cherchez parmi les maisons et terrains que nous avons, si vous êtes intéressé appelez notre agent pour vous emmener
                      où ils sont. si vous êtes intéressé, louez ou achetez.
                    </Text>
                    
                    
                    </View>):

                lang=='en'?

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                      
                    Search among the houses and land we have, if you are interested call our agent to take you
                      where they are. if you are interested, rent or buy.
                    </Text>
                    
                    
                    </View>):""
              }
        
        
      </View>
      </ImageBackground>
    
            {/*Parcelles List*/}
        {loading?(

          <Waiting data={datas}/>

          ):(
            
            <RentList 
              title={
                lang=='ki'?"Parasera":
                lang=='sw'? "Parcelle":
                lang=='fr'?"Parcelle":
                lang=='en'?"Plot":''
              }
            
            data={lands} page={ROUTES.DETAIL} backgd="" types="2" action=""/>
          )}

<ImageBackground source={ICONS.bgins} resizeMode="cover" imageStyle={{ borderRadius: 30}} className='mx-3 mt-2 mb-2'>
      <View className="transition delay-1100 duration-300 ease-in-out">
        
        <TouchableOpacity
        onPress={()=> iduser ? navigation.navigate(ROUTES.ADDHOUSE):  navigation.navigate(ROUTES.LOGIN,{add:1})}>
          <Text className="text-xl font-bold mx-6 mt-6 text-white " >

             {
                
                lang=='ki'?"Andikisha":
                lang=='sw'? 'Tangaza':
                lang=='fr'?"Publier":
                lang=='en'?"Publish":''
              }

          </Text>
        </TouchableOpacity>
        
            
              
            
              {
                lang=='ki'?(

              <View className=" text-white justify-center mx-6 mt-4 mb-6">

                <Text className=" text-white mb-2">
                 
                  Hariho inzu, parasera uzi igurishwa canke ipangishwa?
                  </Text>
                  <Text className=" text-white">
                  Usohotse munzu wahora upanze? 
                  </Text>
                  <Text className=" text-white mb-2"> 
                  Uri nyeninzu canke nyene parasera?
                  </Text>
    
                  <Text className=" text-white mb-1">
                  
                   Nyaragasa uyifotore uyandikishe ngaha abandi bataragutanga,  
                   kuko turiha  20% kunzu  yo gupanga na 5% kunzu canke parasera igurishwa
                   abakiriya bacu bakiyishima,  abavyandikishije ngaha gusa. Aba kiriya bacu ni benshi kuburyo
                  tubura nivyo tubaha.
                   </Text>

                  
                 
                
                </View>)
                :

                lang=='sw'? 

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                      Je, unafahamu nyumba au kiwanja cha kupanga au cha kuuza?
                      </Text>
                      <Text className=" text-white">
                      Je, unahama kutoka ulipokuwa ukikodisha?
                      </Text>
                      <Text className=" text-white mb-2"> 
                      Je, wewe ni Bwana wa nyumba au Ardhi?
                      </Text>
        
                      <Text className=" text-white mb-1">
                      
                        Piga picha haraka na uzichapishe hapa kabla ya wengine kwa sababu Tunamlipa tu aliyetuma hapa.
                        Mara tu wateja wetu wanapovutiwa, tunakulipa 20% na 5% kwa kodi na mauzo.
                        Wateja wetu ni wengi na mara nyingi tunakosa cha kuwapa.

                       </Text>
                      
                    
                    </View>):

                lang=='fr'?(

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                      Connaissez-vous une maison ou une Parcelle à louer ou à vendre ? 
                      </Text>
                      <Text className=" text-white">
                      Vous déménagez de l'endroit où vous louiez ?
                      </Text>
                      <Text className=" text-white mb-2"> 
                      Êtes-vous propriétaire d'une maison ,parcelle ou d'un terrain?
                      </Text>
        
                      <Text className=" text-white mb-1">
                      
                      Prenez des photos rapidement et postez-les ici avant les autres car nous ne payons que celui qui a posté ici.
                      Dès que nos clients sont intéressés, nous vous versons 20% et 5% pour les loyers et pour les ventes.
                      Nos clients sont nombreux souvent nous maquons de quoi les offrir.
                       </Text>
                     
                    </View>):

                lang=='en'?

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                      Do you know a house or a plot for rent or for sale?
                      </Text>
                      <Text className=" text-white">
                      Are you moving from where you were renting?
                      </Text>
                      <Text className=" text-white mb-2"> 
                      Are you a landLord of a house or Land
                      </Text>
        
                      <Text className=" text-white mb-1">
                      
                      Take pictures quickly and post them here before the others because We only pay the one who posted here.
                      As soon as our customers are interested, we pay you 20% and 5% for rents and for sales.
                      Our customers are numerous and often we lack what to offer them.
                       </Text>
                      
                    
                    </View>):""
              }


    <TouchableOpacity  
        style={{textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',}}
        onPress={()=> iduser ? navigation.navigate(ROUTES.ADDHOUSE):  navigation.navigate(ROUTES.LOGIN,{add:1})}>
          <Text style={{width:200, ...styles.text}} className=" font-bold mx-6 mt-3 mb-3 text-center bg-neutral-200 rounded-xl" >

             {
                
                lang=='ki'?"Andikisha ngaha":
                lang=='sw'? 'Tangaza hapa':
                lang=='fr'?"Publier ici":
                lang=='en'?"Publish here":''
              }

          </Text>
        </TouchableOpacity>

        
          
      </View>
      </ImageBackground>



            {/*Bureau List*/}

        {loading?(

              <Waiting data={datas}/>

            ):(

            <RentList 
              title={
                lang=='ki'?"Imangazini & Ibiro":
                lang=='sw'? "Duka & Ofisi":
                lang=='fr'?"Magasin & Bureau":
                lang=='en'?"Shop & Office":''
                
              }
             data={apparts} page={ROUTES.DETAIL}  backgd="" types="3" action=""/>
            
            )}

<ImageBackground source={ICONS.bgins} resizeMode="cover" imageStyle={{ borderRadius: 30}} className='mx-3 mt-2 mb-2'>
      <View  className="transition delay-300 duration-300 ease-in-out">
        <Text className="text-xl font-bold mx-6 mt-6 text-white" >
          
        {
                
                lang=='ki'?"Ukodukora":
                lang=='sw'? 'Jinsi tunavyofanya':
                lang=='fr'?"Comment on travail":
                lang=='en'?"How we work":''
              }
        </Text>

        {
                lang=='ki'?(

              <View className=" text-white justify-center mx-6 mt-4 mb-6">

                <Text className=" text-white mb-2">
                 
                 
                       Utari nyenevyo  Aya 20% na 5% ahabwa wewe 
                       nyeninzu canke parcelle ahabwa ayo gupanga canke kugura gusa.
                      
                    </Text>
                    <Text className=" text-white">
                       Uri nyenizu, canke parcelle yavyiyandikiye ubwawe uhabwa ayo gupanga canke kugura
                       guteranyako naya 20% na 5% kuko niwe uba wavyikoreye. 
                    </Text>
                
                </View>)
                :

                lang=='sw'? 

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                       Ukiwa wewe si mmiliki, hizi 20% na 5% zinalipwa kwako,
                       na mmiliki anapokea tu pesa kutoka kwa kukodisha au kutoka kwa kiwanja kilichouzwa.
                      
                    </Text>
                    <Text className=" text-white">
                      Ukiwa wewe ni mmiliki, Unapokea pesa kutoka kwa kukodisha au
                     ya sehemu iliyouzwa, pamoja na 20% na 5%.
                    </Text>
                    
                    
                    </View>):

                lang=='fr'?(

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                     
                      Si vous n'êtes pas propriétaire ces 20% et 5% vous sont payés,
                       et le propriétaire reçoit uniquement de l'argent de location ou du parcelle vendue.
                    </Text>
                    <Text className=" text-white">
                    Si vous 'êtes le propriétaire , Vous recevez de l'argent provenant de la location ou
                     de la parcelle vendue, plus 20% et 5%.
                    </Text>
                    
                    </View>):

                lang=='en'?

                (

                  <View className=" text-white justify-center mx-6 mt-4 mb-6">
    
                    <Text className=" text-white mb-2">
                    
                     
                       If you are not the owner these 20% and 5% are paid to you,
                       and the owner only receives money from the rental or from the plot sold.
                    </Text>
                    <Text className=" text-white">
                    If you are the owner, You receive money from renting or
                     of the parcel sold, plus 20% and 5%.
                    </Text>
                    
                    </View>):""
              }

      <TouchableOpacity  
        style={{textAlign: 'center',
            justifyContent: 'center',
            alignItems: 'center',
            width: '100%',}}
        onPress={()=> iduser ? navigation.navigate(ROUTES.ADDHOUSE):  navigation.navigate(ROUTES.LOGIN,{add:1})}>
          <Text style={{width:200, ...styles.text}} className=" font-bold mx-6 mt-3 mb-3 text-center bg-neutral-200 rounded-xl" >

             {
                
                lang=='ki'?"Andikisha ngaha":
                lang=='sw'? 'Tangaza hapa':
                lang=='fr'?"Publier ici":
                lang=='en'?"Publish here":''
              }

          </Text>
        </TouchableOpacity>

        
        
      </View>
      </ImageBackground>
            
      <View style={{marginTop:150}}>

      </View>
    </ScrollView>
 
  </Animated.View>
   
  )
}

export default Home

