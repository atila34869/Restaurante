import React, {useState} from 'react'
import { StyleSheet, View, LogBox } from 'react-native'
import { Button, Input, Icon } from 'react-native-elements'
import { size } from 'lodash'
import { useNavigation} from '@react-navigation/native'

import { validateEmail } from '../../utils/helpers'
import {registerUser} from '../../utils/actions'
import Loading from '../Loading'


LogBox.ignoreLogs(['Setting a timer']);

export default function Registerform() {
    const [showPassword, setShowPassword] = useState(true)
    const [formData, setFormData] = useState(defaultFormValues)
    const [errorEmail, setErrorEmail] = useState("")
    const [errorPassword, setErrorPassword] = useState("")
    const [errorConfirmar, setErrorConfirmar] = useState("")
    const [loading, setLoading] = useState(false)

    const navigation = useNavigation()

// onchange propio para setearlo en form data dinamicamente campo x campo
    const onChange = (e, type) => {
        setFormData({...formData, [type]: e.nativeEvent.text})
    }
    const doRegisterUser = async() => {
        if (!validateData()){
            return;
        }

        setLoading(true)
        const result = await registerUser(formData.email, formData.password)
        setLoading(false)

        if (!result.statusResponse){
            setErrorEmail(result.error)
            return
        }

        navigation.navigate("account")
        }
    
    const validateData = () =>{
        
        setErrorEmail("")
        setErrorPassword("")
        setErrorConfirmar("")
        let isValid = true
        
        if (!validateEmail(formData.email)) {
            setErrorEmail("Deber de ingresar un email valido")
            isValid = false
        }
        if (size(formData.password) < 6){
            setErrorPassword("Debes ingresar una contraseña de al menos 6 caracteres")
            isValid= false
        }
        if (size(formData.confirmar) < 6){
            setErrorConfirmar("Debes ingresar una confirmacion de contraseña de al menos 6 caracteres")
            isValid= false
        }
        if (formData.password !== formData.confirmar){
            setErrorPassword("la contraseña y la confirmacion no son iguales")
            setErrorConfirmar("la contraseña y la confirmacion no son iguales")
            isValid= false
        }
        return isValid
    }

    return (
        <View style = {styles.form}>
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
            <Input
                style = {styles.intro}
                placeholder = "Confirma tu Contraseña..."
                password = {true}
                secureTextEntry = {showPassword}
                onChange={(e) => onChange(e, "confirmar")}
                errorMessage={errorConfirmar}
                defaultValue={formData.confirmar}
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
                title = "Registrar Nuevo Usuario"
                containerStyle = {styles.btnContenido}
                buttonStyle = {styles.btn}
                titleStyle = {styles.textButton}
                onPress={ ()=>doRegisterUser()}
            />
            <Loading
                    isVisible={loading}
                    text="Creando cuenta..."
            />
        </View>
    )
}
const defaultFormValues = () => {
    return {email : "" , password : "" , confirmar : ""}
}


const styles = StyleSheet.create({
    form:{
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
