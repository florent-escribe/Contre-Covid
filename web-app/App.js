import React, { Component, useCallback } from 'react';
import { Text, TextInput, useColorScheme, View, StyleSheet } from 'react-native';
import isCorrect from './isCorrect.react'
import LoginView from './Log_in/LoginView.react'



const KivAppA = () => {
  return (
    <View style={styles.container}> 
      <LoginView/>
    </View>
  )
}
export default KivAppA;


const styles = StyleSheet.create({
	container: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		backgroundColor: '#05FFB0'
	},
	welcome: {
		fontSize: 20,
		textAlign: 'center',
		margin: 10
  }
})