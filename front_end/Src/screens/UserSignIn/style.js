import {Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    image :{
        height:'103%',
        justifyContent:'flex-end'

    },
    button1:{
        backgroundColor:'#5f9ea0',
        borderColor:'black',
        borderWidth:3,
        width:200,
        alignItems:'center',
        marginLeft:200,
        height: 50,
        justifyContent:'center',
        borderRadius:10,
        
    },
    button2:{
        backgroundColor:'#5f9ea0',
        borderColor:'black',
        borderWidth:3,
        width:200,
        alignItems:'center',
        marginLeft:200,
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
        fontWeight:'bold'
    },
    input:{
        fontSize:20,
        borderWidth:3,
        bottom:260,
        borderColor:'orange',
        padding:10,
        marginLeft :150,
        marginRight : 150,
        marginBottom:10
    }
});

export default styles;