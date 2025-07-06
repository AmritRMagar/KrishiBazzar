import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

// Cart item structure
export type CartItem = {
  id: string;
  title: string;
  description: string;
  price: number;
  quantity: number;
  image: string;
  stock: number;
  unit: string;
};

// Profile structure
export type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
};

// Order structure
export type Order = {
  orderNumber: string;
  date: string;
  status: string;
  items: CartItem[];
};

// Root Stack Param List for Navigation
export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  RegisterScreen: undefined;
  DashboardScreen: undefined;
  ProfileScreen: undefined;
  ProductScreen: { productId: string };
  DevProduct: undefined;
  HomeScreen: { profile?: Profile };
  SearchScreen: undefined;
  ShippingAddressScreen: undefined;
  PaymentScreen: undefined;
  CheckoutScreen: { cartItems: CartItem[] };
  NotificationsScreen: {
    message: string;
    type?: "success" | "error" | "info";
  };
  OrdersScreen: undefined;
  FavoritesScreen: undefined;
  EditProfile: {
    profile: Profile;
    setProfile: React.Dispatch<React.SetStateAction<Profile>>;
  };
  ChatScreen: { userId: string; chatId: string };
  MenuScreen: undefined;
  GroupChatScreen: undefined;
  ExploreScreen: { categoryId: string };
  ProductDetailScreen: { productId: number }; // number based on your API
  CategoryScreen: { categoryId: string };
  SuccessScreen: undefined;
  OrderHistory: { order?: Order };
  CreateBillScreen: undefined;
  SettingsScreen: undefined;
};

// Navigation and Route Props (example)
export type CheckoutScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "CheckoutScreen"
>;
export type CheckoutScreenRouteProp = RouteProp<
  RootStackParamList,
  "CheckoutScreen"
>;

export type OrderHistoryNavigationProp = StackNavigationProp<
  RootStackParamList,
  "OrderHistory"
>;
export type OrderHistoryRouteProp = RouteProp<
  RootStackParamList,
  "OrderHistory"
>;

