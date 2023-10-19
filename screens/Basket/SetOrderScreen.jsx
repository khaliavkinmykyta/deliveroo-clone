import { View, Text, ScrollView, Keyboard } from "react-native";
import React, { useEffect, useState } from "react";
import {
  TouchableOpacity,
  TouchableWithoutFeedback,
} from "react-native-gesture-handler";

import {
  InformationCircleIcon,
  PaperClipIcon,
  PencilIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  clearBasket,
  selectBasketItems,
  selectBasketTotal,
  selectBasketTotalQuantity,
} from "../../features/basketSlice";
import { TextInput } from "react-native";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { MapPinIcon } from "react-native-heroicons/solid";
import { db } from "../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import BackButton from "../../components/BackButton";
import { SafeAreaView } from "react-native-safe-area-context";
import BasketIcon from "../../components/Basket/BasketIcon";

const SetOrderScreen = () => {
  const navigation = useNavigation();
  const basketItems = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const [noticeOrder, setNoticeOrder] = useState("");
  const { user } = AuthDataContext();
  const dispatch = useDispatch();
  const [infoOrderSet, setInfoOrderSet] = useState(false);

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
          orderTime: new Date(),
          statusOrder: "newOrder",
        };

        // Добавление документа в подколлекцию userOrders
        const userOrdersCollectionRef = collection(userDocRef, "userOrders");
        await addDoc(userOrdersCollectionRef, orderData);
        console.log("Order added to userOrders subcollection");
        navigation.navigate("SuccessOrderScreen");
        dispatch(clearBasket());
      });

      console.log("Orders sent to subcollection");
    } catch (error) {
      console.log("Error fetching user data:", error);
    }
  };

  useEffect(() => {
    console.log("set order screen");
    if (user.displayName && user.geoAddress && user.geoAddress.length !== 0)
      setInfoOrderSet(true);
    else setInfoOrderSet(false);
  }, [user]);

  return (
    // SAFE AREA CONTAINER

    <SafeAreaView className="bg-white flex-1 px-4 py-2">
      {/* HEADER AND FLAT*/}

      <View className="">
        {/* HEADER */}
        <View className="flex-row justify-between items-center">
          {/* GO BACK */}
          <BackButton />

          {/* BASKET */}
          <Text className="text-xl font-bold text-black">Basket</Text>

          {/* SHOPPING CART */}
          <BasketIcon />
        </View>
      </View>
      {/* INFO ORDER BLOCK */}
      <ScrollView className="py-5 my-1">
        <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
          <View className="space-y-3 mb-10 px-2">
            {/* Your name */}
            <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
              <Text className="font-bold">Your name</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                <View className="flex-row mt-2 items-center">
                  <InformationCircleIcon
                    name="user"
                    size={28}
                    color="#fe6c44"
                  />
                  <View className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2">
                    <Text>
                      {user.displayName ? user.displayName : "Set your name"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Your phone */}
            <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
              <Text className="font-bold">Your phone</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Setting")}>
                <View className="flex-row mt-2 items-center">
                  <InformationCircleIcon
                    name="user"
                    size={28}
                    color="#fe6c44"
                  />

                  <View className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2">
                    <Text>{user.mobile ? user.mobile : "Set your mobile"}</Text>
                  </View>
                </View>
              </TouchableOpacity>
            </View>

            {/* Your address */}
            <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
              <Text className="font-bold">Your address</Text>
              <TouchableOpacity onPress={() => navigation.navigate("Location")}>
                <View className="flex-row items-center space-x-1 py-2">
                  <MapPinIcon color="#fe6c44" size={20} />
                  <View className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2">
                    <Text className="flex-1">
                      {user && user.geoAddress && user.geoAddress.length !== 0
                        ? user.geoAddress[user.geoAddress.length - 1].address 
                        : "Set location"}
                    </Text>
                  </View>
                </View>
              </TouchableOpacity>

              {/* NOTICE ADDRESS */}
              <View className="mt-2">
                <Text className="font-bold">Additional information</Text>
                <View className="flex-row items-center mt-2">
                  <PaperClipIcon name="user" size={20} color="#fe6c44" />

                  <Text className="p-2">
                    {user &&
                    user.geoAddress.length !== 0 &&
                    user.geoAddress[user.geoAddress.length - 1].floor.trim() !==
                      ""
                      ? "Floor: " +
                        user.geoAddress[user.geoAddress.length - 1].floor +
                        "."
                      : ""}

                    {user &&
                    user.geoAddress.length !== 0 &&
                    user.geoAddress[
                      user.geoAddress.length - 1
                    ].apartment.trim() !== ""
                      ? "\nApartment: " +
                        user.geoAddress[user.geoAddress.length - 1].apartment +
                        ". "
                      : ""}

                    {user &&
                    user.geoAddress.length !== 0 &&
                    user.geoAddress[
                      user.geoAddress.length - 1
                    ].addInfo.trim() !== ""
                      ? "\nInfo: " +
                        user.geoAddress[user.geoAddress.length - 1].addInfo +
                        ". "
                      : ""}
                    {user &&
                    user.geoAddress.length !== 0 &&
                    user.geoAddress[user.geoAddress.length - 1].addInfo &&
                    user.geoAddress[user.geoAddress.length - 1].apartment &&
                    user.geoAddress[user.geoAddress.length - 1].floor
                      ? ""
                      : "-"}
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
                  £ {parseFloat(total).toFixed(2)}
                </Text>
              </View>
            </View>
          </View>
        </TouchableWithoutFeedback>
      </ScrollView>

      {infoOrderSet ? (
        <TouchableOpacity
          onPress={sendOrder}
          className={`bg-[#fe6c44] text-white rounded-xl items-center justify-center m-2`}
        >
          <Text className="text-white font-bold text-xl text-center py-4 px-4">
            Place your order
          </Text>
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          onPress={() => navigation.navigate("Setting")}
          className={`bg-[#fe6c44] text-white rounded-xl items-center justify-center m-2`}
        >
          <Text className="text-white font-bold text-xl text-center py-4 px-4">
            Finish your setting
          </Text>
        </TouchableOpacity>
      )}

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SetOrderScreen;
