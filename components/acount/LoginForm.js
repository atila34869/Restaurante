import React, {useState} from 'react'
import { StyleSheet, Text, View } from 'react-native'
import {Button, Icon, Input} from 'react-native-elements'
import { useNavigation} from '@react-navigation/native'
import {isEmpty} from 'lodash'

import Loading from '../Loading'
import { validateEmail } from '../../utils/helpers'
import { loginWithEmailAndPassword } from '../../utils/actions'

export default function LoginForm() {
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState(defaultFormValues)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }

    const doLogin = async() => {
        if (!validateData()){
            return;
        }
        setLoading(true)
        const result = await loginWithEmailAndPassword(formData.email, formData.password)
        setLoading(false)
        
        if (!result.statusResponse){
            setErrorEmail(result.error)
            setErrorPassword(result.error)
            return
        }

        navigation.navigate("account")
    }
    const validateData = () =>{
        
        setErrorEmail("")
        setErrorPassword("")
        let isValid = true
        
        if (!validateEmail(formData.email)) {
            setErrorEmail("Deber de ingresar un email valido")
            isValid = false
        }
        if (isEmpty(formData.password)){
            setErrorPassword("Deber de ingresar una contraseña")
            isValid = false
        }
        return isValid
    }
    return (
        <View style ={styles.container}>
            <Input
                style = {styles.intro}
                placeholder="Ingrese tu Email..."
                onChange={(e) => onChange(e, "email")}
                keyboardType="email-address"
                errorMessage = {errorEmail}
                defaultValue = {formData.email}
            />
            <Input
                style = {styles.intro}
                placeholder = "Ingrese tu Contraseña..."
                password = {true}
                secureTextEntry = {showPassword}
                onChange={(e) => onChange(e, "password")}
                errorMessage={errorPassword}
                defaultValue={formData.password}
                rightIcon = {
                    <Icon
                        type="ionicon"
                        name={showPassword?"eye-off-outline":"eye-outline"}
                        iconStyle={styles.icon}
                        onPress={()=>setShowPassword(!showPassword)}
                    />
                }
            />
            <Button
                title = "Iniciar Sesion"
                containerStyle = {styles.btnContenido}
                buttonStyle = {styles.btn}
                titleStyle = {styles.textButton}
                onPress={ ()=>doLogin()}
            />
            <Loading
                    isVisible={loading}
                    text="Iniciando Sesion..."
            />
        </View>
    )
}
const defaultFormValues = () => {
    return {email : "" , password : ""}
}

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:"center",
        justifyContent: "center",
        marginTop: 30,
    },
    intro:{
        width: "100%",
    },
    btnContenido:{
        marginTop: 20,
        width: "95%",
        alignSelf: "center"
    },
    btn:{
        backgroundColor: "#0a4560",
    },
    textButton:{
        color:"#f1f3e6",
        fontWeight: "bold",
    },
    icon:{
        color:"#c1c1c1"
    }
})
