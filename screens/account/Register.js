import React from 'react'
import { StyleSheet, Image } from 'react-native'
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view'
import Registerform from '../../components/acount/Registerform'


export default function Register() {
    return (
        <KeyboardAwareScrollView 
            style={styles.contenido}
            automaticallyAdjustContentInsets={ true }
            >
            <Image
                source = {require("../../assets/seafood-logo.jpg")}
                resizeMode = "contain"
                style={styles.image}
            />
            <Registerform/>
        </KeyboardAwareScrollView>
    )
}

const styles = StyleSheet.create({
    contenido:{
        flex:1,
        marginTop:30,
    },
    image : {
        height: 150,
        width: "100%",
        marginBottom: 20,
    },
})

