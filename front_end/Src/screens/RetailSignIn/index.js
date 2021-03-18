import React, { useState, useEffect } from "react";
import {View, Text, ImageBackground, Pressable, TextInput, Button} from "react-native";
import styles from './style';
import NavigationFunction from '../../Functions/NavigationFunction'





const GetUserId = (nom,updateFunction) => {
    const route = '/user/login/' + nom
    const url = new URL (route, 'http://localhost:5000')
    console.log('Requesting : ' + url.toString())
    fetch(url, {
        method : "GET",
    }).then((response)=>response.json()).then(updateFunction)
};




export default function SignIn (props) {
    const [uid, setUid] = useState(3)
    const [unom, setUnom] = useState('')
    const UseEffectFunction = (uid) => {
        useEffect ( () => {
            setUid(uid)
        })
    }
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/contrecovid.jpg')}
                style={styles.image}
            >
                <Text style={styles.title}>
                    Connexion
                </Text>
                <TextInput style={styles.input} placeholder='nom commerce' value={unom} onChangeText={(txt)=>{setUnom(txt);GetUserId(unom,setUid)}}/>
                <TextInput style={styles.input} placeholder='mot de passe'/>     
                <Pressable style={styles.button2} onPress={() => {NavigationFunction(props.navigation,"Chart")}}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </Pressable>              
            </ImageBackground>
        </View>
    );
};


//props.navigation.navigate("UserMainScreen", {uid : uid})