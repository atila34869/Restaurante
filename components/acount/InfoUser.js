import React, {useState} from 'react'
import { Alert, StyleSheet, Text, View } from 'react-native'
import { Avatar } from 'react-native-elements/dist/avatar/Avatar'

import { updateProfile, uploadImage } from '../../utils/actions'
import { loadImageFromGallery } from '../../utils/helpers'

export default function InfoUser({ user, setLoading, setLoadingText } ) {
    
    const [photoUrl, setPhotoUrl] = useState(user.photoUrl)

    const changePhoto = async()=>{
        const result = await loadImageFromGallery([1,1])
        if (!result.status){
            return
        }
        setLoadingText("Actualizando imagen...")
        setLoading(true)
        const resultUploadImage = await uploadImage(result.image, "Avatar", user.uid)// avatar es el nombre de la carpeta en firebase storage
        
        if (!resultUploadImage.statusResponse){
            setLoading(false)
            Alert.alert("ha ocurrido un error al almacenar la foto de perfil")
            return
        }
        const resultUpdateProfile = await updateProfile({photoUrl:resultUploadImage.url})
        
        
        if (resultUpdateProfile.statusResponse){
            setPhotoUrl(resultUploadImage.url)
        }else{
            Alert.alert("ha ocurrido un error al actualizar la foto de perfil")
        }
        setLoading(false)
        
    }
    return (
        <View style={styles.contenido}>
            <Avatar
                rounded
                size="large"
                onPress = {changePhoto}
                source={
                    photoUrl
                    ? { uri: photoUrl }
                    : require("../../assets/default-avatar.png")
                }
            />
            <View style={styles.infoUsuario}>
                <Text style={styles.displayName}>
                    {
                        user.displayName?user.displayName:"Anonimo"
                    }
                </Text>
                <Text>{user.email}</Text>
            </View>
        </View>
    )
} 

const styles = StyleSheet.create({
    contenido:{
        alignItems:"center",
        justifyContent:"center",
        flexDirection: "row",
        backgroundColor:"#f9f9f9",
        paddingVertical: 30,
    },
    infoUsuario:{
        marginLeft:15,
    },
    displayName:{
        fontWeight:"bold",
        paddingBottom:5,
    },
})
