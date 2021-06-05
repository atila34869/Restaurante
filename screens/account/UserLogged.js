import React, {useState, useRef, useEffect} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Button } from 'react-native-elements'
import { useNavigation } from '@react-navigation/native'
import  Toast  from 'react-native-easy-toast'

import { closeSession, getCurrentUser } from '../../utils/actions'
import InfoUser from '../../components/acount/InfoUser'
import Loading from '../../components/Loading'
import AccountOptions from '../../components/acount/AccountOptions'

export default function UserLogged() {
    const toastRef = useRef()
    const navigation = useNavigation()

    const [loading, setLoading] = useState(false)
    const [loadingText, setLoadingText] = useState("")
    const [user, setUser] =  useState(null)
    const [reloadUser, setReloadUser] = useState(false)

    useEffect(()=>{
        setUser(getCurrentUser())
        setReloadUser(false)
    },[reloadUser])
// recordar q el usuario user lo estamos mandando a infouser
    
    return (
        <View style = {styles.contenido}>
            {
           user && (
               <View>
                    <InfoUser 
                    user={user}
                    setLoading={setLoading}
                    setLoadingText={setLoadingText}
                    />
                    <AccountOptions
                    user={user}
                    toastRef={toastRef}
                    setReloadUser={setReloadUser}
                    />
                </View>
                )
            }
            
            <Button
                title = "Cerrar Session"
                buttonStyle={styles.btnCloseSesion}
                titleStyle={styles.btnCloseSesionTitle}
                onPress = {()=>{
                    closeSession()
                    navigation.navigate("restaurants")
                }}
            />
            <Toast ref={toastRef} position="center" opacity={0.9}/>
            <Loading isVisible={loading} text={loadingText}/>
        </View>
    )
}
const styles =StyleSheet.create({
    contenido:{
        minHeight:"100%",
        backgroundColor: "#f9f9f9",
    },
    btnCloseSesion:{
        marginTop: 30,
        borderRadius: 5,
        backgroundColor: "#FFFFFF",
        borderTopWidth: 1,
        borderTopColor: "#0a4560",
        borderBottomWidth: 1,
        borderBottomColor: "#0a4560",
        paddingVertical: 10,
    },
    btnCloseSesionTitle:{
        color:"#0a4560",
    },
})


