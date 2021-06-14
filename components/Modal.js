import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal({isVisible, setIsVisible, children}) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.over}
            onBackdropPress={()=>setIsVisible(false)}//false
        >
            {
            children
            }
        </Overlay>
    )
}

const styles = StyleSheet.create({
    over:{
        width:"90%"
    }
})
