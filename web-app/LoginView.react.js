// tout ça c'était dans le App.js original

//import React, { useCallback } from 'react';
//import { Text, TextInput, useColorScheme, View } from 'react-native';
//import isCorrect from './isCorrect.react'
//import LoginView from './Log_in/LoginView.react'

//const KivAppA = () => {
//  return (
//    <View>
//      <LoginView/>
//    </View>
//  )
//}
//export default KivAppA;





import React, {useState} from 'react';
import { Text, TextInput, View, Button, inputRef } from 'react-native';
import PasswordInputText from 'react-native-hide-show-password-input';

export default function LoginView() {
    const[username, setUsername] = useState('default username');
    const[password, setPassword] = useState('default password');
    const[isCorrect, setIsCorrect] = useState(true);

    return (
        <View>
            <TextInput placeholder = 'identifiant'
                onChangetext = {text => setUsername(text)}/>
            <PasswordInputText placeholder = 'mot de passe'
                onChangetext = {text => setPassword(text)}/>
            <Button title='se connecter' onPress={(evt) => seConnecter(setIsCorrect)}></Button>
            {!isCorrect && <Text>Raté pas de bol !</Text>}
        </View>
    );
}

function seConnecter(updatefunction) {
    return (
        maybeFetch('blc', 'GET', true, {is_login_correct: true, is_admin:true}).then((response) => updatefunction(response.is_login_correct)
        )
    )
}

function maybeFetch(url, method, use_debug = false, debug_data = null) {
    if (use_debug) {
        return new Promise((resolve, reject) => {
            console.log('Hitting ' + url);
            setTimeout(() => resolve(debug_data), 2000);}
            )
        }
    return fetch(url, {
        method: method,
    }).then((response) => response.json())
    .catch((e) => {
        alert('Something went wrong ' + e.message);
    });
}
  