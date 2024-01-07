import { View, Text, ScrollView, TouchableWithoutFeedback, Image, Dimensions, TouchableOpacity } from 'react-native'
import React from 'react'
import { useNavigation } from '@react-navigation/native';
import { ICONS } from '../constants';
import { styles } from '../theme';

const {width, height} =  Dimensions.get('window');


export default function NewList({title, data}) {
  const navigation = useNavigation();

  const Salename ="Bujumbura International University Burundi"

  return (
    <View className="mb-8 space-y-4 mt-5 ">
      
      <View className="mx-4 flex-row justify-between items-center">
        <Text className="text-black text-lg font-bold">{title}</Text>
     
            <TouchableOpacity>
              <Text style={styles.text} className="text-lg font-bold">Tous</Text>
            </TouchableOpacity>
         
      
      </View>
      
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{paddingHorizontal: 15}}
      >
        {
            data.map((item, index)=>{
                return (
                    <TouchableWithoutFeedback 
                      key={index} 
                      onPress={()=> navigation.navigate('Sale', item)}
                    >
                        <View className="space-y-1 mr-4">
                            <Image 
                              // source={require('../assets/images/moviePoster2.png')}
                              source={ICONS.hom3} 
                              className="rounded-3xl" 
                              style={{ width: width*0.33, height: height*0.22}} 
                            />
                            <Text className="text-neutral-300 ml-1">
                                {
                                    Salename.length>14? Salename.slice(0,14)+'...': Salename
                                }
                            </Text>
                            <View style={{marginTop:50}}></View>
                        </View>
                        
                    </TouchableWithoutFeedback>
                )
            })
        }
      </ScrollView>
    </View>
  )
}