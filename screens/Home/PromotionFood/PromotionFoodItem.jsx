import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const PromotionFoodItem = ({ item }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FoodScreen", {
          item: item,
        });
      }}
      className="bg-gray-100 rounded-xl mr-3 justify-between items-center "
    >
      <View className="w-28  items-center">
        <Image
          className="h-20  w-full mb-6 rounded-xl"
          source={{
            uri: item.img,
          }}
        />
        <Text className="font-bold px-2 text-center mb-1">
          {" "}
          {item.name.length >= 40
            ? item.name.substring(0, 40) + "..."
            : item.name}
        </Text>
        <Text className="text-xs text-gray-500 text-center px-2">
          {item.description.length >= 50
            ? item.description.substring(0, 50) + " read more..."
            : item.description}
        </Text>
      </View>
      <View>
        <Text className="font-bold text-red-500 line-through  text-sm   py-3">
          £{parseFloat(item.oldPrice).toFixed(2)}
        </Text>
        <Text className="font-bold text-lg py-3">
          £{parseFloat(item.price).toFixed(2)}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PromotionFoodItem;
