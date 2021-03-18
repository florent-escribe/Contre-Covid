import React, { useState } from 'react'
import { Text, View, Pressable, ImageBackground, Button, FlatList } from 'react-native'
import ContactNotification from '../../ContactNotification/index'
import styles from './style'
import NavigationFunction from '../../../Functions/NavigationFunction'



const GetUserInfoAll = (uid,updateFunction) => {
    const route = '/user/' + uid + '/info'
    const url = new URL (route, 'http://localhost:5000')
    console.log('Requesting : ' + url.toString())
    fetch(url, {
        method : "GET",
    }).then((response)=>response.json()).then(updateFunction)
};
/*
function NameEtatCovid (etat_covid) {
    if (etat_covid=1){
        return "Rien"
    }
    if (etat_covid=1){
        return "Rien"
    }
}
*/
function KeyValues(props){
    return(
      <FlatList data={props.display} renderItem={
        ({item, index: idx}) => 
        <View style={{marginTop:350}}>
            <Text style={styles.infoText}>{"Nom : "+item[0]}</Text> 
            <Text style={styles.infoText}>{"Prénom : "+item[1]}</Text> 
            <Text style={styles.infoText}>{"Email : "+item[2]}</Text> 
            <Text style={styles.infoText}>{"Téléphone : "+item[3]}</Text> 
            <Text style={styles.infoText}>{"Adresse : "+item[4]+", "+item[5]+", "+item[6]}</Text> 
            <Text style={styles.infoText}>{"Etat Covid : "+item[7]}</Text> 
        </View>
        }
        keyExtractor={(item) => item[0]}>
      </FlatList>
    )
  }



export default function UserMainScreen (props) {
    const uid = props.navigation.state.params.uid
    const unom = props.navigation.state.params.unom
    const [uprenom,setUprenom] = useState('')
    const [umail,setUmail] = useState('')
    const [utel,setUtel] = useState('')
    const [uville,setUville] = useState('')
    const [udepartement,setUdepartement] = useState('')
    const [uregion,setUregion] = useState('')
    const [liste,setListe]=useState([])
    return(
        <View>            
            <ContactNotification uid={uid}/>
            <ImageBackground
                source={require('../../../../Assets/Image/background.jpg')}
                style={styles.image}
            >
                <KeyValues display={liste}/>

                <Text style={styles.title}>
                    Bienvenue, {unom}
                </Text>
                <Pressable style={styles.button2} onPress={()=>{GetUserInfoAll(uid,setListe)}}>
                    <Text style={styles.buttonText}>
                        Info
                    </Text>
                </Pressable>
                <Pressable style={styles.button} onPress={() => {NavigationFunction(props.navigation,"CarteC")}}>
                        <Text style={styles.buttonText}>
                            Carte
                        </Text>
                </Pressable>

            </ImageBackground>


        </View>
    )
}