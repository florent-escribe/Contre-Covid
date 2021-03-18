import GetLatLon from './Functions/GetUserLatLon';
import React, {useEffect, useState} from 'react'


export default function Markers() {
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
