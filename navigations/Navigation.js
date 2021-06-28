import React from 'react'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import { NavigationContainer } from '@react-navigation/native'

import RestaurantsStack from './RestaurantsStack'
import FavoritesStack from './FavoritesStack'
import TopRestaurantsStack from './TopRestaurantsStack'
import SearchStack from './SearchStack'
import AccountStack from './AccountStack'

import { Icon } from 'react-native-elements/dist/icons/Icon'
import { DarkTheme, DefaultTheme } from '@react-navigation/native'

const MyTheme = {
    dark: false,
    colors: {
      primary: "#f3bfa9",
      background: "#eef0e3", //color de fondo
      card: "#c8ced4", //color de la tarjeta tap
      text: "#134a63", 
      border: "#134a63",
      notification: "#134a63",
    },
  }

const Tab = createBottomTabNavigator()

export default function Navigation() {

    const screenOptions = (route,color)=>{
        let iconName
        switch (route.name) {
            case "restaurants":
                iconName = "compass-outline"
                break;
            case "favorites":
                iconName = "heart-outline"
                break;
            case "top-restaurants":
                iconName = "star-outline"
                break;
            case "search":
                iconName = "magnify"
                break;
            case "account":
                iconName = "home-account"
                break;
        }
        return (
            <Icon
                type="material-community"
                name={iconName}
                size={22}
                color={color}
            />
        )
    }

    return (
        <NavigationContainer>
            <Tab.Navigator
                initialRouteName="restaurants"
                barStyle={{ backgroundColor: "#f3bfa9" }}
                tabBarOptions ={{
                    inactiveTintColor:"#134a63",
                    activeTintColor:"#e96f55"
                }}
                screenOptions ={({route})=>({
                    tabBarIcon:({color})=>screenOptions(route,color)
                })
            }
            >
                <Tab.Screen
                    name = "restaurants"
                    component = {RestaurantsStack}
                    options = {{title:"Restaurantes"}}
                />
                <Tab.Screen
                    name = "favorites"
                    component = {FavoritesStack}
                    options = {{title:"Favoritos"}}
                />
                <Tab.Screen
                    name = "top-restaurants"
                    component = {TopRestaurantsStack}
                    options = {{title:"Top 5"}}
                />
                <Tab.Screen
                    name = "search"
                    component = {SearchStack}
                    options = {{title:"Buscar"}}
                />
                <Tab.Screen
                    name = "account"
                    component = {AccountStack}
                    options = {{title:"Cuenta"}}
                />
            </Tab.Navigator>
        </NavigationContainer>
        
    )
}
