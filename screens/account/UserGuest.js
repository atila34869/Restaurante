import React from 'react'
import { StyleSheet, ScrollView, Image, Text} from 'react-native'
import { Button } from 'react-native-elements'
import {useNavigation} from '@react-navigation/native'

export default function UserGuest() {
    const navigation = useNavigation()
    return (
        <ScrollView
            centerContent
            style = {styles.viewBody}
            >
                <Image
                    source = {require("../../assets/seafood-logo.jpg")}
                    resizeMode = "contain"
                    style = {styles.image}
                />
                <Text style ={styles.title}>Consulta tu perfil en restaurantes</Text>
                <Text style ={styles.description}>Como describirias tu mejor restaurante? Busca y visualiza los mejores restaurantes de una forma
                    sencilla, vota cual te ha gustado mas y comenta como ha sido tu experiencia.
                </Text>
                <Button
                    buttonStyle = {styles.button}
                    title= "Ver tu perfil"
                    titleStyle = {styles.textButton}
                    onPress= {()=> navigation.navigate("login")}
                />
        </ScrollView>
    )
}

const styles= StyleSheet.create({
    viewBody:{
        marginHorizontal: 30
    },
    image: {
        height: 300,
        width: "100%",
        marginBottom: 10,
        alignContent: "center"
    },
    title:{
        fontWeight: "bold",
        fontSize: 19,
        marginBottom: 10,
        textAlign: "center",
        color: "#0a4560"
    },
    description:{
        textAlign: "justify",
        marginBottom: 20,
        color: "#0a4560"

    },
    button:{
        backgroundColor: "#0a4560",
    },

    textButton:{
        color:"#f1f3e6",
        fontWeight: "bold",
    }

})