import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/Loading';
import { fetchForgot} from '../../api/PropertyDb';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import Animated from 'react-native-reanimated';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Forgot = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [email,setEmail] = useState('');

  const [lang,setLang] = useState(false)
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


   useEffect(()=>{
    getLanguage()
  },[]); 
  

  const handleMail = async () =>{

   if(email == ""){

        alert(
          lang=="ki"?"Telefone canke Email ntishobora kugaragara":
          lang=="sw"? "Simu au Barua pepe hayiwezi kuwa tupu":
          lang=="fr"?"Téléphone ou e-mail ne peut pas être vide":
          lang=="en"?"Telephone or Email can't be empty":""
          );

    }else{

      setLoading(true)
  
    
      var Data = {
          
          email:email,
        }
      
        await fetchForgot(Data)
        .then((response)=>response.json())
        .then((response)=>{
            
        setLoading(false)
      
      if(response[0].Message == 0 ){

          alert(
            lang=="ki"?"Ikonti yiyo numero canke Email ntibaho":
            lang=="sw"? "Akaunti iliyo na nambari hiyo ya Simu au Barua pepe haipo":
            lang=="fr"?"Le compte avec ce numéro de téléphone ou cette adresse e-mail n'existe pas":
            lang=="en"?"Account with that Telephone number or Email doesn't exists":""
          );
  
      }else{

      
      navigation.navigate(ROUTES.FORGOT1,{id:response[0].id_user,question:response[0].question,reponse:response[0].answer})

  
      }
      
    }  
    )}
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
            
          <SafeAreaView className={"block rounded-lg mx-4 my-1  bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
        
            <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                    
                    {
                      lang=="ki"?"Ikonti yiyo numero canke Email ntibaho":
                      lang=="sw"? "Nambari yako ya simu au barua pepe":
                      lang=="fr"?"Votre numero de Telephone ou Email":
                      lang=="en"?"Your Telephone number or Email":""
                    } 
                    </Text>
              <TextInput style={styles.input} placeholder="Telephone ou Email" 
               value={email}
               onChangeText={text => setEmail(text)}/>
              

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
                    onPress={handleMail}
                    activeOpacity={0.7}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>
                      {
                        lang=="ki"?"Bandanya":
                        lang=="sw"? "Endelea":
                        lang=="fr"?"Continuez":
                        lang=="en"?"Next":""
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

export default Forgot;

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