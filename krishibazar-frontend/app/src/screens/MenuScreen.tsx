import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Utils/types";
import { Ionicons, FontAwesome5 } from "@expo/vector-icons";
import useAuthStore from "./useAuthStore";

type NavigationProp = StackNavigationProp<RootStackParamList>;

const MenuScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  const clearToken = useAuthStore((state) => state.clearToken);
  const { decodedToken } = useAuthStore((state) => state);
  const userName = decodedToken?.user;
  const mail = decodedToken?.email;
  const userRole = decodedToken?.role;

  const handleProfile = () => navigation.navigate("ProfileScreen");

  const handleCreateBill = () => navigation.navigate("CreateBillScreen");

   const handleOrderHistory = () => { navigation.navigate("OrderHistory", { order: undefined });};

  const handleSettings = () => navigation.navigate("SettingsScreen");

  const handleLogout = async () => {
    try {
      await clearToken();
      navigation.navigate("Login");
      Alert.alert("Logged out", "You have been logged out successfully.");
    } catch (error) {
      console.error("Logout failed:", error);
      Alert.alert("Logout Error", "An error occurred during logout.");
    }
  };

  const handleBack = () => {
    if (userRole === "SELLER") {
      navigation.navigate("DashboardScreen");
    } else if (userRole === "BUYER") {
      navigation.navigate("HomeScreen", {});

    } else {
      navigation.goBack();
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity style={styles.iconButton} onPress={handleBack}>
          <Ionicons name="arrow-back" size={24} color="#4CAF50" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Menu</Text>
        <TouchableOpacity style={styles.iconButton} onPress={handleSettings}>
          <Ionicons name="settings-outline" size={24} color="#4CAF50" />
        </TouchableOpacity>
      </View>

      <View style={styles.profileSection}>
        <Image
          source={{ uri: "https://example.com/profile.jpg" }}
          style={styles.profileImage}
        />
        <Text style={styles.profileName}>{userName?.name || "User"}</Text>
        <Text style={styles.profileEmail}>{mail}</Text>
      </View>

      <View style={styles.menuContainer}>
        <TouchableOpacity style={styles.menuItem} onPress={handleProfile}>
          <FontAwesome5 name="user-circle" size={24} color="#4CAF50" />
          <Text style={styles.menuItemText}>Profile</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleCreateBill}>
          <FontAwesome5 name="file-invoice" size={24} color="#4CAF50" />
          <Text style={styles.menuItemText}>Create Bill</Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.menuItem} onPress={handleOrderHistory}>
          <Ionicons name="clipboard-outline" size={24} color="#4CAF50" />
          <Text style={styles.menuItemText}>Order History</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={24} color="#fff" />
        <Text style={styles.logoutText}>Logout</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#fff" },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingTop: 50,
    paddingHorizontal: 20,
  },
  iconButton: { padding: 10 },
  headerTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
    fontFamily: "Open Sans",
  },
  profileSection: { alignItems: "center", marginVertical: 40 },
  profileImage: {
    width: 120,
    height: 120,
    borderRadius: 60,
    borderWidth: 4,
    borderColor: "#4CAF50",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  profileName: {
    fontSize: 26,
    fontWeight: "bold",
    color: "#4CAF50",
    marginTop: 10,
    fontFamily: "Open Sans",
  },
  profileEmail: {
    fontSize: 16,
    color: "#555",
    marginTop: 5,
    fontFamily: "Roboto",
  },
  menuContainer: {
    flex: 1,
    marginTop: 20,
    marginHorizontal: 20,
  },
  menuItem: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.05)",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  menuItemText: {
    fontSize: 18,
    color: "#4CAF50",
    marginLeft: 15,
    fontFamily: "Roboto",
  },
  logoutButton: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#4CAF50",
    paddingVertical: 15,
    paddingHorizontal: 20,
    borderRadius: 15,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 5 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
    margin: 20,
    marginBottom: 30,
  },
  logoutText: {
    fontSize: 18,
    color: "#fff",
    marginLeft: 10,
    fontFamily: "Roboto",
  },
});

export default MenuScreen;
