import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

const OrderScreen = () => {
  return (
    <View style={styles.container}>
        <Text>View your Orders</Text>
        </View>
  )
}
const styles = StyleSheet.create({
    container :{
        flex:1,
        justifyContent:'center',
        alignItems:'center',
        backgroundColor: '#FFFFFF',
        }
    });

export default OrderScreen;