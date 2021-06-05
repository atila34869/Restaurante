import { isEmpty, size } from 'lodash'
import React, {useState} from 'react'
import { StyleSheet, View } from 'react-native'
import { Button, Icon, Input } from 'react-native-elements'
import { reauthenticate, updatePassword } from '../../utils/actions'

export default function ChangePasswordForm({setShowModal, toastRef}) {
    
    const [newPassword, setNewPassword] = useState(null)
    const [currentPassword, setCurrentPassword] = useState(null)
    const [confirmPassword, setConfirmPassword] = useState(null)
    const [errorNewPassword, setErrorNewPassword]= useState(null)
    const [errorCurrentPassword, setErrorCurrentPassword]= useState(null)
    const [errorConfirmPassword, setErrorConfirmPassword]= useState(null)
    const [showCurrentPassword, setCurrentShowPassword]= useState(false)
    const [showPassword, setShowPassword]= useState(false)
    const [loading, setLoading] = useState(false)
    
    const onSubmit = async() => {

        if (!validateForm()){
            return
        }
        setLoading(true)
        const resultReauthenticate = await reauthenticate(currentPassword)

        if (!resultReauthenticate.statusResponse){
            setLoading(false)
            setErrorPassword("Contraseña incorrecta")
            return
        }
        const resultUpdatePassword = await updatePassword(newPassword)
        setLoading(false)
        if (!resultUpdatePassword.statusResponse){
            setErrorNewPassword("Error al cambiar la contraseña, intentelo mas tarde")
            return
        }
        
        toastRef.current.show("Se actualizó la contraseña", 3000)
        setShowModal(false)
    
    }
    const validateForm = ()=> {
        
        setErrorNewPassword(null)
        setErrorCurrentPassword(null)
        setErrorConfirmPassword(null)
        let isValid = true

        if(isEmpty(currentPassword)){
            setErrorCurrentPassword("Debes ingresar la contraseña actual")
            isValid=false
        }
        if( size(newPassword)<6 ){
            setErrorNewPassword("Debes ingresar una contraseña de al menos seis caracteres")
            isValid=false
        }
        if( size(confirmPassword)<6 ){
            setErrorConfirmPassword("Debes ingresar una contraseña de al menos seis caracteres")
            isValid=false
        }
        if(newPassword!==confirmPassword){
            setErrorConfirmPassword("La nueva contraseña y la confirmacion no son iguales")
            setErrorNewPassword("La nueva contraseña y la confirmacion no son iguales")
            isValid=false
        }
        if(newPassword===currentPassword){
            setErrorCurrentPassword("Debes ingresar una contraseña distinta a la actual")
            setErrorNewPassword("Debes ingresar una contraseña distinta a la actual")
            setErrorConfirmPassword("Debes ingresar una contraseña distinta a la actual")
            isValid=false
        }
        return isValid
    }
    return (
        <View style = {styles.view}>
            <Input
                placeholder = "Ingresa tu contraseña actual"
                containerStyle = {styles.input}
                defaultValue = {currentPassword}
                onChange = {(e) => setCurrentPassword(e.nativeEvent.text)}
                errorMessage = {errorCurrentPassword}
                password = {true}
                secureTextEntry = {!showCurrentPassword}
                rightIcon = {
                    <Icon
                    type = "ionicon"
                    name = {showCurrentPassword?"eye-outline":"eye-off-outline"}
                    iconStyle={{color: "#c2c2c2"}}
                    onPress ={()=>{setCurrentShowPassword(!showCurrentPassword)}}
                    />
                    }
            />
            <Input
                placeholder = "Ingresar nueva contraseña"
                containerStyle = {styles.input}
                defaultValue = {newPassword}
                onChange = {(e) => setNewPassword(e.nativeEvent.text)}
                errorMessage = {errorNewPassword}
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
            <Input
                placeholder = "Confirmar nueva contraseña"
                containerStyle = {styles.input}
                defaultValue = {confirmPassword}
                onChange = {(e) => setConfirmPassword(e.nativeEvent.text)}
                errorMessage = {errorConfirmPassword}
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
                title = "Cambiar Contraseña"
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
