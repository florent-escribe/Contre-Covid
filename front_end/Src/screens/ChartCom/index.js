import React from 'react';
import {
    SafeAreaView,
    Text,
    View,
    style,
    StyleSheet,
    Dimensions,
    ScrollView,
  } from 'react-native';
import styles from './style';
import MyStackedBarChart from './Chart.react';


//const App = () => 
export default function Chart (props) {
	return (
      // <SafeAreaView style={{flex: 1}}>
       // <ScrollView>
      //    <View style={styles.container}>
            <View>
              <MyStackedBarChart/>
              {/*Example of Pie Chart*/}
              <View style={styles.tcontainer}>
              <Text style={styles.header}>Recommandation</Text>
                <Text style={styles.content}>
                Recommandation Recommandation Recommandation
                Recommandation Recommandation 
                </Text>
                <Text style={styles.content}>
                Recommandation Recommandation Recommandation
                Recommandation Recommandation 
                </Text>
                <Text style={styles.content}>
                Recommandation Recommandation Recommandation
                Recommandation Recommandation 
                </Text>
              </View>
            </View>
      //    </View>
      //  </ScrollView>
      // </SafeAreaView>
    );
  };

//export default Chart;
