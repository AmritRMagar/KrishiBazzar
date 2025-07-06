import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "../Utils/types"; // Adjust import path as necessary
import { Ionicons, FontAwesome } from "@expo/vector-icons";
import useAuthStore from "./useAuthStore"

type ProfileScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "ProfileScreen"
>;

const ProfileScreen = () => {
  const navigation = useNavigation<ProfileScreenNavigationProp>();
  const { decodedToken } = useAuthStore(state => state);
  const userName = decodedToken?.user;
  const mail = decodedToken?.email;

const [profile, setProfile] = useState({
  name: userName?.name || "Guest",
  email: mail || "example@example.com",
  phone: "+123 456 7890",
  address: "Nayamil, Butwal",
  profileImage: "https://via.placeholder.com/150",
});



  const handleEditProfile = () => {
    navigation.navigate("EditProfile", { profile, setProfile });
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
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.innerContainer}>
        <View style={styles.profileHeader}>
          <View style={styles.profileImageContainer}>
            <Image
              source={{ uri: profile.profileImage }}
              style={styles.profileImage}
            />
            <TouchableOpacity
              style={styles.editIcon}
              onPress={handleEditProfile}
            >
              <Ionicons name="pencil" size={24} color="#FFFFFF" />
            </TouchableOpacity>
          </View>
          <View style={styles.infoBox}>
            <View style={styles.infoItem}>
              <FontAwesome name="user" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{userName?.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="envelope" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{mail}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="phone" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{profile.phone}</Text>
            </View>
            <View style={styles.infoItem}>
              <FontAwesome name="map-marker" size={20} color="#4CAF50" />
              <Text style={styles.infoText}>{profile.address}</Text>
            </View>
          </View>
        </View>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    alignItems: "center",
    backgroundColor: "#FFF",
  },
  header: {
    width: "100%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 10,
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
    width: "90%",
    paddingHorizontal: 20,
    marginTop: 20,
  },
  profileHeader: {
    alignItems: "center",
    marginBottom: 20,
  },
  profileImageContainer: {
    position: "relative",
    alignItems: "center",
  },
  profileImage: {
    width: 150,
    height: 150,
    borderRadius: 75,
    borderWidth: 5,
    borderColor: "#4CAF50",
    marginBottom: 20,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 5,
  },
  editIcon: {
    position: "absolute",
    bottom: 10,
    right: 10,
    backgroundColor: "#4CAF50",
    borderRadius: 50,
    padding: 8,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 3,
  },
  infoBox: {
    width: "100%",
    padding: 15,
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 5,
    elevation: 2,
  },
  infoItem: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  infoText: {
    marginLeft: 10,
    fontSize: 18,
    color: "#4CAF50",
    fontFamily: "Open Sans",
  },
  logoutButton: {
    backgroundColor: "#FF5722",
    borderRadius: 5,
    padding: 15,
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    marginTop: 20,
  },
  logoutText: {
    fontSize: 18,
    color: "#FFFFFF",
    fontWeight: "bold",
    fontFamily: "Roboto",
  },
});

export default ProfileScreen;