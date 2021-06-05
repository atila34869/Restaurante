import React from 'react'
import { StyleSheet, Text, View, Image } from 'react-native'
import { Divider } from 'react-native-elements/dist/divider/Divider'
import {useNavigation} from '@react-navigation/native'
import LoginForm from '../../components/acount/LoginForm'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'

export default function Login() {
    return (
        <KeyboardAwareScrollView>
            <Image
                source = {require("../../assets/seafood-logo.jpg")}
                resizeMode = "contain"
                style={styles.image}
            />
            <View style={styles.container}>

                <LoginForm/>
                <CreateAccount/>
                
            </View>
            <Divider style={styles.divider}/>
        </KeyboardAwareScrollView>
    )
}

function CreateAccount(props){
    const navigation = useNavigation()
    return(
        <Text 
            style={styles.register}
            onPress= {()=> navigation.navigate("register")}
        >
            ¿Aun no tienes una cuenta? {" "}
            <Text style={styles.btnregister}>
                Registrate
            </Text>
        </Text>
    )
}

const styles = StyleSheet.create({
    image : {
        height: 150,
        width: "100%",
        marginBottom: 20,
    },
    container:{
        marginHorizontal:40,
    },
    divider:{
        backgroundColor:"#2596be",
        margin:40,
    },
    register:{
        marginTop: 15,
        marginHorizontal: 10,
        alignSelf: "center"
    },
    btnregister:{
        color: "#2596be",
        fontWeight: "bold",
    }
})
