import { map } from 'lodash';
import React, {useState} from 'react'
import { StyleSheet, View, Text } from 'react-native'
import { Icon, ListItem} from 'react-native-elements';
import Modal from '../Modal';
import ChangeDisplayNameForm from './ChangeDisplayNameForm';
import ChangeEmailForm from './ChangeEmailForm';
import ChangePasswordForm from './ChangePasswordForm';

export default function AccountOptions({user, toastRef, setReloadUser}) {


    const [showModal, setShowModal]= useState(false)
    const [renderComponent, setRenderComponent]= useState(null)

    const generateOptions= ()=>{
        return [
            {
                title : "Cambiar Nombres y Apellidos",
                iconNameLeft: "person-circle-outline",
                iconColorLeft: "#0a4560",
                iconNameRight: "chevron-forward-outline",
                iconColorRight: "#0a4560",
                onPress: ()=>selectComponent("displayName")
            },
            {
                title : "Cambiar Email",
                iconNameLeft: "at",
                iconColorLeft: "#0a4560",
                iconNameRight: "chevron-forward-outline",
                iconColorRight: "#0a4560",
                onPress: ()=>selectComponent("email")
            },
            {
                title : "Cambiar Contraseña",
                iconNameLeft: "lock-closed",
                iconColorLeft: "#0a4560",
                iconNameRight: "chevron-forward-outline",
                iconColorRight: "#0a4560",
                onPress: ()=>selectComponent("password")
            },
        ]
    }

    const selectComponent = (key) => {
        switch (key) {
            case "displayName":
                setRenderComponent(
                    <ChangeDisplayNameForm
                        displayName = {user.displayName}
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                        setReloadUser = {setReloadUser}
                    />
                )
                break;
            case "email":
                setRenderComponent(
                    <ChangeEmailForm
                        email = {user.email}
                        setShowModal = {setShowModal}
                        toastRef = {toastRef}
                        setReloadUser = {setReloadUser}
                    />
                )
                break;
            case "password":
                setRenderComponent(
                    <ChangePasswordForm
                    setShowModal = {setShowModal}
                    toastRef = {toastRef}
                    />
                )
                break;
        }
        setShowModal(true)
    }

    const menuOptions = generateOptions();
    return (
        <View>
            {
                map(menuOptions, (menu, index)=>(
                    //el map recibe un array menuoptions con nombre de cada grupo-diccionario "menu" y una posicion de cada menu llamado "index" 
                    <ListItem
                    key={index}
                    style={styles.menuItem}
                    onPress={menu.onPress}
                    >
                        <Icon
                            type="ionicon"
                            name={menu.iconNameLeft}
                            color={menu.iconColorLeft}
                        />
                        <ListItem.Content>
                            <ListItem.Title>{menu.title}</ListItem.Title>
                        </ListItem.Content>
                        <Icon
                            type="ionicon"
                            name={menu.iconNameRight}
                            color={menu.iconColorRight}
                        />
                    </ListItem>
                ))
            }
            <Modal isVisible={showModal} setVisible={setShowModal}>
                {
                    renderComponent
                }
            </Modal>
                
        </View>
    )
} 



const styles = StyleSheet.create({
    menuItem:{
        borderBottomWidth:1,
        borderBottomColor:"#0a4560",
    }
})
