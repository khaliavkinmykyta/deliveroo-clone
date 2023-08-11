import { View, Text, Image, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ShoppingBagIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBasket,
  removeFromBasket,
  selectBasketItems,
  selectBasketItemsWithId,
} from "../../features/basketSlice";

const FoodScreen = () => {
  //import root props
  const {
    // params: { id, imgUrl, nameFood, descFood, price },
        params: { item, id },

  } = useRoute();

  //clear header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  
  const dispatch = useDispatch();
  const items = useSelector(selectBasketItems);
  const itemsWithId = useSelector((state) =>
    selectBasketItemsWithId(state, id)
  );

  const addItemToBasket = () => {
    dispatch(addToBasket({ id, imgUrl, nameFood, descFood, price }));
  };

  const removeItemFromBasket = () => {
    if (!items.length > 0) return;
    dispatch(removeFromBasket({ id }));
  };

  return (
    <SafeAreaView className="bg-white p-2">
      <View className="bg-white flex-row justify-between items-center px-2">
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

        <Text className="text-xl font-bold text-black">Details</Text>
        <View className="bg-[#ffebe5] rounded-md p-2">
          <ShoppingBagIcon color={"black"} className="z-50" />
          <View className="absolute top-1 right-1 rounded-md bg-[#000000] px-1 ">
            <Text className=" text-white font-bold">{items.length}</Text>
          </View>
        </View>
      </View>
      <ScrollView>
        <View className="mx-2">
          <View className="my-10">
            <Image
              className="h-52 w-full rounded-2xl"
              source={{
                uri: item.img,
              }}
            />
          </View>
          <Text className="text-2xl  font-bold">{item.name}</Text>
          <Text className="text-gray-600 pt-4">
          {item.description}
          </Text>
          <View className="flex-row mt-10 space-x-2">
            <View className="bg-gray-200  rounded-xl p-2 w-1/2 m-auto flex-row justify-around ">
              <TouchableOpacity onPress={removeItemFromBasket}>
                <Text className="text-black  font-bold text-lg text-center">
                  -
                </Text>
              </TouchableOpacity>
              <Text className="text-black  font-bold text-lg text-center">
                Add
              </Text>
              <TouchableOpacity onPress={addItemToBasket}>
                <Text className="text-bkacj  font-bold text-lg text-center">
                  +
                </Text>
              </TouchableOpacity>
            </View>
            <TouchableOpacity className="bg-[#fe6c44] rounded-xl p-2 w-1/2 m-auto">
              <Text className="text-white  font-bold text-lg text-center">
                Buy now $ {item.price}
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodScreen;
