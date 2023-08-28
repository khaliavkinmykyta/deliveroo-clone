import { Animated, Image, Text, TouchableOpacity, View } from "react-native";
import React, { useEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

const MenuCard = ({ imgUrl, name, docName }) => {


  const navigation = useNavigation();

  const goToFoodCategory = () => {
    navigation.navigate("FoodCategory", {
      imgUrl: imgUrl,
      name: name,
      docName: docName,
    });
  };

  return (
      <TouchableOpacity onPress={goToFoodCategory}>
        <Image
          source={{
            uri: imgUrl,
          }}
          className="h-20 w-20 rounded-xl relative mr-2"
        />
        <Text className="absolute bottom-1 left-1 text-white font-bold">
          {name}
        </Text>
      </TouchableOpacity>
  );
};

export default MenuCard;
