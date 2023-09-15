import {
  View,
  Text,
  FlatList,
  Image,
  RefreshControl,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import React, { useCallback, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  orderBy,
  limit,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import BasketIcon from "../../components/Basket/BasketIcon";
import OpenDrawer from "../../components/Buttons/OpenDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import { useFocusEffect } from "@react-navigation/native";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(false);

  const ordersPerPage = 5;

  const { user } = AuthDataContext();

  useFocusEffect(
    useCallback(() => {
      console.log("useFocusEffect");

      const onScreenFocus = async () => {
        setLoading(true);
        try {
          setRefreshing(true);
          await fetchOrders();
          setRefreshing(false);
        } catch (error) {
          console.error("Error refreshing data:", error);
          setRefreshing(false);
        }
        setLoading(false);
      };

      onScreenFocus();

      return () => {
        // reset
      };
    }, [])
  );

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "clients"), where("id", "==", user.id));
      const querySnapshot = await getDocs(q);

      const userDocument = querySnapshot.docs[0];
      const userDocRef = doc(db, "clients", userDocument.id);

      const userOrdersCollectionRef = collection(userDocRef, "userOrders");

      const queryTime = query(
        userOrdersCollectionRef,
        orderBy("orderTime", "desc"),
        limit(ordersPerPage * currentPage)
      );

      const userOrdersQuerySnapshot = await getDocs(queryTime);

      const userOrdersData = [];
      userOrdersQuerySnapshot.forEach((orderDocument) => {
        const orderData = orderDocument.data();
        const orderId = orderDocument.id;
        userOrdersData.push({ ...orderData, id: orderId });
      });

      setOrders(userOrdersData);
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  const onRefresh = async () => {
    try {
      setRefreshing(true);

      await fetchOrders();

      setRefreshing(false);
    } catch (error) {
      console.error("Error refreshing data:", error);
      setRefreshing(false);
    }
  };

  const OrderItem = ({ item }) => {
    return (
      <View className="my-3 px-2">
        <View style={styles.container} className="bg-zinc-100">
          {/* DATE */}
          <View style={styles.infoRow}>
            <Text className="font-bold">Date:</Text>
            <Text className="flex-1">
              {new Date(item.orderTime.seconds * 1000).toLocaleString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
                hour: "numeric",
                minute: "numeric",
                second: "numeric",
              })}
            </Text>
          </View>

          {/* ADDRESS */}
          <View style={styles.infoRow}>
            <Text className="font-bold">Address:</Text>
            <Text className="flex-1">{item.geoAddress.address}</Text>
          </View>

          {/* MOBILE */}
          <View style={styles.infoRow}>
            <Text className="font-bold">Mobile:</Text>
            <Text className="flex-1">{item.mobile}</Text>
          </View>

          {/* ORDER INFO */}
          <View style={styles.infoRow}>
            <Text className="font-bold">Your order:</Text>
          </View>
          {item.basketItems.map((item, index) => (
            <View key={index} className="flex-row gap-3 p-1">
              <View>
                <Image
                  source={{
                    uri: item.img,
                  }}
                  className="w-10 h-10 rounded-full"
                />
              </View>
              <View className="flex-1">
                <View>
                  <Text>
                    Name: {item.name} x {item.quantity}
                  </Text>
                </View>
                <Text>
                  Price: £{item.sumPrice} (£{item.price})
                </Text>
              </View>
            </View>
          ))}

          {/* NOTICE ABOUT  ORDER*/}
          <View style={styles.infoRow}>
            <Text className="font-bold">Notice about order:</Text>
            <Text className="flex-1">
              {item.noticeOrder ? item.noticeOrder : "-"}
            </Text>
          </View>

          {/* TOTAL */}
          <View style={styles.infoRow}>
            <Text className="font-bold">Total:</Text>
            <Text className="flex-1">£{parseFloat(item.total).toFixed(2)}</Text>
          </View>

          {/* STATUS */}
          <View style={styles.infoRow}>
            <Text className="font-bold text-lg uppercase">Status:</Text>
            <Text className="flex-1">
              {(() => {
                switch (item.statusOrder) {
                  case "newOrder":
                    return "Order in process with the restaurant";
                  case "orderCooking":
                    return "The order is already being prepared";
                  case "orderWithCourier":
                    return "A courier is already delivering your order";
                  case "orderDelivered":
                    return "Order delivered";
                  case "orderCanceled":
                    return "Order canceled";
                  default:
                    return "Something's gone wrong";
                }
              })()}
            </Text>
          </View>
        </View>
      </View>
    );
  };

  const loadMoreOrders = () => {
    setCurrentPage(currentPage + 1);
    fetchOrders();
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-4 py-2">
      <View className="bg-white flex-row justify-between items-center px-2 mb-2">
        {/* Back Icon */}
        <OpenDrawer />
        <Text className="text-xl font-bold text-black">Your orders</Text>
        <BasketIcon />
      </View>
      {loading ? (
        <ActivityIndicator color="black" size="large" />
      ) : (
        <FlatList
          data={orders}
          refreshControl={
            <RefreshControl
              refreshing={refreshing}
              onRefresh={onRefresh}
              colors={["#007AFF"]}
            />
          }
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <OrderItem item={item} />}
          onEndReached={loadMoreOrders}
          onEndReachedThreshold={0.1}
          ListEmptyComponent={
            <View className="flex-1 items-center justify-center mt-10">
              <Text className="text-center text-2xl font-bold">
                You don't have any active orders.
              </Text>
            </View>
          }
        />
      )}
    </SafeAreaView>
  );
};

export default OrdersScreen;

const styles = StyleSheet.create({
  container: {
    gap: 3,
    padding: 6,
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.5,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 3,
    elevation: 3,
  },
  infoRow: {
    flexDirection: "row",
    alignItems: "center",
    gap: 5,
  },
});
