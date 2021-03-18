import {Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    image :{
        height:'103%',
        justifyContent:'flex-end'

    },
    button1:{
        backgroundColor:'orange',
        borderColor:'black',
        borderWidth:3,
        width:240,
        alignItems:'center',
        marginLeft:184,
        height: 50,
        justifyContent:'center',
        borderRadius:10,
        marginTop:20,
        bottom:150, 
        position:'absolute'
    },
    buttonText:{
        fontSize:25,
        fontWeight: 'bold'
    },
    title:{
        fontSize:50,
        color:'orange',
        textAlign:'center',
        bottom:370,
        fontWeight:'bold',
        top: -280,
    },
    input:{
        fontSize:20,
        borderWidth:3,
        bottom:250,
        borderColor:'orange',
        padding:10,
        marginLeft :150,
        marginRight : 150,
        marginBottom:10
    }
});

export default styles;