import React from 'react';
import { View, ImageBackground } from 'react-native';

/*
const StyleTest = () => {
    return (
      // Try setting `flexDirection` to `column`.
      <View style={{flex: 1, flexDirection: 'column-reverse'}}>
        <View style={{width: 50, height: 50, backgroundColor: 'powderblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'skyblue'}} />
        <View style={{width: 50, height: 50, backgroundColor: 'steelblue'}} />
      </View>
    );
};
*/

const StyleTest = () => {
    return (
        
        <View style={{flex:1}}>
            <ImageBackground
                source={require('../../Assets/Image/contrecovid.jpg')}
                style={{flex:1}}
            />
            <View style={{backgroundColor : 'red',  height:100}}/>
        </View>
    )
}

export default StyleTest;