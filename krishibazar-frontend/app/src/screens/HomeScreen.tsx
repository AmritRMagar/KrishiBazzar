import React, { useEffect, useState } from "react";
import {
  View,
  ScrollView,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
  ActivityIndicator,
} from "react-native";
import Ionicons from "react-native-vector-icons/Ionicons";
import { useNavigation, useRoute } from "@react-navigation/native";
import axios from "axios";
import Swiper from "react-native-swiper";
import Footer from "@/components/Footer";
import { RootStackParamList } from "../Utils/types";
import { RouteProp } from "@react-navigation/native";
import { BASE_API_URL, IMAGE_URL } from "@/constants/apiConfig";
import { DrawerNavigationProp } from "@react-navigation/drawer";
import useAuthStore from "./useAuthStore";

const { width } = Dimensions.get("window");

const slideImages = [
  require("@/assets/slide1.jpg"),
  require("@/assets/slide2.jpg"),
  require("@/assets/slide3.jpg"),
  require("@/assets/slide4.jpg"),
  require("@/assets/slide5.jpg"),
];

type HomeScreenRouteProp = RouteProp<RootStackParamList, "HomeScreen">;

const HomeScreen: React.FC = () => {
  const navigation = useNavigation<DrawerNavigationProp<RootStackParamList>>();
  const route = useRoute<HomeScreenRouteProp>();
  const profile = route.params?.profile;

  const { decodedToken } = useAuthStore(state => state);
  const userName = decodedToken?.user;

  const [location, setLocation] = useState("Current Location");
  const [products, setProducts] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`${BASE_API_URL}/home`);
        const { username, products } = response.data;


        setProducts(products);
      } catch (error) {
        console.error("Error fetching home screen data:", error);
      } finally {
        setLoading(false);
      }
    };

    const fetchProducts = async () => {
      try {
        const res = await axios.get(`${BASE_API_URL}/products`);
        setProducts(res.data);
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    fetchProducts();
    fetchData();
  }, []);

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  const handleMenu = () => {
    navigation.navigate("MenuScreen");
  };

  const handleSearch = () => {

  };
  const handleLocation = () => {

  };
  const handleFavorites = () => {
    navigation.navigate("FavoritesScreen");
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  return (
    <View style={styles.container}>

      <View style={styles.header}>
        <View style={styles.topRow}>
          <TouchableOpacity onPress={handleMenu} style={styles.iconButton}>
            <Ionicons name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
          <View style={styles.textContainer}>
            <Text style={styles.helloText}>Hi, {userName?.name || "User"}</Text>
            <Text style={styles.greetingText}>{getGreetingMessage()}</Text>
          </View>
          <TouchableOpacity onPress={handleFavorites} style={styles.iconButton}>
            <Ionicons name="heart-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
        <View style={styles.bottomRow}>
          <View style={styles.locationContainer}>
            <TouchableOpacity
              onPress={handleLocation}
              style={styles.iconButton}
            >
              <Ionicons name="location-outline" size={30} color="black" />
            </TouchableOpacity>
            <Text style={styles.locationText}>{location}</Text>
          </View>
          <TouchableOpacity onPress={handleSearch} style={styles.searchButton}>
            <Ionicons name="search-outline" size={30} color="white" />
            <Text style={styles.searchText}>Search</Text>
          </TouchableOpacity>
        </View>
      </View>


      <ScrollView style={styles.body}>

        <View style={styles.slideshow}>
          <Swiper
            style={styles.wrapper}
            autoplay
            autoplayTimeout={3}
            showsButtons={false}
            showsPagination={false}
          >
            {slideImages.map((image, index) => (
              <View key={index} style={styles.slide}>
                <Image source={image} style={styles.image} />
              </View>
            ))}
          </Swiper>
        </View>

        <Text style={styles.sectionTitle}>Most Popular</Text>
        <ScrollView
          horizontal
          contentContainerStyle={styles.productContainer}
          showsHorizontalScrollIndicator={false}
        >
          {products.map((product) => (
            <TouchableOpacity
              key={product.id}
              style={styles.productCard}
              onPress={() => {
                navigation.navigate("ProductDetailScreen", {
                  productId: product.id,
                });
              }}
            >
              <Image
                source={{ uri: `${IMAGE_URL}/${product.image}` }}
                style={styles.productImage}
              />
              <Text style={styles.productTitle}>{product.title}</Text>
              <Text style={styles.productPrice}>${product.price}</Text>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </ScrollView>


      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f5f5f5",
  },
  header: {
    backgroundColor: "#fff",
    padding: 20,
    elevation: 4,
  },
  topRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  iconButton: {
    padding: 10,
  },
  textContainer: {
    flex: 1,
    alignItems: "center",
  },
  helloText: {
    fontSize: 24,
    fontWeight: "bold",
  },
  greetingText: {
    fontSize: 16,
    color: "#6c757d",
  },
  bottomRow: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginTop: 10,
  },
  locationContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  locationText: {
    fontSize: 16,
    marginLeft: 10,
  },
  searchButton: {
    backgroundColor: "#007bff",
    borderRadius: 20,
    padding: 10,
    flexDirection: "row",
    alignItems: "center",
  },
  searchText: {
    color: "#fff",
    marginLeft: 5,
  },
  body: {
    flex: 1,
    padding: 10,
  },
  slideshow: {
    height: 200,
    marginBottom: 10,
  },
  wrapper: {},
  slide: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  image: {
    width,
    height: 200,
    resizeMode: "cover",
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 10,
  },
  productContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "flex-start",
    alignItems: "flex-start",
    paddingVertical: 10,
  },
  productCard: {
    width: width * 0.4,
    marginRight: 10,
    marginBottom: 10,
    alignItems: "center",
  },
  productImage: {
    width: "100%",
    height: 150,
    borderRadius: 10,
  },
  productTitle: {
    marginTop: 5,
    textAlign: "center",
  },
  productPrice: {
    fontWeight: "bold",
    marginTop: 5,
  },
});

export default HomeScreen;