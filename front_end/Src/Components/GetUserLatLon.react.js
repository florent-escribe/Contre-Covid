// renvoie la position d'un utilisateur qui s'est login, utile pour l'affichage dans le profil

import React from 'react'
import { Button, View } from 'react-native'
import GetUserLatLon from '../Functions/GetUserLatLon'

export default function GetUserLatLonReact (props) {
    setInterval(() => {GetUserLatLon(props.uid)},2000)
    return(
        <View>
            <Button title='Position' style={{top:300}}/>
        </View>
    )
}
