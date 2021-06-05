import React from 'react'
import { StyleSheet, Text, View } from 'react-native'
import { Overlay } from 'react-native-elements'

export default function Modal({isVisible, setVisible, children}) {
    return (
        <Overlay
            isVisible={isVisible}
            overlayStyle={styles.over}
            onBackdropPress={()=>setVisible(false)}
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
