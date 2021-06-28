import React, { useEffect, useLayoutEffect, useState }  from 'react'
import { Alert, Dimensions, ScrollView, StyleSheet, Text, View } from 'react-native'
import { Icon, ListItem, Rating } from 'react-native-elements'
import { map, isEmpty } from 'lodash'

import { getDocumentById } from '../../utils/actions'
import Loading from '../../components/Loading'
import CarouselImage from '../../components/CarouselImage'
import MapRestaurant from '../../components/restaurants/MapRestaurant'
import { formatPhone } from '../../utils/helpers'

const widthScreen = Dimensions.get("window").width

export default function Restaurant({navigation, route}) {
    const {id, name} = route.params
    const [restaurant, setRestaurant] = useState({})
    const [activeSlide, setActiveSlide] = useState(0)
    
    useLayoutEffect(() => {
        navigation.setOptions({
          title:name
        })
      }, [navigation, name])
    
    useEffect(() => {
        (async() => {
                const response = await getDocumentById("restaurants", id)
                if (response.statusResponse){
                    setRestaurant(response.document)
                }else{
                    setRestaurant({})
                    Alert.alert("ocurrio un problema cargando el restaurant intente mas tarde")
                }
        })()
    }, [])
    
    if (isEmpty(restaurant)){
        <Loading
        isVisible={true}
        text = "Cargando Restaurant..."
        />
    }
    console.log(restaurant)
    //navigation.setOptions({title:name})

    /*
    <CarouselImage
                    images={restaurant.images}
                    width={widthScreen}
                    height={250}
                    activeSlide={activeSlide}
                    setActiveSlide={setActiveSlide}
                />
                <TitleRestaurant
                    name={restaurant.name}
                    description={restaurant.description}
                    rating={restaurant.rating}
                />
                <RestaurantInfo
                    name={restaurant.name}
                    location={restaurant.location}
                    address={restaurant.address}
                    email={restaurant.email}
                    phone={formatPhone(restaurant.callingCode, restaurant.phone)}
                />
                */
    return (
        <ScrollView style={styles.viewBody}>
            
            <CarouselImage
                images={restaurant.images}
                width={widthScreen}
                height={250}
                activeSlide={activeSlide}
                setActiveSlide={setActiveSlide}
                />
        </ScrollView>
    )
}

function RestaurantInfo({name, location, address, email, phone }){
    const listInfo = [
        {text: address, iconName: "location-sharp"},
        {text: phone, iconName: "call"},
        {text: email, iconName: "at"},
    ]

    return (
        <View style={styles.viewRestaurantInfo}>
            <Text style={styles.restaurantInfoTitle}>
                Informacion sobre el restaurante
            </Text>
            
            <MapRestaurant
                location={location}
                name={name}
                height={150}
            />
            
            {
                map(listInfo, (item, index)=> (
                    <ListItem key={index} style={styles.containerListItem}>
                        <Icon
                            type="ionicon"
                            name={item.iconName}
                            color="#6c9cac"
                        />
                    <ListItem.Content>
                        <ListItem.Title>{item.text}</ListItem.Title>
                    </ListItem.Content>   
                    </ListItem>
                ))
            }
            
        </View>
    )
}

function TitleRestaurant ({name, description, rating}){

    return (
        <View style={styles.viewRestaurantTitle}>
            <View style={styles.viewRestaurantContainer}>
                <Text style={styles.nameRestaurant}>{name}</Text>
                <Rating
                    style={styles.ratingVista}
                    imageSize={20}
                    readonly
                    startingValue={parseFloat(rating)}
                />
            </View>
            <Text style={styles.descriptionRestaurant}>{description}</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
        backgroundColor:"#fff"
    },
    viewRestaurantInfo:{
        margin:15,
        marginTop:25
    },
    restaurantInfoTitle:{
        fontSize:20,
        fontWeight:"bold",
        marginBottom:15
    },
    containerListItem:{
        borderBottomColor: "#6c9cac",
        borderBottomWidth:1
    },
    viewRestaurantTitle:{
        padding:15
    },
    viewRestaurantContainer:{
        flexDirection:"row"
    },
    nameRestaurant:{
        fontWeight:"bold"
    },
    ratingVista:{
        position:"absolute",
        right:0
    },
    descriptionRestaurant:{
        marginTop:5,
        color:"gray",
        textAlign:"justify"
    }
})
