import { Button, View } from "react-native";
import GetUserAdress from '../Functions/GetUserAdress'
import AdressDisplay from "./AdressDisplay.react";
import React, { useState } from 'react';



export default function GetUserAdressReact () {
    const [adr, setAdr]= useState([])
    return(
        <View>
            <Button title='Get user adress' onPress={()=>{GetUserAdress(setAdr)}} />
            <AdressDisplay liste={adr}/>
        </View>
    )
}


