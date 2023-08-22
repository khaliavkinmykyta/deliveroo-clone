import { Text, Image, TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const RecommendFoodItem = ({ item }) => {
    const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FoodScreen", {
          item: item,
          id: item.id,
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
        <Text className="font-bold px-2 text-center">{item.name}</Text>
        <Text className="text-xs text-gray-500 text-center px-2">
        {item.description.length >= 50
                ? item.description.substring(0, 50) + " read more..."
                : item.description}
        </Text>
      </View>
      <Text className="font-bold text-lg py-3    ">{item.price}</Text>
    </TouchableOpacity>
  );
};

export default RecommendFoodItem;
