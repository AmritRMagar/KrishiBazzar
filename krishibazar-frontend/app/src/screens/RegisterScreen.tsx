import { BASE_API_URL } from "@/constants/apiConfig";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import React, { useState } from "react";
import {
  Alert,
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { Dropdown } from "react-native-element-dropdown";

type RootStackParamList = {
  Login: undefined;
  RegisterScreen: undefined;
  WelcomeScreen: undefined;
  Dashboard: undefined;
};

type RegisterScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "RegisterScreen"
>;

type Props = {
  navigation: RegisterScreenNavigationProp;
};

const RegisterScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [role, setRole] = useState("BUYER"); // Default role

  const handleRoleChange = (item: { value: string; label: string }) => {
    setRole(item.value);
  };

  const handleSignUp = async () => {
    if (!email || !username || !password || !confirmPassword) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    if (password !== confirmPassword) {
      Alert.alert("Error", "Passwords do not match");
      return;
    }

    try {
      const response = await axios.post(`${BASE_API_URL}/auth/register`, {
        email,
        username,
        password,
        role,
      });

      if (response.status === 201) {
        Alert.alert("Success", "Successfully registered");
        navigation.navigate("Login");
      } else {
        Alert.alert("Error", response.data.message || "Failed to register");
      }
    } catch (error: any) {
      Alert.alert(
        "Error",
        error.response?.data.message || "An unexpected error occurred"
      );
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Quotes for KrishiBazar</Text>
        <Image source={require("@/assets/krishi.jpg")} style={styles.logo} />
        <Text style={styles.subtitle}>Sign Up</Text>
        <TextInput
          style={styles.input}
          placeholder="Enter your email"
          placeholderTextColor="#757575"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Enter username"
          placeholderTextColor="#757575"
          value={username}
          onChangeText={setUsername}
        />
        <TextInput
          style={styles.input}
          placeholder="Enter password"
          placeholderTextColor="#757575"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TextInput
          style={styles.input}
          placeholder="Confirm password"
          placeholderTextColor="#757575"
          secureTextEntry
          value={confirmPassword}
          onChangeText={setConfirmPassword}
        />
        <View style={styles.dropdownContainer}>
          <Dropdown
            data={[
              { label: "Buyer", value: "BUYER" },
              { label: "Seller", value: "SELLER" },
            ]}
            labelField="label"
            valueField="value"
            value={role}
            onChange={handleRoleChange}
            placeholder="Select Role"
            containerStyle={styles.dropdown}
          />
        </View>
        <TouchableOpacity style={styles.signupButton} onPress={handleSignUp}>
          <Text style={styles.signupButtonText}>Sign Up</Text>
        </TouchableOpacity>
        <View style={styles.loginContainer}>
          <Text style={styles.loginText}>Already have an account?</Text>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text style={styles.loginLink}>Log in</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5DC",
  },
  innerContainer: {
    flex: 1,
    paddingHorizontal: 20,
    paddingVertical: 30,
    backgroundColor: "#fff",
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    marginBottom: 20,
    textAlign: "center",
    color: "#4CAF50",
    fontFamily: "Open Sans",
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: "600",
    marginBottom: 20,
    textAlign: "center",
    color: "#8D6E63",
    fontFamily: "Open Sans",
  },
  input: {
    height: 40,
    borderColor: "#8D6E63",
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
    backgroundColor: "#F5F5DC",
    width: "100%",
    fontFamily: "Roboto",
  },
  dropdownContainer: {
    width: "100%",
    marginBottom: 15,
  },
  dropdown: {
    height: 40,
    width: "100%",
    backgroundColor: "#F5F5DC",
    borderColor: "#8D6E63",
    borderWidth: 1,
    borderRadius: 5,
  },
  signupButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    width: "100%",
    alignItems: "center",
    marginBottom: 15,
  },
  signupButtonText: {
    color: "#fff",
    fontSize: 16,
    fontFamily: "Open Sans",
  },
  loginContainer: {
    flexDirection: "row",
    marginTop: 15,
  },
  loginText: {
    fontSize: 14,
    color: "#757575",
    fontFamily: "Roboto",
  },
  loginLink: {
    fontSize: 14,
    color: "#4CAF50",
    fontFamily: "Roboto",
    marginLeft: 5,
  },
});

export default RegisterScreen;