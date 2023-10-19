import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MenuCard = ({ item }) => {
  const navigation = useNavigation();

  const goToFoodCategory = () => {
    navigation.navigate("FoodCategory", {
      docName: item.docName,
    });
  };

  return (
    <TouchableOpacity onPress={goToFoodCategory} className="break-all">
      <Image
        source={{
          uri: item.img,
        }}
        className="h-20 w-20 rounded-xl relative mr-2"
      />
      <View className="w-20 ">
        <Text
          className="absolute bottom-1 left-1 right-1 text-white font-bold  p-1 break-all"
          style={{ backgroundColor: "rgba(254, 108, 68, 0.6)" }}
          // style={{ backgroundColor: "rgba(256, 256, 256, 0.5)" }}
        >
          {item.name.length >= 15
            ? item.name.substring(0, 15) + "..."
            : item.name}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default MenuCard;
