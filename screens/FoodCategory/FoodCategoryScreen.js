import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import MenuList from "../../components/MenuList";
import FoodRow from "../../components/FoodRow";
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { selectBasketItems } from "../../features/basketSlice";

const FoodCategoryScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  const items = useSelector(selectBasketItems);

  return (
    <SafeAreaView className=''>
      <View className="flex-row justify-between items-center px-2">
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
      <MenuList />
      <Text className="font-bold text-2xl my-2 text-center">Pizza</Text>
      <FoodRow
        title="Popular Food"
        description="Paid placement from out partners"
        featuredCategory={"featured"}
        id={"123"}
      />
      <FoodRow
        title="Popular Food"
        description="Paid placement from out partners"
        featuredCategory={"featured"}
        id={"123"}
      />
      <FoodRow />
    </SafeAreaView>
  );
};

export default FoodCategoryScreen;
