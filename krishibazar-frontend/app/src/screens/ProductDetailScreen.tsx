import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  Image,
  StyleSheet,
  ScrollView,
  ActivityIndicator,
  TouchableOpacity,
  Dimensions,
  Alert,
} from "react-native";
import { RouteProp, useRoute, useNavigation } from "@react-navigation/native";
import axios from "axios";
import { BASE_API_URL, IMAGE_URL } from "@/constants/apiConfig";
import { RootStackParamList } from "../Utils/types";
import { FontAwesome, MaterialIcons } from "@expo/vector-icons";
import { useCart } from "./CartContext";
import { useFavorites } from "./FavoritesContext";

const { width, height } = Dimensions.get("window");

const ProductDetailScreen: React.FC = () => {
  const route =
    useRoute<RouteProp<RootStackParamList, "ProductDetailScreen">>();
  const navigation = useNavigation();
  const { productId } = route.params;

  const [product, setProduct] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useCart();
  const { addToFavorites, favoriteProducts } = useFavorites();

  useEffect(() => {
    const fetchProductDetails = async () => {
      try {
        const response = await axios.get(
          `${BASE_API_URL}/products/${productId}`
        );
        setProduct(response.data);
      } catch (error) {
        console.error("Error fetching product details:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [productId]);

  const handleAddToCart = () => {
    if (product) {
      addToCart({
        id: product.id,
        title: product.title,
        price: product.price,
        image: `${IMAGE_URL}/${product.image}`,
        quantity,
      });

      Alert.alert("Success", "Successfully added to cart", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const handleAddToFavorites = () => {
    if (product) {
      addToFavorites({
        id: product.id,
        title: product.title,
        price: product.price,
        image: `${IMAGE_URL}/${product.image}`,
      });

      Alert.alert("Success", "Successfully added to favorites", [
        { text: "OK", onPress: () => console.log("OK Pressed") },
      ]);
    }
  };

  const increaseQuantity = () => {
    setQuantity((prevQuantity) => prevQuantity + 1);
  };

  const decreaseQuantity = () => {
    setQuantity((prevQuantity) => Math.max(prevQuantity - 1, 1));
  };

  if (loading) {
    return (
      <View style={styles.loadingContainer}>
        <ActivityIndicator size="large" color="#007bff" />
      </View>
    );
  }

  if (!product) {
    useEffect(() => {
      navigation.navigate("HomeScreen");
    }, [navigation]);

    return (
      <View style={styles.container}>
        <Text>Product not found</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollView}>
        <View style={styles.headerContainer}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={styles.backButton}
          >
            <MaterialIcons name="arrow-back" size={30} color="#4CAF50" />
          </TouchableOpacity>
          <Text style={styles.title}>Product Details</Text>
        </View>
        <Image
          source={{ uri: `${IMAGE_URL}/${product.image}` }}
          style={styles.productImage}
        />
        <View style={styles.titleContainer}>
          <Text style={styles.title}>{product.title}</Text>
          <View style={styles.starsContainer}>
            {[...Array(5)].map((_, index) => (
              <MaterialIcons
                key={index}
                name="star"
                size={24}
                color="#FFD700"
              />
            ))}
          </View>
        </View>
        <View style={styles.detailsContainer}>
          <View style={styles.priceContainer}>
            <View style={styles.quantityContainer}>
              <TouchableOpacity
                onPress={decreaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>-</Text>
              </TouchableOpacity>
              <Text style={styles.quantityText}>{quantity}</Text>
              <TouchableOpacity
                onPress={increaseQuantity}
                style={styles.quantityButton}
              >
                <Text style={styles.quantityButtonText}>+</Text>
              </TouchableOpacity>
            </View>
            <Text style={styles.price}>${product.price}</Text>
          </View>
          <Text style={styles.description}>{product.description}</Text>
        </View>
      </ScrollView>
      <View style={styles.footer}>
        <TouchableOpacity
          style={styles.favoritesButton}
          onPress={handleAddToFavorites}
        >
          <FontAwesome name="heart" size={45} color="green" />
        </TouchableOpacity>
        <TouchableOpacity style={styles.cartButton} onPress={handleAddToCart}>
          <FontAwesome name="shopping-cart" size={24} color="white" />
          <Text style={styles.cartButtonText}>Add to Cart</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
    justifyContent: "space-between",
  },
  scrollView: {
    paddingBottom: 70,
  },
  loadingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
  },
  headerContainer: {
    flexDirection: "row",
    alignItems: "center",
    padding: 10,
    backgroundColor: "#FFF",
    borderBottomWidth: 1,
    borderBottomColor: "#EEE",
  },
  backButton: {
    marginRight: 10,
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  titleContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  starsContainer: {
    flexDirection: "row",
    marginTop: 5,
  },
  productImage: {
    width: "100%",
    height: height * 0.4,
    borderRadius: 10,
    resizeMode: "cover",
  },
  detailsContainer: {
    marginTop: 20,
    paddingHorizontal: 20,
  },
  priceContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  price: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#4CAF50",
  },
  quantityContainer: {
    flexDirection: "row",
    alignItems: "center",
  },
  quantityButton: {
    backgroundColor: "#4CAF50",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
  },
  quantityButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  quantityText: {
    fontSize: 18,
    marginHorizontal: 10,
  },
  description: {
    fontSize: 16,
    color: "#212121",
    marginTop: 20,
  },
  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 20,
    backgroundColor: "#FFF",
    borderTopWidth: 1,
    borderTopColor: "#EEE",
  },
  favoritesButton: {
    backgroundColor: "#FFF",
  },
  cartButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 30,
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "row",
  },
  cartButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    marginLeft: 10,
  },
});

export default ProductDetailScreen;