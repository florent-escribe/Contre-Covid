import React from "react";
import { View , Text,} from "react-native";
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Src/screens/Home/index';
import Fontisto from 'react-native-vector-icons/Fontisto';

const Tab = createBottomTabNavigator()

const UserTabNaviagtor = (props) => {
    return(
        <Tab.Navigator>
            <Tab.screen 
             name={"map"}
             component={HomeScreen} 
             options={{
                 tabBarIcon : ({color}) =>(
                     <Fontisto name={search} size={25} color={color}/>
                 )
             }}
            />
        </Tab.Navigator>
    );
};

export default UserTabNaviagtor;