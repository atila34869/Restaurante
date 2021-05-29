import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'

const db = firebaseApp.database()
export const isUserLoged = () =>{
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
      user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currerntUser
}