//import * as Permissions from 'expo-permissions'
import * as MediaLibrary from 'expo-media-library'
import * as ImagePicker from 'expo-image-picker'
import { Alert } from 'react-native'
import * as Location from 'expo-location'

export function validateEmail(email) {
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email)
}

export const loadImageFromGallery = async(array)=>{
    const response = {status:false, image:null}
//   const resultPermissions = await Permissions.askAsync(Permissions.CAMERA)
    const resultPermissions = await MediaLibrary.requestPermissionsAsync()
//    const resultPermissions= await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (resultPermissions.status ==="denied"){
        Alert.alert("debes de darle permiso para acceder a las imagenes de la camara")
        return response
    }
    const result = await ImagePicker.launchImageLibraryAsync({
        allowsEditing: true,
        aspect: array
    })
    if (result.cancelled){
        return response
    }
    response.status = true
    response.image = result.uri
    return response
}
export const fileToBlob = async(path) =>{
    const file = await fetch(path)
    const blob = await file.blob()
    return blob
}

export const getCurrentLocation = async() =>{
    const response ={status:false, location:null}
//    const resultPermissions = await Permissions.askAsync(Permissions.LOCATION)
    const  resultPermissions = await Location.requestForegroundPermissionsAsync()
    if(resultPermissions.status==="denied"){
        Alert.alert("Debes dar permiso para localizacion")
        return response
    }
    const position = Location.getCurrentPositionAsync({})
    const location = {
        latitude: (await position).coords.latitude,
        longitude: (await position).coords.longitude,
        latitudeDelta: 0.001,
        longitudeDelta: 0.001,
    }
    response.status = true
    response.location = location
    return response
}

export const formatPhone = (callingcode, phone) => {
    return `+(${ callingcode }) ${phone.substring(0,3)} ${phone.substring(3,6)} ${phone.substring(6,10)}`
}
