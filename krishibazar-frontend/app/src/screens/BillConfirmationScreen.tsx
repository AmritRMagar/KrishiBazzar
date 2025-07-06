import React from "react";
import { View, Text, Image, StyleSheet, Button } from "react-native";
import { RouteProp } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
  BillConfirmationScreen: {
    companyName: string;
    logo: string | null;
    items: { name: string; price: string }[];
  };
  PaymentSuccessScreen: undefined;
};

type BillConfirmationScreenRouteProp = RouteProp<
  RootStackParamList,
  "BillConfirmationScreen"
>;
type BillConfirmationScreenNavigationProp = StackNavigationProp<
  RootStackParamList,
  "BillConfirmationScreen"
>;

type Props = {
  route: BillConfirmationScreenRouteProp;
  navigation: BillConfirmationScreenNavigationProp;
};

const BillConfirmationScreen: React.FC<Props> = ({ route, navigation }) => {
  const { companyName, logo, items } = route.params;

  const confirmPayment = () => {

    navigation.navigate("PaymentSuccessScreen");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{companyName}</Text>
      {logo && <Image source={{ uri: logo }} style={styles.logo} />}
      <View style={styles.itemsContainer}>
        {items.map((item, index) => (
          <View key={index} style={styles.itemRow}>
            <Text style={styles.itemName}>{item.name}</Text>
            <Text style={styles.itemPrice}>${item.price}</Text>
          </View>
        ))}
      </View>
      <Button title="Confirm Payment" onPress={confirmPayment} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    fontWeight: "bold",
  },
  logo: {
    width: 100,
    height: 100,
    marginVertical: 10,
  },
  itemsContainer: {
    marginVertical: 20,
    width: "100%",
  },
  itemRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginVertical: 5,
  },
  itemName: {
    fontSize: 16,
  },
  itemPrice: {
    fontSize: 16,
  },
});

export default BillConfirmationScreen;