import {Text, Image, TouchableOpacity} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FoodFeatured = ({ id, imgUrl, nameFood, descFood, price }) => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FoodScreen", {
          id,
          imgUrl,
          nameFood,
          descFood,
          price,
        });
      }}
      className="bg-gray-100 rounded-xl  w-36 space-y-1    mr-3 p-2 justify-center items-center"
    >
      <Image
        className="h-28 w-28 mb-6 rounded-xl"
        source={{
          uri: imgUrl,
        }}
      />
      <Text className="font-bold">{nameFood}</Text>
      <Text className="text-xs text-gray-500 text-center">{descFood}</Text>
      <Text className="font-bold text-lg">{price}</Text>
    </TouchableOpacity>
  );
};

export default FoodFeatured;
