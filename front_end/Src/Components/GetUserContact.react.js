import React from 'react'
import { Button, View } from 'react-native'
import GetUserContact from '../Functions/GetUserContact'

export default function GetUserContactReact (props) {
    setInterval(() => {GetUserContact(props.uid)},2000)
    return(
        <View>
            <Button title='Liste des contacts' style={{top:300}}/>
        </View>
    )
}
