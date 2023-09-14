import { useState, useCallback } from "react";
import {
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  RefreshControl,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { db } from "../../firebase";
import { collection, doc, getDocs, query, where } from "firebase/firestore";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import OpenDrawer from "../../components/Buttons/OpenDrawer";
import BasketIcon from "../../components/Basket/BasketIcon";
import { FlatList } from "react-native-gesture-handler";
import { TruckIcon } from "react-native-heroicons/solid";
import { useFocusEffect } from "@react-navigation/native";

export default function TrackOrderScreen() {
  const [orders, setOrders] = useState([]);
  const [refreshing, setRefreshing] = useState(false);
  const { user } = AuthDataContext();

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

  const fetchOrders = async () => {
    try {
      const q = query(collection(db, "clients"), where("id", "==", user.id));

      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        const userDocument = querySnapshot.docs[0];
        const userDocRef = doc(db, "clients", userDocument.id);
        const userOrdersCollectionRef = collection(userDocRef, "userOrders");

        // Запрашиваем заказы с условием "statusOrder" равно "newOrder"
        const userOrdersQuerySnapshot1 = await getDocs(
          query(userOrdersCollectionRef, where("statusOrder", "==", "newOrder"))
        );

        // Запрашиваем заказы с условием "statusOrder" равно "orderCooking"
        const userOrdersQuerySnapshot2 = await getDocs(
          query(
            userOrdersCollectionRef,
            where("statusOrder", "==", "orderCooking")
          )
        );

        // Запрашиваем заказы с условием "statusOrder" равно "orderWithCourier"
        const userOrdersQuerySnapshot3 = await getDocs(
          query(
            userOrdersCollectionRef,
            where("statusOrder", "==", "orderWithCourier")
          )
        );

        const userOrdersData1 = userOrdersQuerySnapshot1.docs.map(
          (orderDocument) => {
            const orderData = orderDocument.data();
            return { ...orderData, id: orderDocument.id };
          }
        );

        const userOrdersData2 = userOrdersQuerySnapshot2.docs.map(
          (orderDocument) => {
            const orderData = orderDocument.data();
            return { ...orderData, id: orderDocument.id };
          }
        );

        const userOrdersData3 = userOrdersQuerySnapshot3.docs.map(
          (orderDocument) => {
            const orderData = orderDocument.data();
            return { ...orderData, id: orderDocument.id };
          }
        );

        // Объединяем данные из всех трех запросов
        const userOrdersData = [
          ...userOrdersData1,
          ...userOrdersData2,
          ...userOrdersData3,
        ];

        setOrders(userOrdersData);
      } else {
        console.log("User document not found");
      }
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useFocusEffect(
    useCallback(() => {
      // Функция, которая будет выполнена при фокусе на экране
      console.log("useFocusEffect");

      const onScreenFocus = async () => {
        try {
          setRefreshing(true);
          await fetchOrders();
          setRefreshing(false);
        } catch (error) {
          console.error("Error refreshing data:", error);
          setRefreshing(false);
        }
      };

      onScreenFocus(); // Вызываем функцию при фокусе на экране

      // Очистка эффекта при размонтировании компонента или снятии фокуса
      return () => {
        // Здесь можно выполнить какие-либо очисточные действия, если это необходимо
      };
    }, [])
  );

  const TrackOrderItem = ({ item }) => {
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

          {/* TIME */}
          <View style={styles.infoRow}>
            <Text className="font-bold text-lg uppercase">Delivery time:</Text>
            <Text className="">
              {item.deliveryTime
                ? item.deliveryTime + " min."
                : "approx. 1 hour"}
            </Text>
          </View>

          {/* COURIER INFO */}
          <View className="my-5">
            <TouchableOpacity
              onPress={() => alert("Information unavailable, sorry!")}
              className="bg-[#fe6c44] px-4 py-2 rounded-full flex-row justify-center items-center space-x-1 mx-auto "
            >
              <TruckIcon size={12} color={"white"} />
              <Text className="text-center font-bold uppercase text-white">
                Courier
              </Text>
            </TouchableOpacity>
          </View>
         
        </View>
      </View>
    );
  };

  return (
    <SafeAreaView className="bg-white flex-1 px-4 py-2">
      <View className="flex-row justify-between items-center mb-2">
        {/* Back Icon */}
        <OpenDrawer />
        <Text className="text-xl font-bold text-black">Track your order</Text>
        <BasketIcon />
      </View>

      <FlatList
        data={orders}
        refreshControl={
          <RefreshControl
            refreshing={refreshing}
            onRefresh={onRefresh}
            colors={["#007AFF"]} // Цвета индикатора обновления
          />
        }
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <TrackOrderItem item={item} />}
        ListEmptyComponent={
          <View className="flex-1 items-center justify-center mt-10">
            <Text className="text-center text-2xl font-bold">
              You don't have any active orders.
            </Text>
          </View>
        }
      />
    </SafeAreaView>
  );
}

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
