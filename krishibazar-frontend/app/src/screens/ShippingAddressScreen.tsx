import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  ScrollView,
  TouchableOpacity,
  Alert,
  Switch,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Utils/types"; 
import { Ionicons } from "@expo/vector-icons";

type ShippingAddressScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ShippingAddressScreen"
>;

const ShippingAddressScreen = () => {
  const navigation = useNavigation<ShippingAddressScreenNavigationProp>();

  const [fullName, setFullName] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [emailAddress, setEmailAddress] = useState<string>("");
  const [streetAddress, setStreetAddress] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [deliveryInstructions, setDeliveryInstructions] = useState<string>("");
  const [addressLabel, setAddressLabel] = useState<string>("");
  const [defaultAddress, setDefaultAddress] = useState<boolean>(false);

  const handleSaveAddress = () => {
    // Validation checks
    if (!fullName || !phoneNumber || !emailAddress || !streetAddress || !city) {
      Alert.alert("Error", "Please fill in all required fields.");
      return;
    }

    if (!/^\d{10}$/.test(phoneNumber)) {
      Alert.alert("Error", "Please enter a valid phone number.");
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailAddress)) {
      Alert.alert("Error", "Please enter a valid email address.");
      return;
    }

    // Successful address save
    console.log("Shipping Address Saved:", {
      fullName,
      phoneNumber,
      emailAddress,
      streetAddress,
      city,
      defaultAddress,
      deliveryInstructions,
      addressLabel,
    });

    Alert.alert("Success", "Shipping address saved successfully!", [
      { text: "OK", onPress: () => navigation.navigate("PaymentScreen") },
    ]);
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.backButton}
        >
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Shipping Address</Text>
      </View>

      <View style={styles.innerContainer}>
        <TextInput
          style={styles.input}
          placeholder="Full Name"
          value={fullName}
          onChangeText={setFullName}
          placeholderTextColor="#8a8a8a"
        />

        <TextInput
          style={styles.input}
          placeholder="Phone Number"
          value={phoneNumber}
          onChangeText={setPhoneNumber}
          keyboardType="phone-pad"
          placeholderTextColor="#8a8a8a"
        />

        <TextInput
          style={styles.input}
          placeholder="Email Address"
          value={emailAddress}
          onChangeText={setEmailAddress}
          keyboardType="email-address"
          placeholderTextColor="#8a8a8a"
        />

        <TextInput
          style={styles.input}
          placeholder="Street Address"
          value={streetAddress}
          onChangeText={setStreetAddress}
          placeholderTextColor="#8a8a8a"
        />

        <TextInput
          style={styles.input}
          placeholder="City"
          value={city}
          onChangeText={setCity}
          placeholderTextColor="#8a8a8a"
        />

        <View style={styles.switchContainer}>
          <Text style={styles.switchLabel}>
            Set as Default Shipping Address
          </Text>
          <Switch
            value={defaultAddress}
            onValueChange={setDefaultAddress}
            thumbColor={defaultAddress ? "#4CAF50" : "#f4f3f4"}
            trackColor={{ false: "#767577", true: "#81b0ff" }}
          />
        </View>

        <TextInput
          style={[styles.input, styles.textArea]}
          placeholder="Add any special instructions for delivery"
          value={deliveryInstructions}
          onChangeText={setDeliveryInstructions}
          multiline
          numberOfLines={4}
          placeholderTextColor="#8a8a8a"
        />

        <TextInput
          style={styles.input}
          placeholder="Label this address (e.g., Home, Work)"
          value={addressLabel}
          onChangeText={setAddressLabel}
          placeholderTextColor="#8a8a8a"
        />

        <TouchableOpacity style={styles.saveButton} onPress={handleSaveAddress}>
          <Text style={styles.saveButtonText}>Save Address</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    backgroundColor: "#FFF",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 15,
    backgroundColor: "#FFFFFF",
    paddingTop: 50,
    elevation: 5,
  },
  backButton: {
    position: "absolute",
    left: 20,
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    fontFamily: "Open Sans",
    textAlign: "center",
  },
  innerContainer: {
    flex: 1,
    marginTop: 20,
    paddingHorizontal: 15,
  },
  input: {
    borderWidth: 1,
    borderColor: "#ced4da",
    padding: 15,
    marginBottom: 15,
    borderRadius: 8,
    backgroundColor: "#fff",
    fontSize: 16,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  textArea: {
    height: 100,
    textAlignVertical: "top",
  },
  switchContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  switchLabel: {
    fontSize: 16,
    color: "#333",
  },
  saveButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: "center",
    shadowColor: "#4CAF50",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  saveButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "bold",
  },
});

export default ShippingAddressScreen;