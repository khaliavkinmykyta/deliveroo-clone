import { View, Text, FlatList, SafeAreaView } from "react-native";
import React, { useEffect, useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  getDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";

const OrdersScreen = () => {
  const [orders, setOrders] = useState([]);
  const { user } = AuthDataContext();

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const q = query(collection(db, "clients"), where("id", "==", user.id));
        const querySnapshot = await getDocs(q);

        const userDocument = querySnapshot.docs[0];
        const userDocRef = doc(db, "clients", userDocument.id);

        const userOrdersCollectionRef = collection(userDocRef, "userOrders");
        const userOrdersQuerySnapshot = await getDocs(userOrdersCollectionRef);

        const userOrdersData = [];
        userOrdersQuerySnapshot.forEach((orderDocument) => {
          const orderData = orderDocument.data();
          const orderId = orderDocument.id; // Получение имени документа в качестве идентификатора
          userOrdersData.push({ ...orderData, id: orderId });
        });

        setOrders(userOrdersData);
      } catch (error) {
        console.log("Error fetching user data:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      <View className="bg-white flex-row justify-between items-center px-2 mb-2">
        {/* Back Icon */}
        <BackButton />
        <Text className="text-xl font-bold text-black">Your orders</Text>
        <BasketIcon />
      </View>
      <FlatList
        data={orders}
        keyExtractor={(item) => item.id} // Предположим, что в каждом объекте есть поле id
        renderItem={({ item }) => (
          <View className="m-4 rounded-lg p-2 bg-[#fe6c44] shadow-sm shadow-slate-900 gap-y-1">
            <View className="flex-row gap-1">
              <Text className="font-bold">Id order's:</Text>
              <Text>{item.id}</Text>
            </View>
            <View className="flex-row gap-1 items-center">
              <Text  className="font-bold">Your address:</Text>
              <Text className="flex-1">{item.geoAddress.address}</Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="font-bold">Mobile:</Text>
              <Text>{item.mobile}</Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="font-bold">Your order:</Text>
            </View>
            {item.basketItems.map((item, index) => (
              <View key={index} className="ml-2 mb-2">
                <Text>Name: {item.name}</Text>
                <Text>Price: {item.price}</Text>
                <Text>Quantity: {item.quantity}</Text>
                <Text>Price: {item.sumPrice}</Text>
                {/* Вывод других свойств, если необходимо */}
              </View>
            ))}
              <View className="flex-row gap-1">
              <Text className="font-bold">Notice about order:</Text>
              <Text>{item.noticeOrder}</Text>
            </View>
            <View className="flex-row gap-1">
              <Text className="font-bold">Total:</Text>
              <Text>{item.total}</Text>
            </View>

           

          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default OrdersScreen;
