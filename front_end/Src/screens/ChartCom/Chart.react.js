// 7 Type of Graph using React Native Chart Kit
// https://aboutreact.com/react-native-chart-kit/

// import React in our code
import React from 'react';

// import all the components we are going to use
import {
  SafeAreaView,
  Text,
  View,
  style,
  StyleSheet,
  Dimensions,
  ScrollView,
} from 'react-native';
//import React Native chart Kit for different kind of Chart
import {StackedBarChart} from 'react-native-chart-kit';
import styles from './style';

//const MyStackedBarChart = () => 
export default function MyStackedBarChart (props){
    return (
      <>
        <Text style={styles.header}>Aujourd'hui</Text>
        <StackedBarChart
          data={{
            labels: ['9', '10', '11', '12', '13', '14', '15', '16', '17'], // how to limit the width of each bar
            legend: ['Client', 'Cas Covid'],
            data: [
              [10, 12], 
              [30, 30], 
              [10, 12], 
              [30, 30], 
              [10, 12], 
              [30, 30],
              [10, 12],
              [30, 30],
              [10, 12],
            ],
            barColors: ['#FFC0CB', '#D87093',],
            barPercentage: 0.1,
          }}
          
          width={Dimensions.get('window').width - 2}
          height={320}
          chartConfig={{
            backgroundColor: '#1cc910',
            backgroundGradientFrom: '#eff3ff',
            backgroundGradientTo: '#efefef',
            color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
            style: {
              borderRadius: 16,
              barRadius: 5,
              barPercentage: 0.1,
          },
            barWidth: 6,
            alignItems: 'center',
          }}
  
             
          style={{
            marginVertical: 8,
            borderRadius: 16,
          }}
        />
      </>
    );
  };
  

