import React from "react";
import {View, Text, ImageBackground, Pressable, TextInput } from "react-native";
import styles from './style';


export default function UserSignUp (props) {
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/background.jpg')}
                style={styles.image}
            >
                <Text style={styles.title}>
                    Utilisateur
                </Text>
                <TextInput style={styles.input} placeholder='Prénom'/>
                <TextInput style={styles.input} placeholder='Nom de famille'/>     
                <TextInput style={styles.input} placeholder='JJ/MM/AAAA'/>  
                <TextInput style={styles.input} placeholder='Email'/>  
                <TextInput style={styles.input} placeholder='Tel'/>  
                <TextInput style={styles.input} placeholder='Ville'/>  
                <TextInput style={styles.input} placeholder='Département'/> 
                <TextInput style={styles.input} placeholder='Région'/>
                <Pressable style={styles.button1} onPress={() => {console.log("login")}}>
                    <Text style={styles.buttonText}>
                        Créer un compte
                    </Text>
                </Pressable>    
            </ImageBackground>          
        </View>
    );
};
