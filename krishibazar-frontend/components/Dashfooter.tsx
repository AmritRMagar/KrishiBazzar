import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { StyleSheet, Text, TouchableOpacity, View, ViewStyle } from "react-native";
import { StackNavigationProp } from "@react-navigation/stack";
import { RootStackParamList } from "@/app/src/Utils/types";

type DashboardNavigationProp = StackNavigationProp<
  RootStackParamList,
  "DashboardScreen"
>;

type FooterProps = {
  style?: ViewStyle | ViewStyle[];
};

const Footer: React.FC<FooterProps> = ({ style }) => {
  const navigation = useNavigation<DashboardNavigationProp>();

  const handleDashboard = () => navigation.navigate("DashboardScreen");
  const handleEdit = () => navigation.navigate("DevProduct");
  const handleProductScreen = () => navigation.navigate("ProductScreen");
  const handleChat = () =>
    navigation.navigate("ChatScreen", {
      userId: "someUserId",
      chatId: "someChatId",
    });
  const handleMenu = () => navigation.navigate("MenuScreen");

  return (
    <View style={[styles.footer, style]}>
      <TouchableOpacity onPress={handleDashboard} style={styles.footerButton}>
        <Ionicons name="home-outline" size={24} color="black" />
        <Text style={styles.footerText}>Home</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleEdit} style={styles.footerButton}>
        <Ionicons name="pencil" size={24} color="black" />
        <Text style={styles.footerText}>Product</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleProductScreen} style={styles.footerButton}>
        <Ionicons name="add-circle-outline" size={24} color="black" />
        <Text style={styles.footerText}>Add</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleChat} style={styles.footerButton}>
        <Ionicons name="chatbubble-outline" size={24} color="black" />
        <Text style={styles.footerText}>Chat</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleMenu} style={styles.footerButton}>
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
     position: "absolute",
     bottom: 0,
     left: 0,       
     right: 0,       
     zIndex: 10, 
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
