import React, { useEffect, useState } from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Avatar, Button, Icon, Image, Input } from 'react-native-elements'
import CountryPicker from 'react-native-country-picker-modal'
import { map, size, filter, isEmpty } from 'lodash'
import MapView, { Marker } from 'react-native-maps'
import uuid from 'random-uuid-v4'

import { getCurrentLocation, loadImageFromGallery, validateEmail } from '../../utils/helpers'
import Modal from '../../components/Modal'
import { addDocumentwithoutId, getCurrentUser, uploadImage } from '../../utils/actions'

const widthScreen = Dimensions.get("window").width

export default function AddRestaurantForm({toastRef, setLoading, navigation}) {
    
    const [formData, setFormData] = useState(defaultFormValues)
    const [errorName, setErrorName] = useState(null)
    const [errorDescription, setErrorDescription] = useState(null)
    const [errorEmail, setErrorEmail] = useState(null)
    const [errorAddress, setErrorAddress] = useState(null)
    const [errorPhone, setErrorPhone] = useState(null)
    const [imagesSelected, setImagesSelected] = useState([])
    const [isVisibleMap, setIsVisibleMap] = useState(false)
    const [locationRestaurant, setLocationRestaurant] = useState(null)


    const addRestaurant = async() => {
        if(!validateForm()){
            return
        }
        
        setLoading(true)
        const responseUploadImages = await uploadImages()
        const restaurant = {

            name: formData.name,
            address:formData.address,
            email:formData.email,
            phone:formData.phone,
            description:formData.description,
            callingCode:formData.callingCode,
            location:locationRestaurant,
            images:responseUploadImages,
            rating:0,
            ratingTotal:0,
            quantityVoting:0,
            createAt: new Date(),
            createby: getCurrentUser().uid
        }
        const responseAddDocument = await addDocumentwithoutId("restaurants", restaurant)
        setLoading(false)
        if (!responseAddDocument.statusResponse){
            toastRef.current.show("No se puedo grabar el restaurante, intentelo mas tarde",3000)
            return
        }
        navigation.navigate("restaurants")
    }

    const uploadImages = async() =>{

        const imagesUrl = []
        // esperamos que cargen todas las llamadas asincronas que hagamos
        await Promise.all(
            map(imagesSelected, async(image) => {
                const response = await uploadImage(image, "restaurants", uuid())
                if (response.statusResponse){
                    imagesUrl.push(response.url)
                }
            })
        )
        return imagesUrl
    }

    const validateForm = () => {
        clearError()
        let isValid = true
        if (isEmpty(formData.name)){
            setErrorName("Debes ingresar el nombre del restaurante a crear")
            isValid = false
        }
        if (isEmpty(formData.address)){
            setErrorAddress("Debes ingresar la direccion del restaurante")
            isValid = false
            } 
        if (!validateEmail(formData.email)){
            setErrorEmail("Debes ingresar un email valido para el restaurante")
            isValid = false
        }
        if (isEmpty(formData.phone)){
            setErrorPhone("Debes ingresar el telefono del restaurante")
            isValid = false
            } else if(size(formData.phone)<8){
                setErrorPhone("Digite un numero valido en digitos")
                isValid = false
            }
        if (isEmpty(formData.description)){
            setErrorDescription("Debes ingresar una pequeña descripcion del restaurante")
            isValid = false
        }
        if(!locationRestaurant){
            toastRef.current.show("Debes localizar el restaurante en el mapa", 2000)
            isValid = false
        } else if(size(imagesSelected)===0) {
            toastRef.current.show("debes agregar al menos una imagen para el restaurant", 2000)
            isValid = false
            }
        
        return isValid
    }

    const clearError = ()=>{
        setErrorName(null)
        setErrorAddress(null)
        setErrorEmail(null)
        setErrorPhone(null)
        setErrorDescription(null)
    }
    
    return (
        <ScrollView style={styles.viewContainer}>
            <ImageRestaurant
                imageRestaurant={imagesSelected[0]}
            />
            <FormAdd
                formData = {formData}
                setFormData = {setFormData}
                errorName = {errorName}
                errorDescription = {errorDescription}
                errorEmail = {errorEmail}
                errorAddress = {errorAddress}
                errorPhone = {errorPhone}
                setIsVisibleMap = {setIsVisibleMap}
                locationRestaurant = {locationRestaurant}
            />
             <UploadImage
                toastRef={toastRef}
                imagesSelected={imagesSelected}
                setImagesSelected={setImagesSelected}
             />
            <Button
                title="Crear Restaurante"
                onPress={addRestaurant}
                buttonStyle={styles.btnAddRestaurant}
            />
            <MapRestaurant
                isVisibleMap={isVisibleMap}
                setIsVisibleMap={setIsVisibleMap}
                setLocationRestaurant={setLocationRestaurant}
                toastRef={toastRef}
            />
        </ScrollView>
    )
}

