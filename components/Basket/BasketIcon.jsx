import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { selectBasketTotalQuantity } from "../../features/basketSlice";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import { ShoppingBagIcon } from "react-native-heroicons/outline";

const BasketIcon = () => {
  const totalQuantity = useSelector(selectBasketTotalQuantity);
  const navigation = useNavigation();

  const handlePress = () => {
    navigation.navigate("BasketScreen");
  };

  return (
    <View>
      <TouchableOpacity onPress={handlePress}>
        <View className="bg-[#ffebe5] rounded-md p-2">
          <ShoppingBagIcon color={"black"} className="z-50" size={26} />
        </View>
        <View className="absolute top-1 right-1 rounded-md bg-[#000000] px-1">
          {/* <Text className=" text-white font-bold text-xs">{totalQuantity}</Text> */}
          <Text className=" text-white font-bold text-xs">
            {totalQuantity > 999
              ? `${totalQuantity.toString().slice(0, 2)}..`
              : totalQuantity.toString()}
          </Text>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default BasketIcon;
