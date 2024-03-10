import { View,Image, Dimensions, TouchableOpacity, ScrollView, Platform} from 'react-native'
import React from 'react'
import { useNavigation, useRoute } from '@react-navigation/native'
import {ChevronLeftIcon } from 'react-native-heroicons/outline';
import { SafeAreaView } from 'react-native-safe-area-context';


const ios = Platform.OS == 'ios';
const topMargin = ios? '':' mt-3';
var {width, height} = Dimensions.get('window');


const Photo = () => {


  const navigation = useNavigation();
  


    const route = useRoute()
    const {imgPath} = route.params;

 
  return (
    
 
    <ScrollView 
        contentContainerStyle={{paddingBottom: 20}} >
        
      
        

      {/* back button and movie poster */}
      <View className="w-full">

        
        <SafeAreaView className={"absolute z-20 w-full flex-row justify-between items-center px-4 "+topMargin}>
            <TouchableOpacity style={{backgroundColor:'white'}}
             className="rounded-xl p-1" onPress={()=> navigation.goBack()}>
                <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
            </TouchableOpacity>

            <TouchableOpacity >
              
            </TouchableOpacity>
        </SafeAreaView>

       
    
                <View>  
                    <Image 
                       
                        source={{uri: imgPath}} 
                        style={{width, height}} 
                    />
                    
             
                </View>
     
 </View>
    

    </ScrollView>


    
  )
}

export default Photo