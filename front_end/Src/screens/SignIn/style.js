import { StyleSheet} from 'react-native';

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
        marginTop:10
        
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
        marginTop:20
    },
    buttonText:{
        fontSize:25,
        fontWeight: 'bold',
        color:'black',
    },
    title:{
        fontSize:50,
        color:'orange',
        textAlign:'center',
        top:40,
        fontWeight:'bold',
        marginTop:350
    },
});

export default styles;