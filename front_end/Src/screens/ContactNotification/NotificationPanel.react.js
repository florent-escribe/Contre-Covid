import React from 'react'
import { View, Text } from 'react-native'
import styles from './style'


export default function NotificationPanel (props) {
    return (
        <View style={styles.panel}>
            <Text style={styles.text}>
                Vous êtes cas contact, allez vite vous faire tester !
            </Text>
        </View>
    )
}
