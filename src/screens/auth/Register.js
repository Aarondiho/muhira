import React, { useEffect, useState } from 'react';
import {StyleSheet, Text, View, TextInput, SafeAreaView, TouchableOpacity, Image, ScrollView, Dimensions} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation} from '@react-navigation/native';
import Loading from '../../components/Loading';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchRegister} from '../../api/PropertyDb';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import { SelectList } from 'react-native-dropdown-select-list';
import Animated from 'react-native-reanimated';

const Register = () => {

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);
  const [response, setResults] = useState([])

  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');


  const [nom,setNom] = useState('')
  const [prenom,setPrenom] = useState('')
  const [email,setEmail] = useState('');
  const [password,setPassword] = useState('')
  const [repass,setRepass] = useState('')
  const [question,setQuestion] = useState('')
  const [reponse,setReponse] = useState('')

  useEffect(()=>{
    getLanguage()
  },[]); 
  

const [lang,setLang] = useState(false)
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }


  
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


  const handleSign = async () =>{

  if(nom == ""){

    alert(
      lang=="ki"?"Izina ntirishobora kugaragara":
      lang=="sw"? "jina la familia haliwezi kuwa tupu":
      lang=="fr"?"Nom ne peut pas être vide":
      lang=="en"?"Firstname can't be empty":""
      );
      
  }else if(prenom == ""){

    alert(
      lang=="ki"?"Iritazirano ntirishobora kugaragara":
      lang=="sw"? "Jina la kwanza haliwezi kuwa tupu":
      lang=="fr"?" Prénom ne peut pas être vide":
      lang=="en"?"Firstname can't be empty":""
      );

  }else if(email == ""){

    alert(
      lang=="ki"?"Telefone canke Email ntishobora kugaragara":
      lang=="sw"? "Simu au Barua pepe hayiwezi kuwa tupu":
      lang=="fr"?"Téléphone ou e-mail ne peut pas être vide":
      lang=="en"?"Telephone or Email can't be empty":""
      );

    }else if(password == ""){

      alert(
        lang=='ki'?"Andika ijambo kabanga":
        lang=='sw'? 'Tafadhali weka nenosiri lako ':
        lang=='fr'?"Veuillez entrer votre mot de passe":
        lang=='en'?'Please enter your password':''
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
  
    
      var Data = {
          nom:nom,
          prenom:prenom,
          email:email,
          pass:password,
          question:question,
          reponse:reponse
        }
      
        await fetchRegister(Data)
        .then((response)=>response.json())
        .then((response)=>{
            
        setResults(response)
        setLoading(false)
      
      if(response[0].Message == 1 ){

      AsyncStorage.setItem('id', JSON.stringify(response[0].id));
      AsyncStorage.setItem('nom', response[0].nom);
      AsyncStorage.setItem('prenom', response[0].prenom);
      response[0].email ? AsyncStorage.setItem('email', response[0].email) : ''
      response[0].phone ? AsyncStorage.setItem('phone', response[0].phone) : '';
      response[0].phone1 ? AsyncStorage.setItem('phone1', response[0].phone1) : ''
      AsyncStorage.setItem('type', JSON.stringify(response[0].type));

      alert("Enregistrer avec succes");

      navigation.navigate(ROUTES.HOME)

  
      }

    else if(response[0].Message == 10 ){

        alert("Numero de Telephone deja enregistrer ");

    }
    else if(response[0].Message == 20 ){

      alert("Email  deja prise ");

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
                   <Text style={styles.loginContinueTxt}>
                    INSCRIPTION
                    </Text>
                  <Text className="text-center mt-2">Veuillez  vous inscrire pour continuer</Text>

            
          <SafeAreaView className={"block rounded-lg mx-4 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "}>
        
            <View style={styles.container}>

              <TextInput 
              style={styles.input} 
              placeholder={ 
                            lang=="ki"?"Izina":
                            lang=="sw"? "Jina":
                            lang=="fr"?"Nom":
                            lang=="en"?"Lastname":""
                          } 
               value={nom}
               onChangeText={text => setNom(text)}/>

              <TextInput style={styles.input} 
              placeholder={ lang=="ki"?"Iritazirano":
                            lang=="sw"? "Jina":
                            lang=="fr"?" Prénom":
                            lang=="en"?"Firstname":""} 
               value={prenom}
               onChangeText={text => setPrenom(text)}/>
               </View>
              <TextInput style={styles.input} 
              placeholder={
                lang=="ki"?"Telefone canke Email ":
                lang=="sw"? "Simu au Barua pepe u":
                lang=="fr"?"Téléphone ou e-mail ":
                lang=="en"?"Telephone or e-mail":""} 
               value={email}
               onChangeText={text => setEmail(text)}/>
              <TextInput style={styles.input} 
                placeholder={
                  lang=='ki'?"Ijambo kabanga":
                  lang=='sw'? 'Nenosiri':
                  lang=='fr'?"Mot de passe":
                  lang=='en'?'Password':''
                }
               value={password}
               onChangeText={text => setPassword(text)}/>
              <TextInput style={styles.input} 
              placeholder={
                lang=='ki'?"Subiramwo ijambo kabanga":
                lang=='sw'?"Rudia nenosiri":
                lang=='fr'?"Répéter le mot de passe":
                lang=='en'?'Please reenter password':''
                  } 
               value={repass}
               onChangeText={text => setRepass(text)}/>

               </SafeAreaView>

        <SafeAreaView className={"block rounded-lg mx-4 my-1  bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
        
            <View style={styles.container}>

                <Text className="text-center mb-5">
                {
                      lang=='ki'?"Hitamwo Ikibazo uzokwishuye wibagiye ijambo kabanga":
                      lang=='sw'?"Chagua swali utakalojibu ikiwa utasahau nenosiri lako":
                      lang=='fr'?"Choisissez la question à laquelle vous répondrez si vous oubliez votre mot de passe":
                      lang=='en'?"Choose the question you will answer if you forget your password":''
                    } 
                </Text>

                    <SelectList 
                        defaultOption={Question[1]}
                        setSelected={(val) => setQuestion(val)} 
                        data={Question} 
                        save="key"
                        /> 
               </View>
              <TextInput style={styles.input} 
              placeholder={
                lang=='ki'?"Inyishu":
                lang=='sw'? "Jibu":
                lang=='fr'?"Reponse ":
                lang=='en'?"Answer":''}
               value={reponse}
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
                    onPress={handleSign}
                    activeOpacity={0.7}
                    style={styles.loginBtn}>
                    <Text style={styles.loginText}>
                    { 
                        lang=='ki'?"Iyandikishe":
                        lang=='sw'? 'Jisajili':
                        lang=='fr'?"S'inscrire":
                        lang=='en'?'Sign up':''}
                    </Text>
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
                <Text style={styles.forgotPassText}>
                {
                        lang=='ki'?"Wibagiwe Ijambo kabanga?":
                        lang=='sw'? 'Umesahau nenosiri yako?':
                        lang=='fr'?"Mot de Passe oublie? ":
                        lang=='en'?'Forgot your password?':''

                      }
                </Text>
              </TouchableOpacity>
            
                <View></View>
            <View style={styles.footer}>
              <Text style={styles.footerText}> 
              {
                        lang=='ki'?"Urafise konti?":
                        lang=='sw'? 'Je, una akaunti?':
                        lang=='fr'?" Avez-vous un compte? ":
                        lang=='en'?'Do you have an account? ':''

                      }
                       </Text>
              {/******************** REGISTER BUTTON *********************/}
              <TouchableOpacity
                onPress={() => navigation.navigate(ROUTES.LOGIN,{add:1})}>
                <Text style={styles.signupBtn}>
                  {
                      lang=='ki'?"Kwinjira":
                      lang=='sw'? "Kuingiya":
                      lang=='fr'?"Se connecter":
                      lang=='en'?"Log in":""
                      }
                </Text>
              </TouchableOpacity>
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

export default Register;

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