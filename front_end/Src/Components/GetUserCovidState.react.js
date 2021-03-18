// renvoie l'état covid d'un utilisateur repéré par son uid qu'on passe dans props

import React from 'react'
import { Button, View } from 'react-native'



function backEndRequest (id) {
    const route = "/user/" + id
    const url = new URL (route, 'http://localhost:5000/')
    console.log("Requesting : " + url.toString())
    fetch(url, {
        method : "GET"
    }).then((res) => res.json()).then(console.log)
}

//dans props, yaura juste uid
export default function GetUserCovidState (props) {
    setInterval(() => {backEndRequest(props.uid)},2000)
    return(
        <View>
            <Button title='swfdxgfh' style={{top:300}}/>
        </View>
    )
}
