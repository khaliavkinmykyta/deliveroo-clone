import {Image, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const MenuCard = ({ imgUrl, name }) => {
  const navigation = useNavigation();

  const goToFoodCategory = () => {
    navigation.navigate('FoodCategory', {
      imgUrl: imgUrl,
      name: name,
    });
  };

  return (
    <TouchableOpacity onPress={goToFoodCategory}>
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded-md relative mr-2"
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{name}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;
