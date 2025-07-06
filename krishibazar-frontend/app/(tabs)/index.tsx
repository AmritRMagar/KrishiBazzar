import React, { useEffect, useState } from "react";
import { createStackNavigator } from "@react-navigation/stack";
import { NavigationContainer } from "@react-navigation/native";
import { View, ActivityIndicator, StyleSheet } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import OnboardingScreen from "../src/screens/OnboardingScreen";
import LoginScreen from "../src/screens/LoginScreen";
import RegisterScreen from "../src/screens/RegisterScreen";
import DashboardScreen from "../src/screens/DashboardScreen";
import ProfileScreen from "../src/screens/ProfileScreen";
import SearchScreen from "../src/screens/SearchScreen";
import CartScreen from "../src/screens/CartScreen";
import OrdersScreen from "../src/screens/OrdersScreen";
import FavoritesScreen from "../src/screens/FavoritesScreen";
import EditProfileScreen from "../src/screens/EditProfile";
import NotificationsScreen from "../src/screens/NotificationsScreen";
import ProductScreen from "../src/screens/ProductScreen";
import MenuScreen from "../src/screens/MenuScreen";
import ShippingAddressScreen from "../src/screens/ShippingAddressScreen";
import HomeScreen from "../src/screens/HomeScreen";
//import ChatScreen from "../src/screens/ChatScreen";
import CheckoutScreen from "../src/screens/CheckoutScreen";
import PaymentScreen from "../src/screens/PaymentScreen";
import CreateBillScreen from "../src/screens/CreateBillScreen";
import ProductDetailScreen from "../src/screens/ProductDetailScreen";
import SuccessScreen from "../src/screens/SuccessScreen";
// import InvoiceScreen from "../src/screens/InvoiceScreen";
import DevProduct from "../src/screens/DevProduct";
import useAuthStore from "../src/screens/useAuthStore";
import { CartProvider } from "../src/screens/CartContext";
import { FavoritesProvider } from "../src/screens/FavoritesContext";
import OrderHistory from "../src/screens/OrderHistory";


const Stack = createStackNavigator();

const App = () => {

  const [loading, setLoading] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);


  useEffect(() => {
    const checkAuthStatus = async () => {
      try {
        const token = await AsyncStorage.getItem("token");
        if (token) {
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Error checking authentication status:", error);
      } finally {
        setLoading(false);
      }
    };

    checkAuthStatus();
  }, []);

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  return (
    <CartProvider>
      <FavoritesProvider>
        <Stack.Navigator
          initialRouteName={isAuthenticated ? "HomeScreen" : "Onboarding"}
        >
          <Stack.Screen
            name="Onboarding"
            component={OnboardingScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Login"
            component={LoginScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RegisterScreen"
            component={RegisterScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DevProduct"
            component={DevProduct}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="DashboardScreen"
            component={DashboardScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="PaymentScreen"
            component={PaymentScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ShippingAddressScreen"
            component={ShippingAddressScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProfileScreen"
            component={ProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrderHistory"
            component={OrderHistory}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="HomeScreen"
            component={HomeScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductDetailScreen"
            component={ProductDetailScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SearchScreen"
            component={SearchScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CartScreen"
            component={CartScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="OrdersScreen"
            component={OrdersScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="FavoritesScreen"
            component={FavoritesScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="EditProfile"
            component={EditProfileScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="NotificationsScreen"
            component={NotificationsScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="Checkout"
            component={CheckoutScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="ProductScreen"
            component={ProductScreen}
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
            name="ChatScreen"
            component={ChatScreen}
            options={{ headerShown: false }}
          /> */}
          <Stack.Screen
            name="MenuScreen"
            component={MenuScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="SuccessScreen"
            component={SuccessScreen} // Ensure this is a valid React component
            options={{ headerShown: false }}
          />
          {/* <Stack.Screen
        name="InvoiceScreen"
        component={InvoiceScreen}
        options={{ headerShown: false }}
      /> */}
          {/* <Stack.Screen
        name="GroupChatScreen"
        component={GroupChatScreen}
        options={{ headerShown: false }}
      />
      //
      <Stack.Screen
        name="BillConfirmationScreen"
        component={BillConfirmationScreen} // Ensure this is a valid React component
        options={{ headerShown: false }}
      /> */}
          <Stack.Screen
            name="CreateBillScreen"
            component={CreateBillScreen} // Ensure this is a valid React component
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </FavoritesProvider>
    </CartProvider>
  );
};


const styles = StyleSheet.create({
  loadingContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
});

export default App;