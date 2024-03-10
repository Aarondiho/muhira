import { KeyboardAvoidingView, StyleSheet, Text,  View,Button,Image } from 'react-native'
import React, { useEffect, useState } from 'react'
import * as imagePicker from 'expo-image-picker'


const Galery = () => {

    const[hasGaleryPermission, setHasGaleryPermission]= useState(null)
    const [image,setImage]= useState('null')


    useEffect(()=>{

        (async()=>{

            const galeryStatus = await imagePicker.requestMediaLibraryPermissionsAsync();
            setHasGaleryPermission(galeryStatus.status === "granted")
        })();

    },[])

    const pickImage = async()=>{

        let result = await imagePicker.launchImageLibraryAsync({
            mediaTypes : imagePicker.MediaTypeOptions.images,
            allowsEditing : true,
            aspect: [4,3],
            quality: 1
    });
    
    
    if(!result.canceled){
        
          delete result.cancelled;
        setImage(result.assets[0].uri)
    };
    if(hasGaleryPermission === false){

        return <Text>Pas d'Acces aux Stockage</Text>
    }
}





  return (

    <KeyboardAvoidingView
    style={styles.container}
    behavior="padding"
    >
  
  <View style={styles.inputContainer}>

  
        <Button
            title='Choisir une photo'
           onPress ={()=>pickImage()}
           style={{margin:30}}
            />
            {image && <Image source={{ uri:image }} style={{flex : 1/2}} />}
               
   
        </View> 

           

  </KeyboardAvoidingView>


    )
}


export default Galery

const styles = StyleSheet.create({
    container:{
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: 40

    },

    inputContainer:{
        width:'80%'
    },
    
    input:{

        backgroundColor:'white',
        paddingHorizontal: 15,
        paddingVertical: 10,
        borderRadius: 10,
        marginTop: 5
    },

    buttonContainer:{

        width:'60%',
        justifyContent:'center',
        alignItems:'center',
        marginTop:40

    },

    button: {

        backgroundColor:'#0782F9',
        width:'100%',
        padding:15,
        borderRadius:10,
        alignItems:'center'

    },

    buttonText:{
        color:'white',
        fontWeight:700,
        fontSize:16


    },

    buttonOutline: {
        backgroundColor:'white',
        marginTop:  5,
        borderColor:'#0782F9',
        borderWidth:2

    },

    buttonOutlineText: {
        color:'#0782F9',
        fontWeight:700,
        fontSize:16

    }
})