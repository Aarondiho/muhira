import { View, Text, ActivityIndicator,TouchableOpacity,Platform, SafeAreaView,Image,Dimensions} from 'react-native'
import React, { useEffect, useRef, useState } from 'react'
import { COLORS, ICONS, ROUTES } from '../../constants';
import { styles } from '../../theme';
import { ChevronLeftIcon,CloudArrowDownIcon,TrashIcon,CameraIcon,FolderIcon, CloudArrowUpIcon, PaperAirplaneIcon } from 'react-native-heroicons/outline';
import { LinearGradient } from 'expo-linear-gradient';
import {useNavigation, useRoute} from '@react-navigation/native';
import { imageEndpoint } from '../../api/PropertyDb';
import * as ImagePicker from 'expo-image-picker';
import  * as FileSystem from 'expo-file-system'
import { FlatList } from 'react-native-gesture-handler';
import { ScrollView } from 'react-native';

const imgDir= FileSystem.documentDirectory + 'image/';

const ensureDirExists =async ()=>{
  const dirInfo = await FileSystem.getInfoAsync(imgDir)
  
  if(!dirInfo.exists){

    await FileSystem.makeDirectoryAsync(imgDir, {intermediates:true})
  }


}

const Add2 = () => {

  const navigation = useNavigation();
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const route= useRoute();
  const id = route.params.id;

  const endpoint = imageEndpoint+id;

  const [images, setImages] = useState([]);

  const {loading,setLoading} = useState(false)
  const [lang,setLang] = useState(false)


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


  useEffect(()=>{
    loadImages();
    getLanguage()

  },[])


  const loadImages = async ()=>{

    await ensureDirExists();

    const files = await FileSystem.readAsStringAsync(imgDir);

    if(files.length>0){
      setImages(files.map(f=> imgDir+f));
    }


  }


  
  const selectImage = async (useLibraly) => {
    // No permissions request is necessary for launching the image library
    let result ;

    if(useLibraly){

      await ImagePicker.requestMediaLibraryPermissionsAsync();
      result = await ImagePicker.launchImageLibraryAsync(
        
        {

          mediaTypes: ImagePicker.MediaTypeOptions.Images,
          allowsMultipleSelection:true,
          quality: 0.1
    
        }
      );


    }else{

      await ImagePicker.requestCameraPermissionsAsync();
      result = await ImagePicker.launchCameraAsync( {

        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        maxWidth: 500,
        maxHeight: 500,
        quality: 0.1,
  
      });


    }
   

    if (!result.canceled) {

      const image = result.assets[0].uri;
        saveImage(image);
    }
  };

  const saveImage =async (uri)=>{
    await ensureDirExists();

    const filename = new Date().getTime()+'.jpg';
    const dest = imgDir +filename;
    await FileSystem.copyAsync({from:uri, to:dest})
    setImages([...images, dest])

  }


     
    const deleteImage =async (uri)=>{

      await FileSystem.deleteAsync(uri);

      setImages(images.filter((i)=>i !==uri));

    }

    const uploadImage =async (uri)=>{

      
      try {

       

        const response = await FileSystem.uploadAsync(endpoint, uri, {
          fieldName: 'file',
          httpMethod: 'POST',
          uploadType: FileSystem.FileSystemUploadType.MULTIPART,
        })
        console.log(JSON.stringify(response, null, 4))
        deleteImage(uri)

        if(images.length<1){
          navigation.navigate(ROUTES.PROFILE)
        }

      } catch (error) {
        console.log(error);
      }
     
}




    
const renderItem =({item})=>{

  const filename = item.split('/').pop();

  return(
    <View style={{flexDirection:'row',margin:1,alignItems:'center',gap:2}}>
      <Image style={{width:60,height:60,borderRadius:20}} source={{uri:item}} />
      

      
     

      <TouchableOpacity onPress={()=>deleteImage(item)} style={{marginLeft:10}}>
      <LinearGradient
                            colors={['#38AAA4', 'black']}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding:10,
                                height: 40,
                                borderRadius: 10,
                            }}
                            start={{y: 0.0, x: 0.0}}
                            end={{y: 1.0, x: 0.0}}>
      <TrashIcon  size="12" strokeWidth={2.5} color="white"/>
      <Text className="text-white text-sm">

                      {
                        lang=="ki"?"Futa":
                        lang=="sw"? "Futa":
                        lang=="fr"?"Supprimer":
                        lang=="en"?"Delete":""
                      }
        
        </Text>
      </LinearGradient>
      </TouchableOpacity> 

 <TouchableOpacity onPress={()=>uploadImage(item)} style={{backgroundColor:'green', borderRadius:10,marginLeft:10}}> 
            
            <LinearGradient
                            colors={['#38AAA4', 'red']}
                            style={{
                                flexDirection: 'row',
                                alignItems: 'center',
                                justifyContent: 'center',
                                padding:10,
                                height: 40,
                                borderRadius: 10,
                            }}
                            start={{y: 0.0, x: 0.0}}
                            end={{y: 1.0, x: 0.0}}>

                            <PaperAirplaneIcon size={12} strokeWidth={2} color={COLORS.white}/>
                            <Text className="text-white text-sm">
                              
                              {
                                lang=="ki"?"Rungika":
                                lang=="sw"? "Tuma":
                                lang=="fr"?"Envoyer":
                                lang=="en"?"Send":""
                              }
                            </Text>
                            
                            </LinearGradient>
      </TouchableOpacity>

    </View>

  )

}
  


  
  return (
    <ScrollView className={"rounded-lg mb-10 bg-white "+topMargin}
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}
  >

      {loading? (
          <View 
          >
           

          </View>

        ):(

          <View>
      
    {/* search bar */}

    <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-1 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 " onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 ">
              <Text className="text-xl"> 
                    {
                        lang=='ki'?"Intambwe 3 / 3":
                        lang=='sw'? 'Hatua ya 3 / 3':
                        lang=='fr'?"Etape 3 / 3":
                        lang=='en'?"Step 3 / 3":''

                      }
                </Text>
              </TouchableOpacity>
        </SafeAreaView>
    
        <View>  
            <Image
               
                source={ICONS.house9}
                style={{width, height: height*0.25,borderBottomRightRadius:30,borderBottomLeftRadius:30}} 
            />

            
           
         
    <View  className="rounded-lg mx-2 mb-10 bg-white "
            
            Style={{marginBottom:10}}
            style={{marginTop:-20}}
          >
            <Text className="text-2xl text-center mt-5">

                    {
                        lang=='ki'?"HITAMWO AMAFOTO":
                        lang=='sw'? 'CHAGUA PICA':
                        lang=='fr'?"CHOISIR IMAGES":
                        lang=='en'?"CHOOSE IMAGES":''

                      }
              
            </Text>
            {/*Formulaire List*/}
            <SafeAreaView className={"block rounded-lg mx-4 my-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
          
            

        <View style={styles.row}>
          

        <LinearGradient
            colors={['#DAA520', '#6495ED']}
            style={styles.camera}
            start={{y: 0.0, x: 0.0}}
            end={{y: 1.0, x: 0.0}}>
        <TouchableOpacity
                  onPress={()=>selectImage(true)}
                  activeOpacity={0.7}
                  >
                  <FolderIcon size="58" strokeWidth={2.5} color="red"/>

              </TouchableOpacity> 
              </LinearGradient>

              <LinearGradient
            colors={['#38AAA4', 'grey']}
            style={{
              marginLeft:50,
              ...styles.camera}}
            start={{y: 0.0, x: 0.0}}
            end={{y: 1.0, x: 0.0}}>

              <TouchableOpacity
                  onPress={()=>selectImage(false)}
                  activeOpacity={0.7}
                  >
                  <CameraIcon  size="58" strokeWidth={2.5} color="red"/>

              </TouchableOpacity> 
          </LinearGradient>
                  

        
        </View>
        <Text className="text-center text-xl mt-2 mb-2"> 
                  {
                        lang=='ki'?"Amafoto nahisemwo":
                        lang=='sw'? 'Pica zenye nimechagua':
                        lang=='fr'?"Images Choisis":
                        lang=='en'?"My images":''

                      }</Text>

        <FlatList data={images} renderItem={renderItem}/>
        

       

     
    </SafeAreaView> 


    </View>
    
   

      </View>
      </View>
      )
        }
      

</ScrollView>
  )
}


export default Add2