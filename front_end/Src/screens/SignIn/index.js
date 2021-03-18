import React from "react";
import {View, Text, ImageBackground, Pressable} from "react-native";
import styles from './style';
import NavigationFunction from '../../Functions/NavigationFunction'



export default function SignUp (props) {
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/contrecovid.jpg')}
                style={styles.image}
            >
                <Text style={styles.title}>
                    Inscription
                </Text>
                <Pressable style={{flex:10}}/>
                <Pressable style={styles.button1} onPress={() => {NavigationFunction(props.navigation,"UserSignIn")}}>
                    <Text style={styles.buttonText}>
                        Utilisateur
                    </Text>
                </Pressable>
                <Pressable style={styles.button2} onPress={() => {NavigationFunction(props.navigation,"RetailSignIn")}}>
                    <Text style={styles.buttonText}>
                        Commerçant
                    </Text>
                </Pressable>
                <Pressable style={{flex:19}}/>        
            </ImageBackground>
        </View>
    );
};
