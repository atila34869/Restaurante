import React, { useState, useEffect, useCallback } from 'react'
import { StyleSheet} from 'react-native'
import Loading from '../../components/Loading'
import { getCurrentUser, isUserLoged } from '../../utils/actions'
import {useFocusEffect} from '@react-navigation/native'

import UserLogged from './UserLogged'
import UserGuest from './UserGuest'


export default function Account() {

    const [login, setLogin] = useState(null)
    /*cada vez que pase va checkear si el usuario esta logeado*/
    useFocusEffect (
        useCallback(() => {
            const user = getCurrentUser()
            user ? setLogin(true) : setLogin(false)
        }, [])
    )

    if (login == null) {
        return <Loading 
            isVisible = {true}
            text = "Cargando..."
        />
        }

    return login ? <UserLogged/> : <UserGuest/>
}

const styles = StyleSheet.create({})


