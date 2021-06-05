import React from 'react'
import Navigation from './navigations/Navigation'
import {LogBox} from 'react-native'
//import {YellowBox} from 'react-native';
//-----------------------------------------
//RN >= 0.63
//LogBox.ignoreLogs(['Warning: ...']);
//-----------------------------------------
//RN >= 0.52
//YellowBox.ignoreWarnings(['Warning: ReactNative.createElement']);
//-----------------------------------------
LogBox.ignoreAllLogs()

export default function App() {
  return (
    <Navigation/>
  )
}
