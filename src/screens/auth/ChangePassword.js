import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchChangePassword} from '../../api/PropertyDb';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { SelectList } from 'react-native-dropdown-select-list';
import Animated from 'react-native-reanimated';

const ChangePassword = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [response, setResults] = useState([])

  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const route = useRoute()
  const {id} = route.params;

  const [lang,setLang] = useState(false)
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


   useEffect(()=>{
    getLanguage()
  },[]); 

  
  const [password,setPassword] = useState('')
  const [repass,setRepass] = useState('')


  const handleCangePassword = async () =>{

  if(password == ""){

        alert(
          lang=='ki'?"Andika ijambo kabanga":
          lang=='sw'? 'Tafadhali weka nenosiri lako jipya':
          lang=='fr'?"Veuillez entrer votre nouveau mot de passe":
          lang=='en'?'Please enter your new password':''
        );

    }else if(repass== ""){

      alert(
         lang=='ki'?"Subiramwo ijambo kabanga":
         lang=='sw'?"Rudia nenosiri":
         lang=='fr'?"Répéter le mot de passe":
         lang=='en'?'Please reenter password':''
      );

  }else if(password != repass){

    alert(
      lang=='ki'?"Amajambo kabanga ntasa":
      lang=='sw'? 'Manenosiri hayalingani':
      lang=='fr'?"Mot de passe ne correspond pas":
      lang=='en'?"Passwords don't match":''
        );

  }else{

    setLoading(true)
    
      var Data = {
          id:id,
          pass:password,
        }
      
        await fetchChangePassword(Data)
        .then((response)=>response.json())
        .then((response)=>{
        
    
      if(response[0].Message == 1 ){


       alert(

        lang=='ki'?"Ijambo kabanga ryawe ryahinduwe neza":
        lang=='sw'? 'nenosiri limerekebishwa kwa mafanikio':
        lang=='fr'?"Mot de passe ne correspond pas":
        lang=='en'?"password modified successfully":''

        ) 

      navigation.navigate(ROUTES.LOGIN)

  
      }else {

      alert("Erreur");

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
                  <Text className="text-xl text-black text-bold text-center mt-5">
                    {
                      lang=='ki'?"HINDURA IJAMBO KABANGA":
                      lang=='sw'? "BADILISHA NENO LA SIRI":
                      lang=='fr'?"CHANGER MOT DE PASSE":
                      lang=='en'?"CHANGE PASSWORD":''
                    }
                  </Text>
                  
          <SafeAreaView className={"block rounded-lg mx-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}>
        
               <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                    {
                      lang=='ki'?"Ijambo kabanga":
                      lang=='sw'? "Neno la siri":
                      lang=='fr'?"Mot de Passe":
                      lang=='en'?"Password":''
                    }
                     </Text>
              <TextInput style={styles.input} 
               value={password}
               onChangeText={text => setPassword(text)}/>

            <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                   {
                     lang=='ki'?"Subiramwo ijambo kabanga":
                     lang=='sw'?"Rudia nenosiri":
                     lang=='fr'?"Répéter le mot de passe":
                     lang=='en'?'Please reenter password':''
                   } </Text>
              <TextInput style={styles.input} 
               value={repass}
               onChangeText={text => setRepass(text)}/>

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
                    onPress={handleCangePassword}
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

export default ChangePassword;

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