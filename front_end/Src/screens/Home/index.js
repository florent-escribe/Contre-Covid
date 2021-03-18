import React from "react";
import {View, Text, ImageBackground, Pressable} from "react-native";
import styles from './style';
import NavigationFunction from '../../Functions/NavigationFunction';
import ContactNotification from '../ContactNotification/index'

export default function HomeScreen (props) {
    return(
        <View>
            <ImageBackground
                source={require('../../../Assets/Image/contrecovid.jpg')}
                style={styles.image}
            >
                <Pressable style={{flex:10}}/>
                <Pressable style={styles.button1} onPress={() => {NavigationFunction(props.navigation,"SignUp")}}>
                    <Text style={styles.buttonText}>
                        S'inscrire
                    </Text>
                </Pressable>
                <Pressable style={styles.button2} onPress={() => {NavigationFunction(props.navigation,"SignIn")}}>
                    <Text style={styles.buttonText}>
                        Se connecter
                    </Text>
                </Pressable>
                <Pressable style={{flex:5}}/>
            </ImageBackground>
        </View>
    );
};
