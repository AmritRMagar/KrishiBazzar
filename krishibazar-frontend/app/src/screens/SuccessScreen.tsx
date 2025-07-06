import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList, Order } from "../Utils/types";
import Icon from "react-native-vector-icons/MaterialIcons";
// import { MaterialIcons } from '@expo/vector-icons'; 

type SuccessScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "SuccessScreen"
>;

interface SuccessScreenProps {
  navigation: SuccessScreenNavigationProp;
}

const SuccessScreen: React.FC<SuccessScreenProps> = ({ navigation }) => {

  const order: Order = {
    orderNumber: "12345",
    date: new Date().toISOString().split("T")[0],
    status: "Processing",
    items: [],
  };

  const handleReturnHome = () => {
    navigation.navigate("OrderHistory", { order });
  };

  return (
    <View style={styles.container}>
      <Icon
        name="check-circle"
        size={100}
        color="#4CAF50"
        style={styles.icon}
      />
      <Text style={styles.title}>Payment Successful !!!</Text>
      <Text style={styles.message}>
        Thank you for your payment. Your transaction was successful!
      </Text>

      <TouchableOpacity style={styles.button} onPress={handleReturnHome}>
        <Text style={styles.buttonText}>Continue Shopping</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#E8F5E9",
    paddingHorizontal: 20,
  },
  icon: {
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 20,
    textAlign: "center",
  },
  message: {
    fontSize: 18,
    color: "#333",
    marginBottom: 30,
    textAlign: "center",
  },
  button: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 8,
    alignItems: "center",
  },
  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default SuccessScreen;