function MapRestaurant({ isVisibleMap, setIsVisibleMap, setLocationRestaurant, toastRef }){

    const [newRegion, setNewRegion] = useState(null)

    useEffect(() => {
        //como es funcion asincrona doble parentesis
        (async() =>{
            const response = await getCurrentLocation()
            if (response.status){
                setNewRegion(response.location)
            }
        })()
        
    }, [])
    
    const confirmLocation = () => {
        setLocationRestaurant(newRegion)
        toastRef.current.show("Localizacion guardada exitosamente", 2000)
        setIsVisibleMap(false)
    }

    return (
        <Modal
            isVisible={isVisibleMap}
            setIsVisible={setIsVisibleMap}
        >
            <View>
                {
                    newRegion && (
                        <MapView
                            style = {styles.mapStyle}
                            initialRegion = {newRegion}
                            showsUserLocation = {true}
                            onRegionChange = {(region)=>{setNewRegion(region)}}
                            >
                            <MapView.Marker
                                coordinate = {{
                                     latitude: newRegion.latitude? newRegion.latitude: 0,
                                     longitude: newRegion.longitude? newRegion.longitude: 0
                                }}
                                title = "Mi Ubicacion"
                                draggable
                            />
                        </MapView>
                    )
                }
                <View style={styles.viewMapBtn}>
                    <Button
                        title="Guardar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerSave}
                        buttonStyle={styles.viewMapBtnSave}
                        onPress = {confirmLocation}
                    />
                    <Button
                        title="Cancelar Ubicacion"
                        containerStyle={styles.viewMapBtnContainerCancel}
                        buttonStyle={styles.viewMapBtnCancel}
                        onPress = {() => {setIsVisibleMap(false)}}
                    />
                </View>
            </View>
    </Modal>
    )
}

function ImageRestaurant({ imageRestaurant }){
    
    return (
        <View styles={styles.viewPhoto}>
            <Image
                style={{ width: widthScreen, height:200 }}
                source={
                    imageRestaurant
                        ? { uri: imageRestaurant}
                        : require("../../assets/noimagen.png")
                }
            />
        </View>
    )
}

function UploadImage({toastRef, imagesSelected, setImagesSelected}){
    
    const imageSelected = async() => {
        const response = await loadImageFromGallery([4,3])
        if(!response.status){
            toastRef.current.show("No seleccionaste imagen",3000)
            return
        }
        setImagesSelected([...imagesSelected, response.image])
    }
    const removeImage = (image)=>{
        Alert.alert(
            "Eliminar Imagen",
            "Seguro desea eliminar la imagen",
            [
                {
                    text:"No",
                    style:"Cancel"
                },
                {
                    text:"Si",
                    onPress: ()=>{
                        setImagesSelected(
                            filter(imagesSelected, (imageUrl) => imageUrl!==image)
                            )
                    }
                }
            ],
            {
                cancelable: true
            }
        )
    }
    return (
        <ScrollView
            horizontal
            style={styles.viewImage}
        >
        {
            size(imagesSelected) < 10 && ( 
            <Icon
                type="ionicon"
                name="camera"
                color="#565656"
                containerStyle={styles.containerIcon}
                onPress={imageSelected}
            />
            )
        }
        {
        map(imagesSelected, (imageRestaurant, index)=>(
            <Avatar
                key={index}
                style={styles.miniatureStyle}
                source={{
                    uri:imageRestaurant
                }}
                onPress={()=>removeImage(imageRestaurant)}
            />
        ))
        }
        </ScrollView>
    )
}

