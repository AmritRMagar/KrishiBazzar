import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { useRoute } from "@react-navigation/native";
import { OrderHistoryRouteProp, CartItem } from "../Utils/types";
import Footer from "@/components/Footer";

const OrderHistory: React.FC = () => {
  const route = useRoute<OrderHistoryRouteProp>();
  const { order } = route.params;

  const renderOrderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDetails}>
        ${item.price.toFixed(2)} x {item.quantity}
      </Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Order #{order.orderNumber}</Text>
      <Text style={styles.orderDate}>Date: {order.date}</Text>
      <Text style={styles.orderStatus}>Status: {order.status}</Text>
      <FlatList
        data={order.items}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        contentContainerStyle={styles.listContainer}
      />
      <View style={styles.footer}>
      <Footer />
      </View>

    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
    paddingBottom: 60, // Ensure space for the footer
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    marginBottom: 10,
    color: "#333333",
  },
  orderDate: {
    fontSize: 18,
    marginBottom: 5,
    color: "#555555",
  },
  orderStatus: {
    fontSize: 18,
    marginBottom: 20,
    color: "#555555",
  },
  orderItem: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
    padding: 15,
    marginVertical: 8,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  itemTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333333",
  },
  itemDetails: {
    fontSize: 16,
    color: "#555555",
  },
  listContainer: {
    paddingBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
  },
  footerText: {
    fontSize: 16,
    color: "#FFFFFF",
  },
});

export default OrderHistory;