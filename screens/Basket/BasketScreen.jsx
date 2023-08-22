import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";
import { ShoppingBagIcon } from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
  selectBasketTotalQuantity,
} from "../../features/basketSlice";

const BasketItem = ({ item }) => {
  return (
    <>
      {/* ITEM ROW */}
      <View className="my-2  ">
        <View className="bg-zinc-100 rounded-xl flex-row justify-between p-2">
          {/* LEFT SIDE */}
          <View className="flex flex-row ">
            <View className="mr-2">
              <Image
                source={{
                  uri: item.img,
                }}
                className="h-16 w-16 rounded-xl"
              />
            </View>
            <View className="justify-between flex-nowrap w-36">
              <Text className="font-semibold ">{item.name}</Text>
              <Text className="text-orange-400 font-bold">
                $ {item.sumPrice}
              </Text>
            </View>
          </View>
          {/* RIGHT SIDE */}
          <View className="bg-white rounded-lg flex-row justify-between items-center px-4 py-2">
            <Text className="text-orange-400  font-bold text-3xl">-</Text>
            <Text className="text-black  font-bold text-xl px-4">
              {item.quantity}
            </Text>
            <Text className="text-orange-400   font-bold text-3xl">+</Text>
          </View>
        </View>
      </View>
    </>
  );
};

const BasketScreen = () => {
  const navigation = useNavigation();
  const basketItems = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const totalQuantity = useSelector(selectBasketTotalQuantity);

  console.log(basketItems);

  return (
    // SAFE AREA CONTAINER
    <SafeAreaView className="bg-white flex-1 justify-between">
      {/* HEADER AND FLAT*/}
      <View className='flex-1'>
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
              <Text className=" text-white font-bold text-xs">{totalQuantity}</Text>
            </View>
          </View>
        </View>

        {/* FLAT LIST */}
        <FlatList
          data={basketItems}
          renderItem={({ item }) => <BasketItem item={item} />}
          keyExtractor={(item) => item.id.toString()}
        />
      </View>
      {/* <ScrollView className="px-4"> */}

      {/* FOOTER SUBTOTAL */}
      <View className="rounded-t-lg mt-10 mx-4" style={styles.container}>
        <View className="gap-y-5 mx-5 mb-5 mt-1">
          <View className="flex-row justify-between">
            <Text>Subtotal</Text>
            <Text className="font-bold">${total.toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Delivery</Text>
            <Text className="font-bold">$10,00</Text>
          </View>
        </View>
        <View className="border border-b-1 border-zinc-200"></View>

        <View className="flex-row justify-between m-5">
          <Text className="text-2xl font-bold">Total:</Text>
          <Text className="text-2xl font-bold">${total.toFixed(2)+10}</Text>
        </View>
        <TouchableOpacity onPress={() => navigation.navigate('SetOrderScreen')}>
          <View className="bg-orange-500 rounded-xl m-2">
            <Text className="text-white font-bold text-xl text-center py-4 px-4">
              Place your order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    borderRadius: 8,
    shadowColor: "black",
    shadowOpacity: 0.3,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 20,
    elevation: 20, // Для Android
  },
});

export default BasketScreen;
