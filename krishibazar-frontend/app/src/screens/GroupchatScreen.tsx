import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const GroupChatScreen = () => {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>welcome to Cart Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
  },
  text: {
    fontSize: 24,
  },
});


export default GroupChatScreen;