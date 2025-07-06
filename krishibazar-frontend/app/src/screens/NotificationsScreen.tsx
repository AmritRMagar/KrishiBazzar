import React from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import Footer from "@/components/Dashfooter";

const NotificationsScreen: React.FC = () => {
  const notifications = [
    { id: 1, message: "You have a new message from John." },
    { id: 2, message: "Your order has been shipped." },
    { id: 3, message: "New promotion available!" },
    { id: 4, message: "You have 3 new notifications." },
  ];

  return (
    <View style={styles.mainContainer}>
      <View style={styles.contentContainer}>
        <FlatList
          data={notifications}
          keyExtractor={(item) => item.id.toString()}
          renderItem={({ item }) => (
            <View style={styles.notificationItem}>
              <Text>{item.message}</Text>
            </View>
          )}
        />
      </View>

    
      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
  },
  contentContainer: {
    flex: 1,
    padding: 16,
  },
  notificationItem: {
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: "#ccc",
  },
  footerContainer: {
    height: 60,
    backgroundColor: "#f5f5f5",
  },
});

export default NotificationsScreen;