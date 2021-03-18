import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'center',
      alignItems: 'center',
      textAlign: 'center',
      padding: 10,
    },
    tcontainer: {
      flex: 1,
      backgroundColor: 'white',
      justifyContent: 'flex-start',
      alignItems: 'center',
      textAlign: 'center',
      padding: 0.1,
    }, 
    header: {
      textAlign: 'center',
      fontSize: 18,
      padding: 16,
      marginTop: 16,
    },
    content: {
      textAlign: 'left',
      fontSize: 14,
      padding: 1,
      marginTop: 1, 
    },
  });

  export default styles;
