import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { SelectList } from 'react-native-dropdown-select-list';
import Animated from 'react-native-reanimated';

const Forgot1 = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const route = useRoute()
    const {id,question,reponse} = route.params;


  const [questions,setQuestion] = useState('')
  const [reponses,setReponse] = useState('')

  const Question = [
    {key:"1", value: lang=="ki"?"Izina ry'ishure ritoya wizeko":
                      lang=="sw"? "Jina la Shule yako ya Msingi":
                      lang=="fr"?"Nom de votre Ecole Primaire":
                      lang=="en"?"Name of your Primary School":""},

    {key:"2",  value: lang=="ki"?"Izina ryaho wavukiye":
                      lang=="sw"? "Jina la mji ambao ulizaliwa ni nini?":
                      lang=="fr"?"Quel est le nom de la ville où tu es né":
                      lang=="en"?"What is the name of the town where you were born":""},

    {key:"3",  value: lang=="ki"?"Mama wawe yitwa gute?":
                      lang=="sw"? "Mama yako anaitwa nani?":
                      lang=="fr"?"Quel est le nom de ta mère?":
                      lang=="en"?"What is your mother's maiden name?":""},

    {key:"4", value: lang=="ki"?"Izina ry'imodoka yindoto za":
                      lang=="sw"? "Aina la gali ya ndoto zako ":
                      lang=="fr"?"Quelle est votre voiture de rêve?":
                      lang=="en"?"What is your dream car?":""},

    {key:"5", value: lang=="ki"?"Ukunda iyihe sport?":
                      lang=="sw"? "Ni mchezo gani ambao unaopenda? ":
                      lang=="fr"?"Quel est votre sport préféré?":
                      lang=="en"?"What is your favourite sport?":""},
    
  ]

  const [lang,setLang] = useState(false)
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


   useEffect(()=>{
    getLanguage()
  },[]); 

  const handleForgot = async () =>{

 if(questions != question || reponses != reponse)  {

    setLoading(true)

    alert(
      lang=='ki'?"Ikibazo n'inyishu sivyo":
      lang=='sw'? 'Swali na jibu lisilo sahihi':
      lang=='fr'?"Question et reponse incorrectes ":
      lang=='en'?"Incorrect question and answer":''
        );

    setLoading(false)
    
} else{

    setLoading(true)
  
    
      var Data = {
          
          id:id,
        }
        
        navigation.navigate(ROUTES.CHANGE,Data)
  
    }  
   
  }

  return ( 
    <Animated.View className={"rounded-lg mb-10 bg-white "+topMargin} >
   
    { loading? (
        <Loading />
      ):(
        <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={{marginBottom:10}}>
        <SafeAreaView  >

        <SafeAreaView className={"absolute z-20  w-full flex-row justify-between items-center px-4 "+topMargin}>
                <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-3 " onPress={()=> navigation.goBack()}>
                    <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
                </TouchableOpacity>
    
                <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                    
                </TouchableOpacity>
            </SafeAreaView>
        
            <View>  
                <Image
                   
                    source={ICONS.house5}
                    style={{width, height: height*0.35,borderBottomRightRadius:20,borderBottomLeftRadius:20}} 
                />
    
                
               
             
    <View  className="rounded-lg mx-4 mb-10 mt-10 bg-white "
              style={{marginTop: -50}}
                  
                >
                  <Text className="text-xl text-black text-bold text-center mt-5">
                    {
                      lang=='ki'?"Ikibazo":
                      lang=='sw'? "Swali":
                      lang=='fr'?"Question ":
                      lang=='en'?"Question":''
                    }
                  </Text>
                  <Text className="text-center mt-2 mx-4">
                  {
                      lang=='ki'?"Hitamwo Ikibazo wishuye igihe wiyandikisha":
                      lang=='sw'? "Chagua swali ulilojibu wakati wa kujiandikisha":
                      lang=='fr'?"Choisir la question que vous avez repondu lors de l'inscription":
                      lang=='en'?"Choose the question you answered during sign up":''
                    } 
                  </Text>

        <SafeAreaView className={"block rounded-lg mx-4 my-1  bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
        
            <View style={styles.container}>

                
                <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                    {
                      lang=='ki'?"Ikibazo":
                      lang=='sw'? "Swali":
                      lang=='fr'?"Question ":
                      lang=='en'?"Question":''
                    } </Text>
        
                    <SelectList 
                        defaultOption={Question[1]}
                        setSelected={(val) => setQuestion(val)} 
                        data={Question} 
                        save="key"
                        /> 
               </View>
               <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
               {
                      lang=='ki'?"Inyishu":
                      lang=='sw'? "Jibu":
                      lang=='fr'?"Reponse ":
                      lang=='en'?"Answer":''
                    } 
                </Text>
        
              <TextInput style={styles.input} 
               value={reponses}
               onChangeText={text => setReponse(text)}/>
              

               </SafeAreaView>

          <SafeAreaView className={"block rounded-lg mx-4 mb-6 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}>
        
            <View style={styles.container}>

              <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.gradientForm, '#1D8E3E']}
                  style={styles.linearGradient}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 0.0}}>
                  {/******************** LOGIN BUTTON *********************/}
                  <TouchableOpacity
                    onPress={handleForgot}
                    activeOpacity={0.7}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>
                    {
                     lang=='ki'?"Rungika":
                     lang=='sw'?"Tuma":
                     lang=='fr'?"Envoyer":
                     lang=='en'?'Send':''
                   }
                    </Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

            
              </View>
        </SafeAreaView>
         
        </View>
        <View style={{marginBottom:10}}></View>
        </View>
        </SafeAreaView>
        </ScrollView>
        )}
      
      </Animated.View>
  );
};

export default Forgot1;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    marginLeft:50,
    marginRight:50,
    marginTop:30,
  },
  container: {
    padding: 5,
    width: '100%',
    flex: 1,
  },
  brandName: {
    fontSize: 42,
    textAlign: 'center',
    fontWeight: 'bold',
    color: '#1D8E3E',
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: '#1D8E3E',
    fontWeight: 'bold',
    marginTop:20
  },
  input: {
    borderWidth: 1,
    borderColor: '#1D8E3E',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 50,
    paddingVertical: 0,
  },
  // Login Btn Styles
  loginBtnWrapper: {
    height: 55,
    marginTop: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.4,
    shadowRadius: 3,
    elevation: 5,
  },
  linearGradient: {
    width: '100%',
    borderRadius: 50,
  },
  loginBtn: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    width: '100%',
    height: 55,
  },
  loginText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '400',
  },
  forgotPassText: {
    color: '#1D8E3E',
    textAlign: 'center',
    fontWeight: 'bold',
    marginTop: 15,
  },
  // footer
  footer: {
    position: 'absolute',
    bottom: -20,
    textAlign: 'center',
    flexDirection: 'row',
  },
  footerText: {
    color: COLORS.gray,
    fontWeight: 'bold',
  },
  signupBtn: {
    color: '#1D8E3E',
    fontWeight: 'bold',
  },
  // utils
  Full: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    
  },
  mr7: {
    marginRight: 7,
    height:50,
    width:50

  },
});