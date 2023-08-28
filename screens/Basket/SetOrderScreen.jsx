import { View, Text, SafeAreaView, FlatList, ScrollView } from "react-native";
import React, { useState } from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  PaperClipIcon,
  PencilIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
  selectBasketTotalQuantity,
} from "../../features/basketSlice";
import { TextInput } from "react-native";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { MapPinIcon } from "react-native-heroicons/solid";
import { db } from "../../firebase";
import { addDoc, collection, doc, getDoc, getDocs, query, where } from "firebase/firestore";

const SetOrderScreen = () => {
  const navigation = useNavigation();
  const basketItems = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const totalQuantity = useSelector(selectBasketTotalQuantity);
  const [noticeOrder, setNoticeOrder] = useState("")
  const { user } = AuthDataContext();

  const sendOrder = async () => {
    // console.log(basketItems);
    try {
      const q = query(collection(db, "clients"), where("id", "==", user.id));
      const querySnapshot = await getDocs(q);
  
      querySnapshot.forEach(async (userDocument) => {
        const userDataFromFirestore = userDocument.data();
        console.log(userDataFromFirestore);
  
        // Получение ссылки на документ
        const userDocRef = doc(db, "clients", userDocument.id);
  
        // Подготовка данных для документа в подколлекции
        const orderData = {
          displayName: user.displayName,
          mobile: user.mobile,
          geoAddress: user.geoAddress[user.geoAddress.length - 1],
          noticeOrder: noticeOrder,
          total: total,
          basketItems: basketItems,
        };
  
        // Добавление документа в подколлекцию userOrders
        const userOrdersCollectionRef = collection(userDocRef, "userOrders");
        await addDoc(userOrdersCollectionRef, orderData);
        console.log("Order added to userOrders subcollection");
        navigation.navigate("SuccessOrderScreen")
      });
  
      console.log("Orders sent to subcollection");
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };
  
  
  
  
  
  
    
  return (
    // SAFE AREA CONTAINER
    <SafeAreaView className="bg-white flex-1">
      {/* HEADER AND FLAT*/}
      <View className="">
        {/* HEADER */}
        <View className="flex-row justify-between items-center px-2">
          {/* GO BACK */}
          <TouchableOpacity
            onPress={navigation.goBack}
            className=" border-[#cecfd2] p-1"
            style={{
              borderColor: "#cecfd2",
              borderWidth: 1,
              borderRadius: "10%",
            }}
          >
            <ChevronLeftIcon color="#cecfd2" />
          </TouchableOpacity>

          {/* BASKET */}
          <Text className="text-xl font-bold text-black">Basket</Text>

          {/* SHOPPING CART */}
          <View className="bg-[#ffebe5] rounded-md p-2">
            <ShoppingBagIcon color={"black"} className="z-50" />
            <View className="absolute top-1 right-1 rounded-md bg-[#000000] px-1 ">
              <Text className=" text-white font-bold text-xs">
                {totalQuantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* INFO ORDER BLOCK */}
      <ScrollView className="mt-2">
        <View className="mx-4 gap-y-3">
          {/* Your name */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your name</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <View className="flex-row mt-2 items-center">
                <InformationCircleIcon name="user" size={28} color="#fe6c44" />
                <View className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2">
                  <Text>{user.displayName}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Your phone */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your phone</Text>
            <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
              <View className="flex-row mt-2 items-center">
                <InformationCircleIcon name="user" size={28} color="#fe6c44" />

                <View className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2">
                  <Text>{user.mobile}</Text>
                </View>
              </View>
            </TouchableOpacity>
          </View>

          {/* Your address */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your address</Text>
            <View className="flex-row items-center mt-2">
              <TouchableOpacity onPress={() => navigation.navigate("Location")}>
                <View className="flex-row items-center space-x-1 py-2">
                  <MapPinIcon color="#fe6c44" size={20} />
                  <Text className="">
                    {user && user.geoAddress
                      ? user.geoAddress[user.geoAddress.length - 1].address
                      : "Set location"}
                  </Text>
                </View>
              </TouchableOpacity>
            </View>

            {/* NOTICE ADDRESS */}
            <View className="mt-2">
              <Text className="font-bold">Additional information</Text>
              <View className="flex-row items-center mt-2">
                <PaperClipIcon name="user" size={20} color="#fe6c44" />

                <Text className="p-2">
                  {user &&
                  user.geoAddress &&
                  user.geoAddress[user.geoAddress.length - 1].floor.trim() !==
                    ""
                    ? "Floor: " +
                      user.geoAddress[user.geoAddress.length - 1].floor +
                      "."
                    : ""}

                  {user &&
                  user.geoAddress &&
                  user.geoAddress[
                    user.geoAddress.length - 1
                  ].apartment.trim() !== ""
                    ? "\nApartment: " +
                      user.geoAddress[user.geoAddress.length - 1].apartment +
                      ". "
                    : ""}

                  {user &&
                  user.geoAddress &&
                  user.geoAddress[user.geoAddress.length - 1].addInfo.trim() !==
                    ""
                    ? "\nInfo: " +
                      user.geoAddress[user.geoAddress.length - 1].addInfo +
                      ". "
                    : ""}
                  {user && user.geoAddress ? "" : "-"}
                </Text>
              </View>
            </View>

            {/* CHANGE ADDRESS */}
            <TouchableOpacity
              className="bg-[#fe6c44] rounded-xl p-2 my-4 justify-center items-center"
              onPress={() => navigation.navigate("Location")}
            >
              <View>
                <Text className="text-white font-semibold ">
                  Change my location
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Your notice about of order */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your notice about of order</Text>
            <View className="flex-row mt-2 items-center">
              <PencilIcon name="user" size={20} color="#fe6c44" />

              <TextInput
               value={noticeOrder}
               onChangeText={(text) => setNoticeOrder(text)}
                className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2"
                placeholder="Type here..."
              ></TextInput>
            </View>
          </View>

          {/* Your promocode */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your promocode</Text>
            <View className="flex-row mt-2 items-center">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />
              <Text className="ml-2">Select coupons</Text>
            </View>
          </View>

          {/* Your total */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your total</Text>
            <View className="flex-row mt-2 items-center">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />

              <Text className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2 ">
                £ {total}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={sendOrder}>
        <View className="bg-[#fe6c44] rounded-xl m-2">
          <Text className="text-white font-bold text-xl text-center py-4 px-4">
            Place your order
          </Text>
        </View>
      </TouchableOpacity>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SetOrderScreen;
