import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";


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


export type Profile = {
  name: string;
  email: string;
  phone: string;
  address: string;
  profileImage: string;
};


export type Order = {
  orderNumber: string;
  date: string;
  status: string;
  items: CartItem[];
};

export type RootStackParamList = {
  Onboarding: undefined;
  Login: undefined;
  RegisterScreen: undefined;
  DashboardScreen: undefined;
  ProfileScreen: undefined;
  ProductScreen: { productId: string };
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
  ProductDetailScreen: { productId: string };
  CategoryScreen: { categoryId: string };
  SuccessScreen: undefined;
  OrderHistory: { order: Order };
};

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