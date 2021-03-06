import { isEmpty } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthenticate, updateEmail } from '../../utils/actions'
import { validateEmail } from '../../utils/helpers'

export default function ChangeEmailForm({email, setShowModal, toastRef, setReloadUser}) {
    
    const [newEmail, setNewEmail] = useState(email)
    const [password, setPassword] = useState(null)
    const [errorEmail, setErrorEmail]= useState(null)
    const [errorPassword, setErrorPassword]= useState(null)
    const [showPassword, setShowPassword]= useState(false)
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async() => {

        if (!validateForm()){
            return
        }
        setLoading(true)
        const resultReauthenticate = await reauthenticate(password)

        if (!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorPassword("Contraseña incorrecta")
            return
        }
        const resultUpdateEmail = await updateEmail(newEmail)
        setLoading(false)
        if (!resultUpdateEmail.statusResponse){
            setErrorEmail("No se puede usar email en uso")
            return
        }
        setReloadUser(true)
        toastRef.current.show("se han actualizado el email", 3000)
        setShowModal(false)
    
    }
    const validateForm = ()=> {
        
        setErrorEmail(null)
        setErrorPassword(null)
        let isValid = true
        if(!validateEmail(newEmail)) {
            setErrorEmail("Debes ingresar un email valido")
            isValid = false
        }
        if(newEmail === email){
            setErrorEmail("Debes ingresar un email diferente al actual")
            isValid=false
        }
        if(isEmpty(password)){
            setErrorPassword("Debes ingresar un password")
            isValid=false
        }
        return isValid
    }
    return (
        <View style = {styles.view}>
            <Input
                placeholder = "ingresa un nuevo email"
                containerStyle = {styles.input}
                defaultValue = {email}
                keyboardType = "email-address"
                onChange = {(e) => setNewEmail(e.nativeEvent.text)}
                errorMessage = {errorEmail}
                rightIcon = {{
                    type: "ionicon",
                    name: "at",
                    color: "#c2c2c2",
                }}
            />
            <Input
                placeholder = "ingresa tu contraseña"
                containerStyle = {styles.input}
                defaultValue = {password}
                onChange = {(e) => setPassword(e.nativeEvent.text)}
                errorMessage = {errorPassword}
                password = {true}
                secureTextEntry = {!showPassword}
                rightIcon = {
                    <Icon
                    type = "ionicon"
                    name = {showPassword?"eye-outline":"eye-off-outline"}
                    iconStyle={{color: "#c2c2c2"}}
                    onPress ={()=>{setShowPassword(!showPassword)}}
                    />
                    }
            />
            <Button
                title = "Cambiar email"
                containerStyle = {styles.btnContainer}
                buttonStyle = {styles.btn}
                onPress = {onSubmit}
                loading ={loading}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    view:{
        alignItems: "center",
        paddingVertical: 10
    },
    input:{
        marginBottom: 10,
    },
    btnContainer:{
        width:"90%"
    },
    btn:{
        backgroundColor:"#0a4560"
    }
})

