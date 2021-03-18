// renvoie les informations d'un commerçant qui s'est login, utile pour l'affichage dans le profil

import React from 'react'
import { Button, View } from 'react-native'
import GetRetailInfo from '../Functions/GetRetailInfo'

export default function GetRetailInfoReact (props) {
    setInterval(() => {GetRetailInfo(props.uid)},2000)
    return(
        <View>
            <Button title='Informations Commerçant' style={{top:300}}/>
        </View>
    )
}
