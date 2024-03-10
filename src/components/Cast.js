import { View, Text, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native'
import React from 'react';
import { ICONS } from '../constants';
var {width, height} = Dimensions.get('window');
import { styles } from '../theme';

export default function Cast({cast, navigation,title}) {

    const Salename ="Kamenge"

  return (
    <View className="my-6 bg-neutral-300">
       <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-lg font-bold">{title}</Text>
     
            <TouchableOpacity>
              <Text style={styles.text} className="text-lg font-bold">
               
              </Text>
            </TouchableOpacity>
         
      
      </View>
        <ScrollView 
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{paddingHorizontal: 15}}
        >
            {
                cast && cast.map((person, index)=>{
                    return (
                        <TouchableOpacity 
                            key={index} 
                            onPress={()=> navigation.navigate('Person', person)} 
                            className="mr-4 items-center">
                            <View 
                                className="overflow-hidden rounded-full h-20 w-20 items-center border border-neutral-500 mt-5">
                                <Image 
                                    className="rounded-2xl h-24 w-20"
                                    // source={require('../assets/images/castImage1.png')} 
                                    source={ICONS.hom1} 
                                />
                            </View>
                            
                           
                            <Text className="text-neutral-400 text-xs">
                            {
                                    Salename.length>14? Salename.slice(0,14)+'...': Salename
                                }
                            </Text>
                        </TouchableOpacity>
                    )
                })
            }
            
        
                <View className="mx-4 flex-row justify-between items-center">
                <Text className="text-black text-lg font-bold"></Text>
            
                    <TouchableOpacity>
                    <Text style={styles.text} className="text-lg font-bold"></Text>
                    </TouchableOpacity>
                
            
            </View>
        </ScrollView>
    </View>
  )
}