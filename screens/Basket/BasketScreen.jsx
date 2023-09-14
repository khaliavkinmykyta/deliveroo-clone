import {
  View,
  Text,
  Image,
  TouchableOpacity,
  StyleSheet,
  FlatList,
} from "react-native";
import React from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { useNavigation } from "@react-navigation/native";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketTotal,
  selectBasketTotalQuantity,
} from "../../features/basketSlice";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import { v4 as uuidv4 } from "uuid";

const BasketItem = ({ item }) => {
  const dispatch = useDispatch();

  const addItemToBasket = () => {
    dispatch(addToBasket(item));
    console.log(item);
  };

  const removeItemFromBasket = () => {
    console.log(item.id);
    dispatch(removeFromBasket(item));
  };

  return (
    <View className="">
      {/* ITEM ROW */}
      <View className="my-2">
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
                £ {item.sumPrice.toFixed(2)}
              </Text>
            </View>
          </View>
          {/* RIGHT SIDE */}
          <View className="bg-white rounded-lg flex-row justify-between items-center px-4 py-2">
            <TouchableOpacity onPress={removeItemFromBasket}>
              <Text className="text-orange-400  font-bold text-3xl">-</Text>
            </TouchableOpacity>

            <Text className="text-black  font-bold text-xl px-4">
              {item.quantity}
            </Text>
            <TouchableOpacity onPress={addItemToBasket}>
              <Text className="text-orange-400   font-bold text-3xl">+</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
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
    <SafeAreaView className="bg-white flex-1 justify-between px-4 py-2">
      {/* HEADER AND FLAT*/}
      <View className="flex-1">
        {/* HEADER */}
        <View className="flex-row justify-between items-center">
          {/* GO BACK */}
          <BackButton />

          {/* BASKET */}
          <Text className="text-xl font-bold text-black">Basket</Text>

          {/* SHOPPING CART */}
          <BasketIcon />
        </View>
        {basketItems.length > 0 ? (
          <></>
        ) : (
          <View className="items-center justify-center flex-1">
            <Text className="text-3xl text-center">Your basket is empty</Text>
          </View>
        )}

        {/* FLAT LIST */}
        <FlatList
          data={basketItems}
          renderItem={({ item }) => <BasketItem item={item} />}
          keyExtractor={() => uuidv4()}
        />
      </View>

      {/* FOOTER SUBTOTAL */}
      <View className="rounded-t-lg mt-10" style={styles.container}>
        <View className="gap-y-5 mx-5 mb-5 mt-1">
          <View className="flex-row justify-between">
            <Text>Subtotal</Text>
            <Text className="font-bold">£{parseFloat(total).toFixed(2)}</Text>
          </View>
          <View className="flex-row justify-between">
            <Text>Delivery</Text>
            <Text className="font-bold">£10,00</Text>
          </View>
        </View>
        <View className="border border-b-1 border-zinc-200"></View>

        <View className="flex-row justify-between m-5">
          <Text className="text-2xl font-bold">Total:</Text>
          <Text className="text-2xl font-bold">
            £{(parseFloat(total) + 10).toFixed(2)}
          </Text>
        </View>
        <TouchableOpacity
          className={`bg-[#fe6c44] text-white rounded-xl items-center justify-center m-2 ${
            basketItems.length < 1 ? "opacity-70" : ""
          }`}
          disabled={basketItems.length < 1}
          onPress={() => navigation.navigate("SetOrderScreen")}
        >
          <View className="">
            <Text className="text-white font-bold text-xl text-center py-4 px-4">
              Place your order
            </Text>
          </View>
        </TouchableOpacity>
      </View>
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
    elevation: 20,
  },
});

export default BasketScreen;
