/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React, { useState } from 'react';
import {
  View,
  ScrollView,
  Text,
  Button,
  TextInput,
  FlatList,
  StyleSheet,
} from 'react-native';
import 'react-native-gesture-handler';

import Userpage from './Src/screens/UserSignIn/index'
import GetUserAdressReact from './Src/Components/GetUserAdress.react'
import GetUserCovidState from './Src/Components/GetUserCovidState.react'
import GetUserInfoReact from './Src/Components/GetUserInfo.react' //returns []
import GetUserTestReact from './Src/Components/GetUserTest.react' //returns []
import GetUserLatLonReact from './Src/Components/GetUserLatLon.react' //returns []
import GetUserContactReact from './Src/Components/GetUserContact.react' // returns []

import HomeScreen from './Src/screens/Home/index'
import SignIn from './Src/screens/SignIn/index'
import SignUp from './Src/screens/Signup/index'
import User from './Src/screens/UserSignIn/index'
import RetailSignIn from './Src/screens/RetailSignIn/index'
import Chart from './Src/screens/ChartCom/index'

import TimerTest from './Src/Components/TimerTest.react'
import ZIndexTest from './Src/Components/ZIndexTest.react'

import GetTypeRetail from './Src/Components/GetTypeRetail.react'
import GetRetailInfo from './Src/Components/GetRetailInfo.react'
import GetInfoEmployeesRetail from './Src/Components/GetInfoEmployeesRetail.react'
import GetUserAdress from './Src/Functions/GetUserAdress';


import GetUserCovidStateTest from './Src/Components/GetUserCovidStateTest.react'
import ContactNotification from './Src/screens/ContactNotification/index'

import CarteC from './Src/Components/Carte_covid.react'
import MapView, {Marker} from 'react-native-maps';
import GeolocationExample from './Src/Components/geoexemple.react'

import Navigation from './Navigation/Navigation'

const Covid = () => {
  return(
    <CarteC/>
  )
}

export default Covid;












/*
const Covid = () => {
  return(
    <View>
      <Text>
        blabla
      </Text>
      <Button
        title='get user adress'
        color='red'
        onPress={()=>{GetUserAdress()}     
        }
      />
    </View>
  )
}

export default Covid;
*/
