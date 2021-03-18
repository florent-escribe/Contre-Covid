/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */


import React from 'react';
import 'react-native-gesture-handler';

import Chart from './Src/screens/ChartCom/index'
import CarteC from './Src/Components/Carte_covid.react'
import MapView, {Marker} from 'react-native-maps';

import Navigation from './Navigation/Navigation'

import StyleTest from './Src/Components/StyleTest.react'

const Covid = () => {
  return(
    <Navigation/>        
  )
}

export default Covid;