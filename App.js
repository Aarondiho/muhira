import * as React from 'react';
import {DrawerActions, NavigationContainer} from '@react-navigation/native';

import AuthNavigator from './src/navigations/AuthNavigator';

export default function App() {
   // isAuthenticated = is...
   return (
    <NavigationContainer>
      {/* {isAuthenticated ? AuthNavigator : DrawerNavigator } */}
      <AuthNavigator />
    </NavigationContainer>
  );
}


// const handleLogin = () =>{

//   if(telephone == ""){
//       alert("Veuillez entrer votre nom utilisateur, email ou numero de telephone ");
//   }else if(password == ""){
//       alert("Veuillez entrer votre mot de passe");
//   }else{

//       var loginAPIURL ='https://8c14-154-117-195-253.ngrok-free.app/api/ajax.php?action=login'; // API

//        var Data ={

//           telephone:telephone,
//           password:password,
//        }
      
//        fetch(loginAPIURL,{
//                   method :'POST',
//                   body: JSON.stringify(Data), // encode data in json format
//                   headers: {
//                       'Accept': 'application/json',
//                       'Content-Type': 'application/json'
//                     },
//               })
//               .then((response)=>response.json()) //Verify if response is in Json format
//               .then((response) =>{

//                   if(response[0].Message == 0 ){

//                       alert("Telephone ou mot de passe incorect");

//                   }
//                   else if(response[0].Message == 1 ){

          
//                   AsyncStorage.setItem('id', JSON.stringify(response[0].id));
//                   //AsyncStorage.setItem('username', response[0].username);
//                   AsyncStorage.setItem('nom', response[0].nom);
//                   AsyncStorage.setItem('prenom', response[0].prenom);
//                   //AsyncStorage.setItem('email', response[0].email);
//                   AsyncStorage.setItem('phone', response[0].phone);
//                   //AsyncStorage.setItem('phone1', response[0].phone1);
//                   AsyncStorage.setItem('type', JSON.stringify(response[0].type));
                  

//                   navigation.replace('Home');

//                   }
//                   else if(response[0].Message == 2){

//                       navigation.replace('Dashboard');

//                   }else if(response[0].Message == 3){

//                       alert('Votre compte a ete desactive');
//                   }
//                 })
//                 .catch((error)=>{
//                   alert(error)
//               })
//   }




// }


//GET ID
// const Home = () => {

//   const navigation = useNavigation()


//       const [id,setId] = useState(false)
//       const [nom,setNom] = useState(false)
//       const [prenom,setPrenom] = useState(false)
//       const [phone,setPhone] = useState(false)
//       const [type,setType] = useState(false)

//      const getId = async()=>{

//           const data = await AsyncStorage.getItem('id')
//           setId(data)
//       }
//       const getType = async()=>{

//           const data = await AsyncStorage.getItem('type')
//           setType(data)
//       }

//       const getNom = async()=>{

//           const data = await AsyncStorage.getItem('nom')
//           setNom(data)
//       }

//       const getPrenom = async()=>{

//           const data = await AsyncStorage.getItem('prenom')
//           setPrenom(data)
//       }
      
//       const getPhone= async()=>{

//           const data = await AsyncStorage.getItem('phone')
//           setPhone(data)
//       }
     
//   useEffect(()=>{

      
//       getId();
//       getNom();
//       getPrenom();
//       getPhone();
//       getType();

//   },[])
      
  
    
//   const handleSignOut =() =>{
      
//           navigation.replace('Login')
      
//   }

// return (
//   <View style={styles.container}>
//     <Text>
//           Id: {id}
//           Nom:{nom};
//           Prenom: {prenom}
//           Telephone :{phone}
//           Type :{type}
//           </Text>
//     <TouchableOpacity
//               onPress={handleSignOut}
//               style={[styles.button, styles.buttonOutline]}
//           >
//               <Text style={[styles.buttonOutlineText]}>Se deconnecter</Text>

//           </TouchableOpacity>
//   </View>
// )
// }

