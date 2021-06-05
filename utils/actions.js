import {firebaseApp} from './firebase'
import * as firebase from 'firebase'
import 'firebase/firestore'
import { fileToBlob } from './helpers'


//const db = firebaseApp.database()
const db = firebase.firestore(firebaseApp)
export const isUserLoged = () =>{
    let isLogged = false
    firebase.auth().onAuthStateChanged((user) => {
      user !== null && (isLogged = true)
    })
    return isLogged
}

export const getCurrentUser = () => {
    return firebase.auth().currentUser
}
export const closeSession = () => {
  return firebase.auth().signOut()
}

export const registerUser = async(email, password)=>{
  const result = {statusResponse: true, error: null}
  try{
    await firebase.auth().createUserWithEmailAndPassword(email, password)
  }
  catch (error) {
    result.statusResponse= false
    result.error = "Este correo ya ha sido registrado"
  }
  return result
}
export const loginWithEmailAndPassword = async(email, password)=>{
  const result = {statusResponse: true, error: null}
  try{
    await firebase.auth().signInWithEmailAndPassword(email, password)
  }
  catch (error) {
    result.statusResponse= false
    result.error = "Usuario o contraseña no validos"
  }
  return result
}

  export const uploadImage = async(image, path, name)=>{
      
      const result = {statusResponse:false, error:null, url:null}
      
      const ref = firebase.storage().ref(path).child(name) //apunta a la direccion de la imagen a guardar
      const blob = await fileToBlob(image) //archivo plano de la imagen
     
      
      try{
       await ref.put(blob) // pone la imagen en el cloud storage (direccion apuntada en ref)
        //obtenemos el url con el getdownloadurl
        const url = await firebase.storage().ref(`${path}/${name}`).getDownloadURL() //template string en ref 
        result.statusResponse = true
        result.url = url
        
      }catch(error){
        result.statusResponse = false
        result.error = error
      }
      return result
  }

export const updateProfile = async(data) => {
  const result ={statusResponse:true, error:null}
  try {
    await firebase.auth().currentUser.updateProfile(data)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  } 
  return  result
}

export const reauthenticate = async(password) => {
  const result ={statusResponse:true, error:null}
  const user = getCurrentUser()
  const credentials = firebase.auth.EmailAuthProvider.credential(user.email, password)
  try {
    await user.reauthenticateWithCredential(credentials)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  } 
  return  result
}

export const updateEmail = async(email) => {
  const result ={statusResponse:true, error:null}
  try {
    await firebase.auth().currentUser.updateEmail(email)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  } 
  return  result
}

export const updatePassword = async(password) => {
  const result ={statusResponse:true, error:null}
  try {
    await firebase.auth().currentUser.updatePassword(password)
  } catch (error) {
    result.statusResponse = false
    result.error = error
  } 
  return  result
}