import * as React from 'react';
import {useState} from 'react';
import {Component} from 'react';
import MapView, {Marker} from 'react-native-maps';
import { PROVIDER_GOOGLE } from 'react-native-maps';
import { Button, StyleSheet, Text, View, Dimensions } from 'react-native';
import{ PermissionsAndroid } from 'react-native';
import GetLatLon from '../Functions/GetUserLatLon';

/*
function Markers() {
  const MarCur = {GetLatLon};
  const [marker, SetMarker] = userState({
    markers: [{coordinates: {latitude: 3.148561, longitude: 101.652778},},
              {coordinates: {latitude: 3.149771, longitude: 101.655449},}
    ]
  })
 useEffect (() => {
     const Pos = setInterval(() => {SetMarker(marker={MarCur})}, 5000);
     return () => clearInterval(Pos);
      }
 )

}
*/

const staticData = [
  { coordinates: { latitude: 48.84057906364237, longitude: 2.3392341732978883 } },
   { coordinates: { latitude: 48.843955993652344, longitude: 2.3389739990234375 } },
  { coordinates: { latitude: 48.84102038995935, longitude: 2.32046407461167 } },
  ];

  const requestLocationPermission = async () => {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: "Cool location Permission",
          message:
            "Cool App needs access to your location " +
            "so you can take awesome pictures.",
          buttonNeutral: "Ask Me Later",
          buttonNegative: "Cancel",
          buttonPositive: "OK"
        }
      );
      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        console.log("You can use the locatino");
      } else {
        console.log("location permission denied");
      }
    } catch (err) {
      console.warn(err);
    }
  };
  
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  item: {
    margin: 24,
    fontSize: 18,
    fontWeight: "bold",
    textAlign: "center"
  },
  map: {
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    position: 'absolute',
  
  },
});

// change the color of the marker, use the pinCOlor prop
//image prop for custom marker image in the marker component
//custom marker view, styling the map

export default function CarteC() {
  // variable d' etat
  // requete (asynchrone) .then(mettre a jour les variables)

  // v2 : setTimer / setInterval
 
  // requestLocationPermission();
  return (
    
    <View style={styles.container}>
     <MapView style={styles.map}
      provider={PROVIDER_GOOGLE}
      region={{
        latitude: 48.84057906364237,
        longitude: 2.3392341732978883,
        latitudeDelta: 0.055,
        longitudeDelta: 0.0151,
      }}
      showsUserLocation={true} 
      followsUserLocation={true}
      showsMyLocationButton={true}>


      {staticData.map((item, index) => (
          <Marker key={index} title="Test" coordinate={item.coordinates} />
      ))}

      </MapView>
    </View>
  );
}

