import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/src/Utils/types";

type HomeScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "HomeScreen"
>;

const Footer: React.FC = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();

  const handleProfile = () => navigation.navigate("ProfileScreen");
  const handleSearch = () => navigation.navigate("SearchScreen");

  const handleChat = () =>
    navigation.navigate("ChatScreen", {
      userId: "someUserId",
      chatId: "someChatId",
    });

  const handleCart = () => navigation.navigate("CartScreen");
  const handleMenu = () => navigation.navigate("MenuScreen");
  const handleNotifications = () => navigation.navigate("NotificationsScreen");

  const handleHomePage = () =>
    navigation.navigate("HomeScreen", {
      profile: {
        name: "John Doe",
        profileImage: "imageUrl",
      },
    });

  return (
    <View style={styles.footer}>
      <TouchableOpacity
        onPress={handleHomePage}
        style={styles.footerButton}
        accessibilityLabel="Home"
      >
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleCart}
        style={styles.footerButton}
        accessibilityLabel="Cart"
      >
        <Ionicons name="cart-outline" size={24} color="black" />
        <Text style={styles.footerText}>Cart</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleChat}
        style={styles.footerButton}
        accessibilityLabel="Chat"
      >
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text style={styles.footerText}>Chat</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={handleMenu}
        style={styles.footerButton}
        accessibilityLabel="Menu"
      >
        <Ionicons name="menu-outline" size={24} color="black" />
        <Text style={styles.footerText}>Menu</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  footer: {
    flexDirection: "row",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: "#fff",
    borderTopWidth: 1,
    borderTopColor: "#ddd",
    paddingVertical: 10,
  },
  footerButton: {
    alignItems: "center",
  },
  footerText: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default Footer;