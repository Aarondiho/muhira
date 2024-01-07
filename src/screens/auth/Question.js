import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchQuestion, registerEndpoint } from '../../api/PropertyDb';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';

const Forgot = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [response, setResults] = useState([])

  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [question,setQuestion] = useState('')
  const [reponse,setReponse] = useState('')
  const [userType,setUserType] = useState(false)
  const [iduser,setIduser] = useState(false)

  useEffect(()=>{
    getId();
    getUserType();
    },[]);
  
    
    const getId = async()=>{
        const data = await AsyncStorage.getItem('id')
        setIduser(JSON.parse(data))
   }
     
    const getUserType = async()=>{
      const data = await AsyncStorage.getItem('type')
         setUserType(JSON.parse(data))
     }


  const Question = [
    {key:"1", value:"Nom de votre Ecole Primaire"},
    {key:"2", value:"Pays Prefere"},
    {key:"3", value:"Film Prefere"},
    {key:"4", value:"Musique Prefere"},
    {key:"5", value:"Sport Prefere"},
    
  ]
  

  const handleQuestion = async() =>{

  if(reponse == ""){

      alert("Veuillez repondre la question");
      
  }else{
  
    
      var Data = {
                    question:question,
                    reponse:reponse
                    }
      
      await fetchQuestion(Data)
      .then((response)=>response.json())
      .then((response)=>{
        
        if(response[0].Message==1){
     
          alert('Modifie avec succes')
        
          navigation.navigate(ROUTES.HOME)  
        }
        else{
          alert('Error')
        }
          
      })
  }
}

  return ( 
    <ScrollView 
    showsVerticalScrollIndicator={false} 
    contentContainerStyle={{marginBottom:10}}>
    { loading? (
        <Loading />
      ):(
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
                  <Text style={styles.loginContinueTxt}>INSCRIPTION</Text>
            
          <SafeAreaView className={"block rounded-lg mx-4 my-1  bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
        
            <View style={styles.container}>

                <Text>Question quand vous oublierai le mot de passe</Text>

                    <SelectList 
                        
                        setSelected={(val) => setQuestion(val)} 
                        data={Question} 
                        save="value"
                        /> 
               </View>
              <TextInput style={styles.input} placeholder="Telephone ou Email" 
               value={reponse}
               onChangeText={text => setReponse(text)}/>
              

               </SafeAreaView>

          <SafeAreaView className={"block rounded-lg mx-4 mb-6 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}>
        
            <View style={styles.container}>

              <View style={styles.loginBtnWrapper}>
                <LinearGradient
                  colors={[COLORS.gradientForm, COLORS.primary]}
                  style={styles.linearGradient}
                  start={{y: 0.0, x: 0.0}}
                  end={{y: 1.0, x: 0.0}}>
                  {/******************** LOGIN BUTTON *********************/}
                  <TouchableOpacity
                    onPress={handleQuestion }
                    activeOpacity={0.7}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>Envoyer</Text>
                  </TouchableOpacity>
                </LinearGradient>
              </View>

              {/***************** FORGOT PASSWORD BUTTON *****************/}
              <TouchableOpacity
                onPress={() =>
                  navigation.navigate(ROUTES.FORGOT_PASSWORD, {
                    userId: 'X0001',
                  })
                }
                style={styles.forgotPassBtn}>
                <Text style={styles.forgotPassText}>Mot de Passe oublie?</Text>
              </TouchableOpacity>
            
                <View></View>
            <View style={styles.footer}>
              <Text style={styles.footerText}> Vous avez pas un compte? </Text>
              {/******************** REGISTER BUTTON *********************/}
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN)}>
                <Text style={styles.signupBtn}>Se Connecter</Text>
              </TouchableOpacity>
              </View>
              
              </View>
        </SafeAreaView>
         
        </View>
        <View style={{marginBottom:10}}></View>
        </View>
        </SafeAreaView>
        )}
      </ScrollView>
  );
}


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
    color: COLORS.primary,
    opacity: 0.9,
  },
  loginContinueTxt: {
    fontSize: 21,
    textAlign: 'center',
    color: COLORS.primary,
    fontWeight: 'bold',
    marginTop:20
  },
  input: {
    borderWidth: 1,
    borderColor: COLORS.primary,
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
    color: COLORS.primary,
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
    color: COLORS.primary,
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