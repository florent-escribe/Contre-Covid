import {Button, StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    image :{
        height:'103%',
        justifyContent:'flex-end',
    },
    button:{
        backgroundColor:'#5f9ea0',
        borderColor:'black',
        borderWidth:3,
        width:200,
        alignItems:'center',
        marginLeft:200,
        height: 50,
        justifyContent:'center',
        borderRadius:10,
        position :'absolute',
        bottom:150
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
        position :'absolute',
        bottom:250
    },
    buttonText:{
        fontSize:25,
        fontWeight: 'bold'
    },
    title:{
        fontSize:50,
        color:'orange',
        textAlign:'center',
        fontWeight:'bold',
        bottom:700
    },
    infoText:{
        fontSize:16,
        color:'black',
        textAlign:'center',
        marginTop:20,
    },
});

export default styles;