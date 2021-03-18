import React, { useState, useEffect } from "react";
import {View, Text, ImageBackground, Pressable, TextInput, Button} from "react-native";
import styles from './style';





const GetUserId = (nom,updateFunction) => {
    const route = '/user/login/' + nom
    const url = new URL (route, 'http://localhost:5000')
    console.log('Requesting : ' + url.toString())
    fetch(url, {
        method : "GET",
    }).then((response)=>response.json()).then(updateFunction)
};




export default function SignIn (props) {
    const [uid, setUid] = useState(2)
    const [unom, setUnom] = useState('')
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/contrecovid.jpg')}
                style={styles.image}
            >
                <Text style={styles.title}>
                    Connexion
                </Text>
                <TextInput style={styles.input} placeholder='nom utilisateur' value={unom} onChangeText={(txt)=>{setUnom(txt)}}/>
                <TextInput style={styles.input} placeholder='mot de passe'/>     
                <Pressable style={styles.button2} onPressIn={() => {GetUserId(unom,setUid)}} 
                        onPressOut={ ()=> {console.log(uid),props.navigation.navigate("UserMainScreen", {uid : uid, unom : unom})}}>
                    <Text style={styles.buttonText}>
                        Login
                    </Text>
                </Pressable>              
            </ImageBackground>
        </View>
    );
};

