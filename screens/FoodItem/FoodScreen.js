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
  selectBasketTotalQuantity,
} from "../../features/basketSlice";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";

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
  const totalQuantity = useSelector(selectBasketTotalQuantity);
  const itemsWithId = useSelector((state) =>
    selectBasketItemsWithId(state, id)
  );

  const handlePress = () => {
    navigation.navigate("BasketScreen");
  };

  const addItemToBasket = () => {
    // dispatch(addToBasket({ id, imgUrl, nameFood, descFood, price }));
    dispatch(addToBasket(item));

    console.log(item);
  };

  const removeItemFromBasket = () => {
    console.log(item.id);
    // if (!items.length > 0) {
    //   console.log('length 0')
    //   return;}

    dispatch(removeFromBasket(item.id));

    // if (items.length > 0) {
    //   dispatch(removeFromBasket(item.id));
    //   console.log("myOrder");
    // } else {
    //   console.log("Basket is empty");
    // }
  };

  return (
    <SafeAreaView className="bg-white p-2">
      <View className="bg-white flex-row justify-between items-center px-2">
        <BackButton/>

        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
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
          <Text className="text-gray-600 pt-4">{item.description}</Text>
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
