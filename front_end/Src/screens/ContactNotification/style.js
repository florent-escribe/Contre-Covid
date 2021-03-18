import { StyleSheet } from 'react-native'

// Même problème que d'habitude : à adapter

const styles = StyleSheet.create ({
    panel : {
        backgroundColor:'red',
        elevation:1,
        position:'absolute',
        justifyContent:'center',
        alignItems:'center',
        height:50,
        width:610,
    },
    text :{
        fontSize:20,
        fontWeight:'bold'
    }
});

export default styles;