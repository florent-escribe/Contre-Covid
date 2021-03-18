// returns all the type of retails in the database 

import React from 'react'
import { Button, View } from 'react-native'
import GetRetailInfo from '../Functions/GetRetailInfo'

export default function GetRetailInfoReact (props) {
    setInterval(() => {GetRetailInfo(props.uid)},2000)
    return(
        <View>
            <Button title='Tous les types de commerce' style={{top:300}}/>
        </View>
    )
}
