import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
  Linking,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Utils/types";

type PaymentScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "PaymentScreen"
>;

interface PaymentScreenProps {
  navigation: PaymentScreenNavigationProp;
}

const PaymentScreen: React.FC<PaymentScreenProps> = ({ navigation }) => {
  const [paymentMethod, setPaymentMethod] = useState<
    "esewa" | "khalti" | "deferred"
  >("esewa");

  const handlePayment = () => {
    if (paymentMethod === "deferred") {
      Alert.alert(
        "Payment Deferred",
        "You will pay after delivery. Thank you for your purchase!"
      );
      navigation.navigate("SuccessScreen");
    } else if (paymentMethod === "esewa") {
      Linking.openURL("https://www.esewa.com.np");
    } else if (paymentMethod === "khalti") {
      Linking.openURL("https://www.khalti.com");
    }
  };


  return (
    <View style={styles.container}>
      <Image
        source={require("@/assets/qrdemoo.jpg")}
        style={styles.image}
      />
      <Text style={styles.title}>Payment Options</Text>
      <Text style={styles.subtitle}>Choose your preferred payment method:</Text>

      <View style={styles.optionsContainer}>
        <TouchableOpacity
          style={[
            styles.optionButton,
            paymentMethod === "esewa" && styles.selectedOption,
          ]}
          onPress={() => setPaymentMethod("esewa")}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === "esewa" && styles.selectedOptionText,
            ]}
          >
            Pay with eSewa
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            paymentMethod === "khalti" && styles.selectedOption,
          ]}
          onPress={() => setPaymentMethod("khalti")}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === "khalti" && styles.selectedOptionText,
            ]}
          >
            Pay with Khalti
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.optionButton,
            paymentMethod === "deferred" && styles.selectedOption,
          ]}
          onPress={() => setPaymentMethod("deferred")}
        >
          <Text
            style={[
              styles.optionText,
              paymentMethod === "deferred" && styles.selectedOptionText,
            ]}
          >
            Pay After Delivery
          </Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.confirmButton} onPress={handlePayment}>
        <Text style={styles.confirmButtonText}>Confirm Payment</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#FAFAFA",
    paddingHorizontal: 20,
  },
  image: {
    width: 120,
    height: 120,
    marginBottom: 20,
  },
  title: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginBottom: 10,
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: "#555",
    marginBottom: 30,
    textAlign: "center",
  },
  optionsContainer: {
    width: "100%",
    paddingHorizontal: 20,
  },
  optionButton: {
    backgroundColor: "#FFFFFF",
    paddingVertical: 15,
    borderRadius: 8,
    marginBottom: 10,
    borderWidth: 1,
    borderColor: "#4CAF50",
    alignItems: "center",
  },
  selectedOption: {
    backgroundColor: "#4CAF50",
  },
  optionText: {
    color: "#4CAF50",
    fontSize: 18,
    fontWeight: "bold",
  },
  selectedOptionText: {
    color: "#FFFFFF",
  },
  confirmButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    marginTop: 20,
    width: "100%",
    alignItems: "center",
  },
  confirmButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default PaymentScreen;