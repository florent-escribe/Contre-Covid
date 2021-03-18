// returns the information of the employees (name, firstname, mail)

import React from 'react'
import { Button, View } from 'react-native'
import GetInfoEmployeesRetail from '../Functions/GetInfoEmployeesRetail'

export default function GetInfoEmployeesRetailReact (props) {
    setInterval(() => {GetInfoEmployeesRetail(props.uid)},2000)
    return(
        <View>
            <Button title='Informations employés du commerce' style={{top:300}}/>
        </View>
    )
}
