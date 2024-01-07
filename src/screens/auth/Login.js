import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  SafeAreaView,
  TouchableOpacity,
  Image,
  ScrollView, 
  Dimensions
} from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import {COLORS, ROUTES,ICONS} from '../../constants';
import {useNavigation, useRoute} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { fetchLogin} from '../../api/PropertyDb';
import { Platform } from 'react-native';
import { ChevronLeftIcon} from 'react-native-heroicons/outline';
import Loading from '../../components/Loading';
import { Animated } from 'react-native';

const Login = () => {
    // const {navigation} = props;
  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  const route = useRoute()
  const {add} = route.params

  const [lang,setLang] = useState(false)
  const getLanguage = async()=>{
    const data = await AsyncStorage.getItem('lang')
       setLang(data)
   }



  const removeFew = async () => {
    const keys = [
      'id',
      'nom', 
      'prenom',
      'email',
      'phone',
      'phone1',
      'whatsapp',
      'type'
    ]
    try {
      await AsyncStorage.multiRemove(keys)
    } catch(e) {
      // remove error
    }
  
    
  }

  useEffect(()=>{

    removeFew();
    getLanguage()
    },[])

  
  const ios = Platform.OS == 'ios';
  const topMargin = ios? '':' mt-6';
  var {width, height} = Dimensions.get('window');

  const [email,setEmail] = useState('');
  const [password,SetPassword] = useState('')

  
const handleLogin = async () =>{

  if(email == ""){
    alert(
      lang=="ki"?"Telefone canke Email ntishobora kugaragara":
      lang=="sw"? "Simu au Barua pepe hayiwezi kuwa tupu":
      lang=="fr"?"Téléphone ou e-mail ne peut pas être vide":
      lang=="en"?"Telephone or Email can't be empty":""
      );
  }else if(password == ""){
    alert(
      lang=='ki'?"Andika ijambo kabanga":
      lang=='sw'? 'Tafadhali weka nenosiri lako jipya':
      lang=='fr'?"Veuillez entrer votre nouveau mot de passe":
      lang=='en'?'Please enter your new password':''
    );
  }else{

    
  
    var Data = {mail:email,pass:password}
    try {

      setLoading(true);
      
      await fetchLogin(Data)
      .then((response)=>response.json())
      .then((response)=>{
        console.log(response)
      if(response[0].type == 1 ){

  
    AsyncStorage.setItem('id', JSON.stringify(response[0].id));
    AsyncStorage.setItem('nom', response[0].nom);
    AsyncStorage.setItem('prenom', response[0].prenom);
    response[0].email ? AsyncStorage.setItem('email', response[0].email) : ''
    AsyncStorage.setItem('phone', response[0].phone);
    response[0].phone1 ? AsyncStorage.setItem('phone1', response[0].phone1) : ''
    response[0].whatsapp ? AsyncStorage.setItem('whatsapp', response[0].whatsapp) : ''
    AsyncStorage.setItem('type', JSON.stringify(response[0].type));
    
    add==1? navigation.replace(ROUTES.ADDHOUSE) : navigation.replace(ROUTES.HOME) ;

    }
    else if(response[0].type == 0){

        navigation.replace('Dashboard');

    }else if(response[0].Message == 3){

      alert(
        lang=='ki'?"Konti yawe yarugawe":
        lang=='sw'? 'Akaunti yako imezimwa':
        lang=='fr'?"Votre compte est désactivé":
        lang=='en'?'Your account is deactivated':''
      );
    }else if(response[0].Message == 0){

      alert(
        lang=='ki'?"Ijambo kabanga, Telefone canke email sivyo":
        lang=='sw'? 'Nenosiri, Simu au Barua pepe Si Sahihi':
        lang=='fr'?"Mot de passe, téléphone ou e-mail incorrect":
        lang=='en'?'Incorrect Password, Phone or Email':''
      );
      setLoading(false)
  }
    
    })
  }catch(error){

    console.log(error);

  }

    
  }   

 
  }


  const handleBack=()=>{

    add==2? navigation.navigate(ROUTES.HOME) : navigation.goBack()
    
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

          <SafeAreaView className="absolute z-20 w-full flex-row justify-between items-center px-4 ">
                  <TouchableOpacity style={{backgroundColor:'white'}} className="rounded-xl p-1 mt-5 " 
                  onPress={handleBack}>
                      <ChevronLeftIcon size="28" strokeWidth={2.5} color="black" />
                  </TouchableOpacity>
      
                  <TouchableOpacity onPress={()=> toggleFavourite(!isFavourite)}>
                      
                  </TouchableOpacity>
              </SafeAreaView>
          
              <View>  
                  <Image
                     
                      source={ICONS.house9}
                      style={{width, height: height*0.30,borderBottomRightRadius:20,borderBottomLeftRadius:20}} 
                  />
      
                  
                 
               
          <View  className="rounded-lg mx-4 mb-10 mt-10 bg-white "
              style={{marginTop: -50}}
                  
                >
              <Text style={styles.loginContinueTxt}>
                {
                  lang=='ki'?"INJIRA":
                  lang=='sw'? 'INGIA':
                  lang=='fr'?"CONNEXION ":
                  lang=='en'?'LOG IN':''
                }
              </Text>
            <SafeAreaView className={"block rounded-lg mx-4 my-4 mb-6 bg-neutral-50 p-6 shadow-[0_2px_15px_-3px_rgb(127,255,212),0_10px_20px_-2px_rgb(127,255,212)] dark:bg-neutral-700 "+topMargin}>
          
              <View style={styles.container}>
              <View style={styles.wFull}>
                
               <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                    {
                      lang=='ki'?"Telephone canke Email":
                      lang=='sw'? "Nambari ya simu au Barua pepe":
                      lang=='fr'?"Telephone ou Email":
                      lang=='en'?"Telephone or Email":''
                    }
                     </Text>
                
                <TextInput style={styles.input} placeholder="+257 69 43 23 89"
                value={email}
                onChangeText={text => setEmail(text)}/>

                    
               <Text className="mb-2 text-sm font-medium leading-tight text-neutral-800 dark:text-neutral-50 mt-5">
                    {
                      lang=='ki'?"Ijambo kabanga":
                      lang=='sw'? "Neno la siri":
                      lang=='fr'?"Mot de Passe":
                      lang=='en'?"Password":''
                    }
                     </Text>

                <TextInput style={styles.input} placeholder="**********"
                  value={password}
                  onChangeText={text =>SetPassword(text)} />

                <View style={styles.loginBtnWrapper}>
                  <LinearGradient
                    colors={[COLORS.gradientForm,'#1D8E3E']}
                    style={styles.linearGradient}
                    start={{y: 0.0, x: 0.0}}
                    end={{y: 1.0, x: 0.0}}>
                    {/******************** LOGIN BUTTON *********************/}
                    <TouchableOpacity
                      onPress={handleLogin}
                      activeOpacity={0.7}
                      style={styles.loginBtn}>
                      <Text style={styles.loginText}>
                      {
                        lang=='ki'?"INJIRA":
                        lang=='sw'? 'INGIA':
                        lang=='fr'?"CONNEXION ":
                        lang=='en'?'LOG IN':''
                      }
                      </Text>
                    </TouchableOpacity>
                  </LinearGradient>
                </View>

                {/***************** FORGOT PASSWORD BUTTON *****************/}
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.FORGOT)}
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
              </View>
              <View style={styles.footer}>
                <Text style={styles.footerText}>
                    {
                        lang=='ki'?"Ntimurugura konti?":
                        lang=='sw'? 'Je, huna akaunti?':
                        lang=='fr'?" Vous n'avez pas un compte? ":
                        lang=='en'?"Don't have an account?":''

                      }
                   </Text>
                {/******************** REGISTER BUTTON *********************/}
                <TouchableOpacity
                  onPress={() => navigation.navigate(ROUTES.REGISTER)}>
                  <Text style={styles.signupBtn}>
                      {
                        lang=='ki'?"Iyandikishe":
                        lang=='sw'? 'Jisajili':
                        lang=='fr'?"S'inscrire":
                        lang=='en'?'Sign up':''

                      }
                  </Text>
                </TouchableOpacity>
              </View>
              
            </View>
      </SafeAreaView>
       
      </View>
      </View>
      </SafeAreaView>
      </ScrollView>
      )}
      </Animated.View>
    
  
  );
};

export default Login;

const styles = StyleSheet.create({
  main: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 15,
    marginTop:30,
  },
  container: {
    padding: 15,
    width: '100%',
    position: 'relative',
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
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
    marginTop:30,
    fontWeight: 'bold',
  },
  input: {
    borderWidth: 1,
    borderColor: '#1D8E3E',
    padding: 15,
    marginVertical: 10,
    borderRadius: 5,
    height: 55,
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
  wFull: {
    width: '100%',
  },
  row: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  mr7: {
    marginRight: 7,
    height:50,
    width:50

  },
});
