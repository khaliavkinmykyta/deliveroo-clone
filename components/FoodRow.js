import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const FoodRow = ({  item, categoryId, test }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      onPress={() => {
        navigation.navigate("FoodScreen", {
        item: item,
        id: item.id,
        });
      }}
      className="p-4"
    >
      <View className="flex-row">
        <View>
          <Image
            className="w-14 h-14"
            source={{
              uri: item.img,
            }}
          />
        </View>
        <View className="flex-1 px-2">
          <Text className="font-bold">{item.name}</Text>
          <Text className="text-gray-600 ">
           {item.description}
          </Text>
        </View>
        <View className="justify-between">
          <Text>{item.price}3</Text>
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
