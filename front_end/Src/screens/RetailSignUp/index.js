import React, { useState } from "react";
import {View, Text, ImageBackground, Pressable, TextInput, Dropdown } from "react-native";
import styles from './style';
import AddRetail from '../../Functions/AddRetail'


export default function RetailSignUp (props) {
    const [cnom,setCNom] = useState('')
    const [surface, setSurface] = useState('')
    const [tnom, setTnom] = useState('')
    const [ville, setVille] = useState('')
    const [departement, setDepartement] = useState('')
    const [region, setRegion] = useState('')
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/background.jpg')}
                style={styles.image}
            >
                <Text style={styles.title}>
                    Commerçant
                </Text>
                <TextInput style={styles.input} placeholder='Magasin' value={cnom} onChangeText={(txt)=>{setCNom(txt)}}/>
                <TextInput style={styles.input} placeholder='Surface' value={surface} onChangeText={(txt)=>{setSurface(txt)}}/>     
                <TextInput style={styles.input} placeholder='Type de commerce' value={tnom} onChangeText={(txt)=>{setTnom(txt)}}/>  
                <TextInput style={styles.input} placeholder='Email'/>  
                <TextInput style={styles.input} placeholder='Tel'/>  
                <TextInput style={styles.input} placeholder='Ville' value={ville} onChangeText={(txt)=>{setVille(txt)}}/>  
                <TextInput style={styles.input} placeholder='Département' value={departement} onChangeText={(txt)=>{setDepartement(txt)}}/> 
                <TextInput style={styles.input} placeholder='Région' value={region} onChangeText={(txt)=>{setRegion(txt)}}/>
                <Pressable style={styles.button1} onPress={() => {AddRetail(cnom,surface,tnom,ville,departement,region)}}>
                    <Text style={styles.buttonText}>
                        Créer un compte
                    </Text>
                </Pressable>    
            </ImageBackground>          
        </View>
    );
};
