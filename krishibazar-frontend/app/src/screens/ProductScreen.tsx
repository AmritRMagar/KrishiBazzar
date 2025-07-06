import { BASE_API_URL } from "@/constants/apiConfig"; 
import { Ionicons } from "@expo/vector-icons";
import axios from "axios";
import * as ImagePicker from "expo-image-picker";
import React, { useEffect, useState } from "react";
import {
  Alert,
  FlatList,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Dimensions,
} from "react-native";
import Footer from "@/components/Dashfooter";

type Product = {
  id: number;
  title: string;
  description: string;
  price: number;
  stock: number;
  unit: string;
  image: string;
};

const ProductScreen: React.FC<{ navigation: any; route: any }> = ({
  navigation,
  route,
}) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [price, setPrice] = useState("");
  const [stock, setStock] = useState("");
  const [unit, setUnit] = useState("kg");

  const [products, setProducts] = useState<Product[]>([]);
  const [imageUri, setImageUri] = useState<any>("");

  useEffect(() => {
    if (route.params?.product) {
      const product = route.params.product as Product;
      setTitle(product.title);
      setDescription(product.description);
      setPrice(product.price.toString());
      setStock(product.stock.toString());
      setUnit(product.unit);
      setImageUri(product.image);
    }
  }, [route.params?.product]);

  const handleImagePick = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
      base64: true,
    });

    console.log(result);

    if (!result.canceled) {
      setImageUri(result.assets[0].uri);
    }
  };

  const handleAddProduct = async () => {
    if (!title || !description || !price || !stock || !imageUri) {
      Alert.alert("Error", "Please fill in all fields and select an image.");
      return;
    }

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("price", price);
    formData.append("stock", stock);
    formData.append("unit", unit);

    const base64Data = imageUri.split(",")[1];
    formData.append("image", base64Data);

    try {
      const response = await axios.post(
        `${BASE_API_URL}/products/add`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );

      if (response.status === 201) {
        const addedProduct = response.data.product;

        // Show success alert
        Alert.alert("Success", `Product '${addedProduct.title}' added successfully!`);

        setProducts([...products, addedProduct]);

        // Clear fields after adding
        setTitle("");
        setDescription("");
        setPrice("");
        setStock("");
        setImageUri("");
      } else {
        navigation.navigate("NotificationsScreen", {
          message: response.data.message || "Something went wrong.",
          type: "error",
        });
      }
    } catch (error: any) {
      console.error("Error details:", error.response?.data || error.message);
      navigation.navigate("NotificationsScreen", {
        message: "An error occurred. Please try again.",
        type: "error",
      });
    }
  };

  const renderProductItem = ({ item }: { item: Product }) => (
    <View style={styles.productItem}>
      <Image source={{ uri: item.image }} style={styles.productImage} />
      <View style={styles.productDetails}>
        <Text style={styles.productTitle}>{item.title}</Text>
        <Text>{item.description}</Text>
        <Text>{`Price: $${item.price}`}</Text>
        <Text>{`Stock: ${item.stock} ${item.unit}`}</Text>
      </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView style={styles.content}>
        <Text style={styles.header}>Add Product</Text>

        <TouchableOpacity onPress={handleImagePick} style={styles.imageContainer}>
          {imageUri ? (
            <Image source={{ uri: imageUri }} style={styles.productImage} />
          ) : (
            <View style={styles.placeholder}>
              <Ionicons name="camera" size={50} color="#B0BEC5" />
              <Text style={styles.placeholderText}>Pick an Image</Text>
            </View>
          )}
        </TouchableOpacity>

        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Title"
            value={title}
            onChangeText={setTitle}
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Description"
            value={description}
            onChangeText={setDescription}
            multiline
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Price"
            value={price}
            onChangeText={setPrice}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Stock Quantity"
            value={stock}
            onChangeText={setStock}
            keyboardType="numeric"
          />
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Unit (e.g., kg, gram, litre)"
            value={unit}
            onChangeText={setUnit}
          />
        </View>
        <TouchableOpacity style={styles.addButton} onPress={handleAddProduct}>
          <Text style={styles.addButtonText}>Add Product</Text>
        </TouchableOpacity>
      </ScrollView>

      {/* Fixed footer */}
      <Footer />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  content: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 10,
  },
  imageContainer: {
    alignItems: "center",
    marginBottom: 20,
  },
  placeholder: {
    alignItems: "center",
    justifyContent: "center",
    backgroundColor: "#E0E0E0",
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  placeholderText: {
    marginTop: 10,
    color: "#B0BEC5",
  },
  productImage: {
    width: 200,
    height: 200,
    borderRadius: 10,
  },
  inputContainer: {
    marginBottom: 15,
  },
  input: {
    backgroundColor: "#FFFFFF",
    borderColor: "#DDDDDD",
    borderWidth: 1,
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
  },
  addButton: {
    backgroundColor: "#4CAF50",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginVertical: 20,
  },
  addButtonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#F5F5F5",
  },
});

export default ProductScreen;