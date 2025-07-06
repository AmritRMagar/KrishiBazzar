import React, { useState } from "react";
import { jwtDecode, JwtPayload } from "jwt-decode";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  SafeAreaView,
  Image,
  Alert,
} from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import axios from "axios";
import { BASE_API_URL } from "@/constants/apiConfig";
import useAuthStore from "./useAuthStore";

type RootStackParamList = {
  Login: undefined;
  RegisterScreen: undefined;
  WelcomeScreen: undefined;
  HomeScreen: undefined;
  DashboardScreen: undefined;
};

type LoginScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "Login"
>;

type Props = {
  navigation: LoginScreenNavigationProp;
};

interface CustomJwtPayload extends JwtPayload {
  role?: string;
}

const LoginScreen: React.FC<Props> = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setToken } = useAuthStore();

  const handleLogin = async () => {
    if (!email || !password) {
      Alert.alert("Error", "All fields are required");
      return;
    }

    try {
      const response = await axios.post(
        `${BASE_API_URL}/auth/login`,
        {
          email,
          password,
        },
        {
          headers: {
            "Content-Type": "application/json",
          }
        }
      );

      if (response.status === 200) {
        const { token } = response.data;

        const decodedToken = jwtDecode<CustomJwtPayload>(token);
        console.log("Decoded token:", decodedToken);

        setToken(token, decodedToken);

        Alert.alert("Success", "Successfully logged in");

        if (decodedToken.role === "ADMIN" || decodedToken.role === "SELLER") {
          navigation.navigate("DashboardScreen");
        } else {
          navigation.navigate("HomeScreen");
        }
      }
    } catch (error) {
      if (axios.isAxiosError(error)) {
        if (error.response) {
          Alert.alert(
            "Error",
            `Login failed: ${error.response.data.message || JSON.stringify(error.response.data)
            }`
          );
        } else if (error.request) {
          Alert.alert("Error", "No response from the server");
        }
      } else {
        Alert.alert("Error", "An unexpected error occurred");
      }
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.innerContainer}>
        <Text style={styles.title}>Welcome to KrishiBazar!!!</Text>
        <Image source={require("@/assets/krishi.jpg")} style={styles.logo} />
        <Text style={styles.subtitle}>Log In</Text>
        <TextInput
          style={styles.input}
          placeholder="Username or Email"
          placeholderTextColor="#757575"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          placeholderTextColor="#757575"
          secureTextEntry
          value={password}
          onChangeText={setPassword}
        />
        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
          <Text style={styles.loginButtonText}>Log In</Text>
        </TouchableOpacity>
        <View style={styles.signupContainer}>
          <Text style={styles.signupText}>Don't have an account?</Text>
          <TouchableOpacity
            onPress={() => navigation.navigate("RegisterScreen")}
          >
            <Text style={styles.signupLink}>Sign up</Text>
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
    justifyContent: "center",
    alignItems: "center",
  },
  innerContainer: {
    width: "80%",
    paddingHorizontal: 20,
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
    alignSelf: "center",
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
    fontFamily: "Roboto",
  },
  loginButton: {
    backgroundColor: "#4CAF50",
    paddingVertical: 10,
    borderRadius: 5,
    alignItems: "center",
    marginBottom: 20,
  },
  loginButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: "Open Sans",
  },
  signupContainer: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
  },
  signupText: {
    color: "#757575",
    fontSize: 14,
    fontFamily: "Roboto",
  },
  signupLink: {
    color: "#4CAF50",
    fontSize: 14,
    marginLeft: 5,
    fontFamily: "Open Sans",
  },
});

export default LoginScreen;