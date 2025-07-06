// import React from "react";
// import { View, Text, StyleSheet, Image, ScrollView } from "react-native";
// import { InvoiceScreenRouteProp } from "./types"; // Adjust the import based on your file structure

// interface InvoiceScreenProps {
//   route: InvoiceScreenRouteProp;
// }

// const InvoiceScreen: React.FC<InvoiceScreenProps> = ({ route }) => {
//   const params = route.params || {}; // Default to empty object if params is undefined

//   const {
//     companyName = "",
//     companyAddress = "",
//     companyPhone = "",
//     companyEmail = "",
//     companyWebsite = "",
//     invoiceNumber = "",
//     invoiceDate = "",
//     dueDate = "",
//     billingName = "",
//     billingAddress = "",
//     billingCity = "",
//     billingState = "",
//     billingZip = "",
//     billingPhone = "",
//     billingEmail = "",
//     shippingName = "",
//     shippingAddress = "",
//     shippingCity = "",
//     shippingState = "",
//     shippingZip = "",
//     shippingPhone = "",
//     shippingEmail = "",
//     items = [],
//     subtotal = 0,
//     tax = 0,
//     shippingCharges = 0,
//     discount = 0,
//     totalAmount = 0,
//     paymentMethod = "",
//     paymentInstructions = "",
//   } = params;

//   return (
//     <ScrollView style={styles.container}>
//       <View style={styles.header}>
//         <Image
//           source={{ uri: companyWebsite }} // Replace with actual logo URI if available
//           style={styles.logo}
//         />
//         <Text style={styles.companyName}>{companyName}</Text>
//         <Text style={styles.companyAddress}>{companyAddress}</Text>
//         <Text style={styles.companyContact}>{companyPhone}</Text>
//         <Text style={styles.companyContact}>{companyEmail}</Text>
//         <Text style={styles.companyContact}>{companyWebsite}</Text>
//       </View>

//       <View style={styles.invoiceDetails}>
//         <Text style={styles.sectionTitle}>Bill To</Text>
//         <Text style={styles.billingName}>{billingName}</Text>
//         <Text>{billingAddress}</Text>
//         <Text>
//           {billingCity}, {billingState} {billingZip}
//         </Text>
//         <Text>Phone: {billingPhone}</Text>
//         <Text>Email: {billingEmail}</Text>

//         {shippingName && (
//           <>
//             <Text style={styles.sectionTitle}>Ship To</Text>
//             <Text>{shippingName}</Text>
//             <Text>{shippingAddress}</Text>
//             <Text>
//               {shippingCity}, {shippingState} {shippingZip}
//             </Text>
//             <Text>Phone: {shippingPhone}</Text>
//             <Text>Email: {shippingEmail}</Text>
//           </>
//         )}

//         <Text style={styles.sectionTitle}>Invoice Details</Text>
//         <Text>Invoice Number: {invoiceNumber}</Text>
//         <Text>Invoice Date: {invoiceDate}</Text>
//         <Text>Due Date: {dueDate}</Text>
//       </View>

//       <View style={styles.orderSummary}>
//         <Text style={styles.sectionTitle}>Order Summary</Text>
//         {items.map((item, index) => (
//           <View key={index} style={styles.itemRow}>
//             <Text style={styles.itemDescription}>{item.description}</Text>
//             <Text style={styles.itemQuantity}>{item.quantity}</Text>
//             <Text style={styles.itemUnitPrice}>
//               ${item.unitPrice.toFixed(2)}
//             </Text>
//             <Text style={styles.itemTotalPrice}>
//               ${item.totalPrice.toFixed(2)}
//             </Text>
//           </View>
//         ))}
//         <View style={styles.totalSection}>
//           <Text>Subtotal: ${subtotal.toFixed(2)}</Text>
//           <Text>Tax: ${tax.toFixed(2)}</Text>
//           <Text>Shipping Charges: ${shippingCharges.toFixed(2)}</Text>
//           <Text>Discount: ${discount.toFixed(2)}</Text>
//           <Text style={styles.totalAmount}>
//             Total Amount Due: ${totalAmount.toFixed(2)}
//           </Text>
//         </View>
//       </View>

//       <View style={styles.paymentDetails}>
//         <Text style={styles.sectionTitle}>Payment Details</Text>
//         <Text>Payment Method: {paymentMethod}</Text>
//         <Text>Payment Instructions: {paymentInstructions}</Text>
//       </View>

//       <View style={styles.terms}>
//         <Text style={styles.sectionTitle}>Terms & Conditions</Text>
//         <Text>Payment Terms: Payment due within 30 days</Text>
//         <Text>Late Fees: Late fee of 1.5% per month on overdue amounts</Text>
//         <Text>Return Policy: Returns accepted within 14 days of receipt</Text>
//         <Text>
//           Contact Information: For any queries related to this bill, please
//           contact {companyPhone} or {companyEmail}
//         </Text>
//       </View>

//       <View style={styles.thankYou}>
//         <Text>Thank you for your business!</Text>
//       </View>
//     </ScrollView>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     padding: 20,
//     backgroundColor: "#f9f9f9",
//   },
//   header: {
//     alignItems: "center",
//     marginBottom: 20,
//     backgroundColor: "#fff",
//     padding: 10,
//     borderRadius: 5,
//     elevation: 2,
//   },
//   companyName: {
//     fontSize: 24,
//     fontWeight: "bold",
//   },
//   logo: {
//     width: 100,
//     height: 100,
//     marginVertical: 10,
//   },
//   companyAddress: {
//     fontSize: 16,
//     textAlign: "center",
//   },
//   companyContact: {
//     fontSize: 14,
//     textAlign: "center",
//     color: "#555",
//   },
//   invoiceDetails: {
//     marginBottom: 20,
//   },
//   billingSection: {
//     marginBottom: 20,
//   },
//   shippingSection: {
//     marginBottom: 20,
//   },
//   orderSummary: {
//     marginBottom: 20,
//   },
//   paymentDetails: {
//     marginBottom: 20,
//   },
//   terms: {
//     marginBottom: 20,
//   },
//   thankYou: {
//     alignItems: "center",
//     marginVertical: 20,
//   },
//   sectionTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     marginBottom: 10,
//   },
//   itemRow: {
//     flexDirection: "row",
//     justifyContent: "space-between",
//     paddingVertical: 5,
//   },
//   itemDescription: {
//     flex: 3,
//     fontSize: 14,
//   },
//   itemQuantity: {
//     flex: 1,
//     textAlign: "center",
//     fontSize: 14,
//   },
//   itemUnitPrice: {
//     flex: 1,
//     textAlign: "right",
//     fontSize: 14,
//   },
//   itemTotalPrice: {
//     flex: 1,
//     textAlign: "right",
//     fontSize: 14,
//   },
//   totalSection: {
//     marginTop: 10,
//     borderTopWidth: 1,
//     borderTopColor: "#ccc",
//     paddingTop: 10,
//   },
//   totalAmount: {
//     fontWeight: "bold",
//   },
// });

// export default InvoiceScreen;