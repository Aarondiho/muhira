import { COLORS } from "../constants"
import colors from "../constants/color"

// you can change these colors to change the look of the app ;)
export const theme = {
    background: '#A376F1',
    text: '#A376F1'
 }
 export const styles = {
    text: {color: theme.text},
    background: {backgroundColor: theme.background},
    main: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      padding: 16,
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
      fontSize: 35,
      textAlign: 'center',
      fontWeight: 'bold',
      color: COLORS.primary,
      opacity: 0.9,
    },
    loginContinueTxt: {
      fontSize: 21,
      textAlign: 'center',
      color: COLORS.gray,
      marginBottom: 16,
      fontWeight: 'bold',
    },
    input: {
      borderWidth: 1,
      borderColor: COLORS.grayLight,
      padding: 15,
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
      marginTop:30
    },
    loginBtn: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '100%',
      height: 55,
      borderRadius: 50,
    
    },
    loginText: {
      color: COLORS.white,
      fontSize: 16,
      fontWeight: '400',
      alignItems: 'center',
      justifyContent: 'center',
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
      bottom: 30,
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
    wFull: {
      width: '100%',
    },
    row: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      padding:10,
      marginTop:10
    },
    
    rows: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
      paddingHorizontal:5
    },
    rowss: {
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'center',
    },
    mr7: {
      marginRight: 7,
      height:30,
      width:30
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
    },
    paragraph: {
      fontSize: 15,
    },
    checkbox: {
      margin: 8,
    },
    selectBtn: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '80%',
      height: 55,
      borderRadius:20
    },
    selectBtn1: {
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '50%',
      height: 55,
      borderRadius:10
    },
    container1: {
      flex: 1,
      backgroundColor: colors.primary,
      alignItems: 'flex-start',
      justifyContent: 'flex-start',
    },
    camera:{
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      width: '40%',
      height: 100,
      borderRadius:20

    },
    
    dropdown: {
      height: 50,
      borderColor: 'gray',
      borderWidth: 0.5,
      borderRadius: 8,
      paddingHorizontal: 8,
    },
    icon: {
      marginRight: 5,
    },
    label: {
      position: 'absolute',
      backgroundColor: 'white',
      left: 22,
      top: 8,
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
    screen: {
      flex: 1,
      justifyContent: "center",
      alignItems: "center",
    },
    
    
 }