import React, { useEffect, useState, useCallback } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Icon } from 'react-native-elements'
import {useFocusEffect} from '@react-navigation/native'
import firebase from 'firebase/app'
import { size } from 'lodash'

import Loading from '../../components/Loading'
import {getMoreRestaurants, getRestaurants, traerRestaurants } from '../../utils/actions'
import ListRestaurants from '../../components/restaurants/ListRestaurants'

export default function Restaurants({navigation}) {
    
    const [user, setUser] = useState(null)
    const [startRestaurant, setStartRestaurant] = useState(null)
    const [restaurants, setRestaurants] = useState([])
    const [loading, setLoading] = useState(false)

    const limitRestaurants = 7

    useEffect(() => {
        firebase.auth().onAuthStateChanged( (userInfo)=>{
            userInfo? setUser(true) : setUser(false)
        })
    }, [])

    
    useFocusEffect(
            useCallback(() => {
                
                const fetchData= async() =>{
                    setLoading(true)
                    const response = await getRestaurants(limitRestaurants)
                    //const response = await traerRestaurants()
                    if (response.statusResponse){
                        setStartRestaurant(response.startRestaurant)
                        setRestaurants(response.restaurants)
                    }
                    setLoading(false)
                }
                fetchData()
            }, [])
    )
    const handleLoadMore = async()=>{
        if(!startRestaurant){
            return
        }
        setLoading(true)
        const response = await getMoreRestaurants(limitRestaurants, startRestaurant)
        if (response.statusResponse){
            setStartRestaurant(response.startRestaurant)
            setRestaurants([...restaurants, ...response.restaurants])
        }
        setLoading(false)
    }

    if (user === null){
        return <Loading
        isVisible={true}
        text = "Cargando..."
        />
    }

// operador unitario(&&) en user de return
// si hay usuario me muestra el icono
    return (
        <View style={styles.viewBody}>
            { 
                size(restaurants) > 0  ? (
                    <ListRestaurants
                        restaurants={restaurants}
                        navigation={navigation}
                        handleLoadMore={handleLoadMore}
                    />
                ):(
                    <View style={styles.notFoundView}>
                        <Text style={styles.notFoundText}>
                            No hay restaurants registrados
                        </Text>
                    </View>
                )
                            
            }
            {
            user && (
            <Icon
                type = "ionicon"
                name = "add-outline"
                color = "#6c9cac"
                reverse = {true}
                containerStyle={styles.btnContainer}
                onPress={()=>navigation.navigate("add-restaurant")}
            />
            )
            }
            <Loading 
                isVisible ={loading}
                text="Cargando restaurants..."
                />
        </View>
    )
}

const styles = StyleSheet.create({
    viewBody:{
        flex:1,
    },
    btnContainer:{
        position: "absolute",
        bottom: 10,
        right: 10,
        shadowColor: "black",
        shadowOffset:{width:2, height:2},
        shadowOpacity: 0.5,
    },
    notFoundView:{
        flex:1,
        justifyContent: "center",
        alignItems: "center"
    },
    notFoundText:{
        fontSize: 18,
        fontWeight: "bold"
    }
})
