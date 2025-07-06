// import { StackNavigationProp } from "@react-navigation/stack";
// import React, { useState, useCallback } from "react";
// import { View, StyleSheet, Text, TouchableOpacity } from "react-native";
// import {
//   GiftedChat,
//   Bubble,
//   InputToolbar,
//   IMessage,
//   Send,
// } from "react-native-gifted-chat";
// import { RootStackParamList } from "../Utils/types";
// import { useNavigation } from "@react-navigation/native";
// import useAuthStore from "./useAuthStore";
// import { Ionicons } from "@expo/vector-icons";

// type ChatScreenNavigationProp = StackNavigationProp<
//   RootStackParamList,
//   "ChatScreen"
// >;

// const ChatScreen: React.FC = () => {
//   const navigation = useNavigation<ChatScreenNavigationProp>();
//   const [messages, setMessages] = useState<IMessage[]>([]);
//   const { decodedToken } = useAuthStore(state => state);
//   const userRole = decodedToken?.role;

//   React.useEffect(() => {
//     setMessages([
//       {
//         _id: 1,
//         text: "Hello! How can I help you today?",
//         createdAt: new Date(),
//         user: {
//           _id: 2,
//           name: "KrishiBazar Support",
//           avatar: "https://placeimg.com/140/140/any",
//         },
//       },
//     ]);
//   }, []);

//   const onSend = useCallback((messages: IMessage[] = []) => {
//     setMessages((previousMessages) =>
//       GiftedChat.append(previousMessages, messages)
//     );
//   }, []);

//   const formatTime = (date: Date | number) => {
//     return new Date(date).toLocaleTimeString();
//   };

//   const handleBack = () => {
//     if (userRole === "SELLER") {
//       navigation.navigate("DashboardScreen");
//     } else if (userRole === "BUYER") {
//       navigation.navigate("HomeScreen"); 
//     }
//   };

//   return (
//     <View style={styles.container}>
//       <View style={styles.header}>
//         <TouchableOpacity onPress={handleBack} style={styles.backButton}>
//           <Ionicons name="arrow-back" size={24} color="#fff" />
//         </TouchableOpacity>
//         <Text style={styles.headerTitle}>Chat</Text>
//       </View>
//       <GiftedChat
//         messages={messages}
//         onSend={(messages) => onSend(messages)}
//         user={{
//           _id: 1,
//           name: "User",
//           avatar: "https://placeimg.com/140/140/any",
//         }}
//         renderBubble={(props) => {
//           return (
//             <Bubble
//               {...props}
//               wrapperStyle={{
//                 right: {
//                   backgroundColor: "#4caf50",
//                 },
//                 left: {
//                   backgroundColor: "#e0e0e0",
//                 },
//               }}
//               textStyle={{
//                 right: {
//                   color: "#fff",
//                 },
//                 left: {
//                   color: "#000",
//                 },
//               }}
//               renderTime={() => {
//                 if (props.currentMessage?.createdAt) {
//                   return (
//                     <Text style={styles.time}>
//                       {formatTime(props.currentMessage.createdAt)}
//                     </Text>
//                   );
//                 }
//                 return null;
//               }}
//             />
//           );
//         }}
//         renderInputToolbar={(props) => (
//           <InputToolbar
//             {...props}
//             containerStyle={styles.inputToolbar}
//             renderSend={(props) => (
//               <Send {...props}>
//                 <View style={styles.sendButton}>
//                   <Text style={styles.sendText}>Send</Text>
//                 </View>
//               </Send>
//             )}
//           />
//         )}
//         renderChatFooter={() => (
//           <Text style={styles.footerText}>Powered by KrishiBazar</Text>
//         )}
//         scrollToBottom
//       />
//     </View>
//   );
// };

// const styles = StyleSheet.create({
//   container: {
//     flex: 1,
//     backgroundColor: "#f5f5f5",
//   },
//   header: {
//     backgroundColor: "#4caf50",
//     padding: 10,
//     flexDirection: "row",
//     alignItems: "center",
//     justifyContent: "space-between",
//   },
//   backButton: {
//     padding: 10,
//   },
//   headerTitle: {
//     fontSize: 18,
//     fontWeight: "bold",
//     color: "#fff",
//     textAlign: "center",
//     flex: 1,
//   },
//   inputToolbar: {
//     borderTopWidth: 1,
//     borderTopColor: "#E8E8E8",
//     backgroundColor: "#FFFFFF",
//     padding: 8,
//     paddingBottom: 8,
//   },
//   sendButton: {
//     backgroundColor: "#4caf50",
//     borderRadius: 20,
//     padding: 8,
//     marginHorizontal: 5,
//   },
//   sendText: {
//     color: "#fff",
//     fontWeight: "bold",
//   },
//   footerText: {
//     textAlign: "center",
//     color: "#aaa",
//     marginVertical: 20,
//     fontSize: 12,
//   },
//   time: {
//     fontSize: 10,
//     color: "#888",
//     marginLeft: 5,
//   },
// });

// export default ChatScreen;