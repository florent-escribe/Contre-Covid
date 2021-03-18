import React from 'react'
import { FlatList, Text } from 'react-native'



//props est une liste json d'adresses

export default function AdressDisplay (props) {
    return(
        <FlatList data={props.liste} renderItem={
          ({item, index: idx}) => 
          <Text  style={{fontWeight:'bold', marginLeft:30}}>{"Adresse " + idx +  " : ville : " + item[0] + " ; département : " + item[1] + " ; région : " + item[2]}</Text> 
          }
          keyExtractor={(item) => item[0]}>
        </FlatList>
      )
}