function FormAdd({formData, setFormData, errorName, errorDescription, errorEmail, errorAddress, errorPhone, setIsVisibleMap, locationRestaurant}){

    const [country, setCountry] = useState("PE")
    const [callingCode, setCallingCode] = useState("51")
    const [phone, setPhone] = useState("")

    const onChange = (e,type) => {
        setFormData({ ...formData, [type] : e.nativeEvent.text })
    }

    return (
        <View style={styles.viewForm}>
            <Input
                placeholder="Nombre del restaurante"
                defaultValue = {formData.name}
                onChange = {(e) => {onChange(e,"name")}}
                errorMessage = {errorName}
            />
            <Input
                placeholder="Direccion del restaurante"
                defaultValue = {formData.address}
                onChange = {(e) => {onChange(e,"address")}}
                errorMessage = {errorAddress}
                rightIcon = {{
                    type:"ionicon",
                    name:"location-sharp",
                    color:locationRestaurant?"#6c9cac":"#c2c2c2",
                    onPress:()=>setIsVisibleMap(true),
                }}
            />
            <Input
                placeholder="Email del restaurante"
                keyboardType="email-address"
                defaultValue = {formData.email}
                onChange = {(e) => {onChange(e,"email")}}
                errorMessage = {errorEmail}
            />
            <View style={styles.phoneView}>
            <CountryPicker
                withFlag
                withCallingCode
                withFilter
                withCallingCodeButton
                containerStyle = {styles.countryPicker}
                countryCode = {country}
                onSelect = {(country)=>{
                    setFormData({
                        ...formData,
                    "country":country.cca2,
                    "callingCode":country.callingCode[0]
                    })
                    setCountry(country.cca2)
                    setCallingCode(country.callingCode[0])
                }}
            
            />
            <Input
                placeholder="whatsapp del restaurante"
                keyboardType="phone-pad"
                containerStyle={styles.inputPhone}
                defaultValue = {formData.phone}
                onChange = {(e) => {onChange(e,"phone")}}
                errorMessage = {errorPhone}
            />
            </View>
            <Input
                placeholder="Descripcion del restaurante"
                multiline
                containerStyle={styles.textArea}
                defaultValue = {formData.description}
                onChange = {(e) => {onChange(e,"description")}}
                errorMessage = {errorDescription}
            />
        </View>
    )
    
}

const defaultFormValues= ()=>{
    return {
        name: "",
        address:"",
        email: "",
        phone: "",
        description:"",
        country:"PE",
        callingCode:"51"
    }
}

const styles = StyleSheet.create({
    viewContainer:{
        width: "100%"
    },
    viewForm:{
        marginHorizontal:10
    },
    textArea:{
        height:100,
        width:"100%"
    },
    phoneView:{
        width:"80%",
        flexDirection:"row"
    },
    inputPhone:{
        width: "80%"
    },
    btnAddRestaurant:{
        margin: 20,
        backgroundColor: "#0a4560"
    },
    viewImage:{
        flexDirection: "row",
        marginHorizontal: 20,
        marginTop: 30,
    },
    containerIcon:{
        alignItems:"center",
        justifyContent:"center",
        marginRight: 10,
        height: 70,
        width: 70,
        backgroundColor: "#e3e3e3"
    },
    miniatureStyle:{
        width:70,
        height:70,
        marginRight: 10
    },
    viewPhoto:{
        alignItems: "center",
        height: 200,
        marginBottom: 20
    },
    mapStyle:{
        width:"100%",
        height: 450
    },
    viewMapBtn:{
        flexDirection:"row",
        justifyContent:"center",
        marginTop: 10,
    },
    viewMapBtnContainerCancel:{
        paddingLeft:5,
    },
    viewMapBtnContainerSave:{
        paddingRight: 5,
    },
    viewMapBtnCancel:{
        backgroundColor:"#0a4560",
    },
    viewMapBtnSave:{
        backgroundColor:"#0a4560",
    }
})
