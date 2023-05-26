import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FoodRow = ({ id, imgUrl, nameFood, descFood, price }) => {
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
      className="p-4"
    >
      <View className="flex-row">
        <View>
          <Image
            className="w-14 h-14"
            source={{
              uri: "https://imgpng.ru/d/kfc_food_PNG2.png",
            }}
          />
        </View>
        <View className="flex-1 px-2">
          <Text className="font-bold">Name of product</Text>
          <Text className="text-gray-600 ">
            Lorem ipsum dolosdasduiasdasdasdasdasda! Nesciunt harum minus
            tempora, at quae ipsum reprehenderit m?
          </Text>
        </View>
        <View className="justify-between">
          <Text>333,33</Text>
          <Button
            title="+"
            onPress={() => {
              navigation.navigate("FoodScreen", {
                id,
                imgUrl,
                nameFood,
                descFood,
                price,
              });
            }}
          />
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default FoodRow;
