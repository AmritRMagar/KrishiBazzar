import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const SearchScreen = () => {
  return (
    <View style={styles.container}>
    <Text>welcome to SearchScreen</Text>
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
   

export default SearchScreen;