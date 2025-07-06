import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  ScrollView,
  useWindowDimensions,
} from "react-native";
import Footer from "@/components/Dashfooter";
import { useNavigation } from "@react-navigation/native";
import useAuthStore from "./useAuthStore";

const DashboardScreen: React.FC = () => {
  const { decodedToken } = useAuthStore();
  const userName = decodedToken?.user?.name || "Guest";
  const role = decodedToken?.user?.role || "Buyer";

  const { width } = useWindowDimensions();
  const navigation = useNavigation();

  // Sample metrics (you can replace with actual API data later)
  const totalSales = 1200;
  const activeListings = 15;
  const pendingOrders = 8;
  const newNotifications = 5;
  const earnings = 820;

  const getGreetingMessage = () => {
    const hour = new Date().getHours();
    if (hour < 12) return "Good morning";
    if (hour < 17) return "Good afternoon";
    return "Good evening";
  };

  return (
    <View style={styles.mainContainer}>
      <View style={styles.header}>
        <Text style={styles.helloText}>Hi, {userName}</Text>
        <Text style={styles.greetingText}>{getGreetingMessage()}</Text>
      </View>

      <ScrollView style={styles.scrollContent}>
        <View style={styles.keyMetricsContainer}>
          <View style={styles.metricRow}>
            <MetricCard title="Total Sales" value={`$${totalSales}`} />
            {role !== "Buyer" && (
              <>
                <MetricCard title="Active Listings" value={`${activeListings}`} />
                <MetricCard title="Pending Orders" value={`${pendingOrders}`} />
                <MetricCard title="Earnings" value={`$${earnings}`} />
              </>
            )}
            <MetricCard title="New Notifications" value={`${newNotifications}`} />
            <MetricCard title="Sales Trends" value="View Chart" />
          </View>
        </View>
      </ScrollView>

      <View style={styles.footerContainer}>
        <Footer />
      </View>
    </View>
  );
};

const MetricCard = ({ title, value }: { title: string; value: string }) => (
  <View style={styles.metricCard}>
    <Image
      source={require("@/assets/dairy.jpg")}
      style={styles.metricIcon}
    />
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
  </View>
);

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  header: {
    backgroundColor: "#4CAF50",
    padding: 20,
    alignItems: "center",
  },
  helloText: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#fff",
  },
  greetingText: {
    fontSize: 16,
    color: "#E0E0E0",
  },
  scrollContent: {
    flex: 1,
  },
  keyMetricsContainer: {
    padding: 10,
  },
  metricRow: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-between",
  },
  metricCard: {
    backgroundColor: "#FFFFFF",
    borderRadius: 10,
    padding: 15,
    marginBottom: 10,
    width: "48%",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 3,
  },
  metricIcon: {
    width: 50,
    height: 50,
    marginBottom: 10,
  },
  metricTitle: {
    fontSize: 16,
    fontWeight: "bold",
  },
  metricValue: {
    fontSize: 18,
    color: "#4CAF50",
  },
  footerContainer: {
    position: "absolute",
    bottom: 0,
    left: 0,
    right: 0,
    height: 60,
    backgroundColor: "#4CAF50",
  },
});

export default DashboardScreen;
