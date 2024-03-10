import React, { useEffect, useState } from 'react';
import { Image } from 'react-native';
import { StyleSheet, Text, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import { ICONS, ROUTES } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';

const data = [
  { label: 'kirundi', value: 'ki' },
  { label: 'swahili', value: 'sw' },
  { label: 'francais', value: 'fr' },
  { label: 'english', value: 'en' },
];

  
const Language = () => {

  const navigation = useNavigation();
  const [isFocus, setIsFocus] = useState(false);
  const [lang,setLang] = useState(false)


  useEffect(()=>{
    getLanguage()
 },[]);


  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }

 
  return (
    <View style={styles.container}>
      <Dropdown clasName="text-sm p-1"
        style={[styles.dropdown, isFocus && { borderColor: 'blue' }]}
        data={data}
        labelField="value"
        valueField="value"
        icon={ICONS.sw}
        value={lang}
        onFocus={() => setIsFocus(true)}
        onBlur={() => setIsFocus(false)}
        onChange={item => {
          setLang(item.value);
          AsyncStorage.setItem('lang',item.value);
          setIsFocus(false);
          navigation.navigate(ROUTES.HOME_TAB)
         
        }}
        renderLeftIcon={() => (
           <View style={{marginRight:3}}>
            {
                lang == 'ki'?(
                <Image source={ICONS.ki} style={{width:20,height:20,borderRadius:30}}/>
                ):
                lang =='fr'?(
                    <Image source={ICONS.fr} style={{width:20,height:20,borderRadius:30}}/>
                ):
                lang =='sw'?(
                    <Image source={ICONS.sw} style={{width:20,height:20,borderRadius:30}}/>
                ):
                lang =='en'?(
                  <Image source={ICONS.en} style={{width:20,height:20,borderRadius:30}}/>
              ):''
            }
           </View>
        )}
      />
    </View>
  );
};

export default Language;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 30,
    width:65,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});