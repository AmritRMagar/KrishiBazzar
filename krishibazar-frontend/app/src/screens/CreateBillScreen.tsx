import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Image,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import * as ImagePicker from "expo-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useNavigation } from "@react-navigation/native";


type RootStackParamList = {
  CreateBillScreen: undefined;
  BillConfirmationScreen: {
    companyName: string;
    companyAddress: string;
    companyPhone: string;
    invoiceNumber: string;
    dateOfIssue: string;
    dueDate: string;
    logo: string | null;
    items: { name: string; quantity: string; price: string }[];
  };
};

type CreateBillScreenNavigationProp = NativeStackNavigationProp<
  RootStackParamList,
  "CreateBillScreen"
>;

const CreateBillScreen = () => {
  const navigation = useNavigation<CreateBillScreenNavigationProp>();
  const [companyName, setCompanyName] = useState("");
  const [companyAddress, setCompanyAddress] = useState("");
  const [companyPhone, setCompanyPhone] = useState("");
  const [invoiceNumber, setInvoiceNumber] = useState("");
  const [dateOfIssue, setDateOfIssue] = useState("");
  const [dueDate, setDueDate] = useState("");
  const [logo, setLogo] = useState<string | null>(null); // Explicitly type as string or null
  const [items, setItems] = useState([{ name: "", quantity: "", price: "" }]);

  const pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setLogo(result.assets[0].uri);
    }
  };

  const addItem = () => {
    setItems([...items, { name: "", quantity: "", price: "" }]);
  };

  const generateBill = () => {
    navigation.navigate("BillConfirmationScreen", {
      companyName,
      companyAddress,
      companyPhone,
      invoiceNumber,
      dateOfIssue,
      dueDate,
      logo,
      items,
    });
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Create Invoice</Text>
      </View>


      <View style={styles.section}>
        <Text style={styles.subtitle}>Company Information</Text>
        <TextInput
          style={styles.input}
          placeholder="Company Name"
          value={companyName}
          onChangeText={setCompanyName}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Address"
          value={companyAddress}
          onChangeText={setCompanyAddress}
        />
        <TextInput
          style={styles.input}
          placeholder="Company Phone Number"
          value={companyPhone}
          onChangeText={setCompanyPhone}
          keyboardType="phone-pad"
        />
        <TouchableOpacity style={styles.button} onPress={pickImage}>
          <Text style={styles.buttonText}>Pick Company Logo</Text>
        </TouchableOpacity>
        {logo && <Image source={{ uri: logo }} style={styles.logo} />}
      </View>

      {/* Invoice Details */}
      <View style={styles.section}>
        <Text style={styles.subtitle}>Invoice Details</Text>
        <TextInput
          style={styles.input}
          placeholder="Invoice Number"
          value={invoiceNumber}
          onChangeText={setInvoiceNumber}
        />
        <TextInput
          style={styles.input}
          placeholder="Date of Issue"
          value={dateOfIssue}
          onChangeText={setDateOfIssue}
        />
        <TextInput
          style={styles.input}
          placeholder="Due Date"
          value={dueDate}
          onChangeText={setDueDate}
        />
      </View>

      <View style={styles.section}>
        <Text style={styles.subtitle}>Product Details</Text>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <TextInput
              style={[styles.itemInput, styles.itemName]}
              placeholder="Item Name"
              value={item.name}
              onChangeText={(text) => {
                const newItems = [...items];
                newItems[index].name = text;
                setItems(newItems);
              }}
            />
            <TextInput
              style={[styles.itemInput, styles.itemQuantity]}
              placeholder="Quantity"
              value={item.quantity}
              keyboardType="numeric"
              onChangeText={(text) => {
                const newItems = [...items];
                newItems[index].quantity = text;
                setItems(newItems);
              }}
            />
            <TextInput
              style={[styles.itemInput, styles.itemPrice]}
              placeholder="Price"
              value={item.price}
              keyboardType="numeric"
              onChangeText={(text) => {
                const newItems = [...items];
                newItems[index].price = text;
                setItems(newItems);
              }}
            />
          </View>
        ))}
        <TouchableOpacity style={styles.button} onPress={addItem}>
          <Text style={styles.buttonText}>Add Another Product</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.generateButton} onPress={generateBill}>
        <Text style={styles.generateButtonText}>Generate Invoice</Text>
      </TouchableOpacity>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: "#f8f8f8",
  },
  header: {
    alignItems: "center",
    marginBottom: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  section: {
    marginBottom: 20,
  },
  subtitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 10,
    color: "#444",
  },
  input: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    marginVertical: 10,
    borderRadius: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  logo: {
    width: 120,
    height: 120,
    marginVertical: 10,
    alignSelf: "center",
  },
  button: {
    backgroundColor: "#007bff",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
  itemRow: {
    flexDirection: "row",
    marginBottom: 10,
  },
  itemInput: {
    borderWidth: 1,
    borderColor: "#ccc",
    padding: 10,
    borderRadius: 5,
    marginHorizontal: 5,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  itemName: {
    flex: 2,
  },
  itemQuantity: {
    flex: 1,
    textAlign: "center",
  },
  itemPrice: {
    flex: 1,
    textAlign: "right",
  },
  generateButton: {
    backgroundColor: "#28a745",
    padding: 15,
    borderRadius: 5,
    alignItems: "center",
    marginTop: 20,
  },
  generateButtonText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});

export default CreateBillScreen;