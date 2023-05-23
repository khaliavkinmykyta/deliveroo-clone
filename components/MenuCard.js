import { View, Image, Text, TouchableOpacity } from "react-native";
import React from "react";

const MenuCard = ({ imgUrl, title }) => {
  return (
    <TouchableOpacity>
      <Image
        source={{
          uri: imgUrl,
        }}
        className="h-20 w-20 rounded-md relative mr-2"
      />
      <Text className='absolute bottom-1 left-1 text-white font-bold'>{title}</Text>
    </TouchableOpacity>
  );
};

export default MenuCard;
