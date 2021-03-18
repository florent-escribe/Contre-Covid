// renvoie les informations d'un utilisateur qui s'est login, utile pour l'affichage dans le profil

import React from 'react'
import { Button, View } from 'react-native'
import GetUserInfo from '../Functions/GetUserInfo'

export default function GetUserInfoReact (props) {
    setInterval(() => {GetUserInfo(props.uid)},2000)
    return(
        <View>
            <Button title='Informations Utilisateur' style={{top:300}}/>
        </View>
    )
}
