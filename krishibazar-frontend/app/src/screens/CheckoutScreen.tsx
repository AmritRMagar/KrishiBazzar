import React from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useRoute, useNavigation } from "@react-navigation/native";
import {
  CheckoutScreenRouteProp,
  CheckoutScreenNavigationProp,
  CartItem,
} from "../Utils/types";

const CheckoutScreen: React.FC = () => {
  const route = useRoute<CheckoutScreenRouteProp>();
  const navigation = useNavigation<CheckoutScreenNavigationProp>();
  const { cartItems } = route.params;

  const handlePlaceOrder = () => {
    const orderNumber = Math.floor(Math.random() * 100000).toString();
    const orderDate = new Date().toISOString().split("T")[0];

    const order = {
      orderNumber,
      date: orderDate,
      status: "Processing",
      items: cartItems,
    };

    
    navigation.navigate("OrderHistory", { order });

    Alert.alert("Order is successfully placed");
  };

  const renderOrderItem = ({ item }: { item: CartItem }) => (
    <View style={styles.orderItem}>
      <Text style={styles.itemTitle}>{item.title}</Text>
      <Text style={styles.itemDetails}>
        ${item.price.toFixed(2)} x {item.quantity}
      </Text>
    </View>
  );

  const getTotalPrice = () => {
    return cartItems.reduce(
      (total, item) => total + item.price * item.quantity,
      0
    );
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Checkout</Text>
      <FlatList
        data={cartItems}
        renderItem={renderOrderItem}
        keyExtractor={(item) => item.id}
        style={styles.summaryContainer}
        contentContainerStyle={styles.listContentContainer}
      />
      <View style={styles.totalContainer}>
        <Text style={styles.totalText}>Total</Text>
        <Text style={styles.totalPrice}>${getTotalPrice().toFixed(2)}</Text>
      </View>
      <TouchableOpacity
        style={styles.placeOrderButton}
        onPress={handlePlaceOrder}
      >
        <Text style={styles.placeOrderButtonText}>Place Order</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#F9F9F9",
  },
  header: {
    fontSize: 26,
    fontWeight: "700",
    textAlign: "center",
    marginBottom: 20,
    color: "#333333",
  },
  summaryContainer: {
    flexGrow: 1,
    marginBottom: 20,
  },
  listContentContainer: {
    paddingBottom: 10,
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
  totalContainer: {
    backgroundColor: "#FFFFFF",
    padding: 15,
    borderRadius: 10,
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
    marginBottom: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
  totalText: {
    fontSize: 20,
    fontWeight: "600",
    color: "#333333",
  },
  totalPrice: {
    fontSize: 20,
    fontWeight: "600",
    color: "#28A745",
  },
  placeOrderButton: {
    backgroundColor: "#28A745",
    paddingVertical: 15,
    borderRadius: 10,
    alignItems: "center",
    justifyContent: "center",
  },
  placeOrderButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "700",
  },
});

export default CheckoutScreen;