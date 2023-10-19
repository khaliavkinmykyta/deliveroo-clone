import { View, Text, Image, useWindowDimensions } from "react-native";
import React from "react";

const WelcomeItem = ({ item }) => {
  const { width, height } = useWindowDimensions();
  const imageWidth = width - 32;
  const imageHeight = height/4;


  return (
    // CONTAINER
    <View style={{ width }}>
      {/* IMAGE */}
      <Image
        source={{
          uri: item.img,
        }}
        style={{
          width: imageWidth,
          height: imageHeight,
          resizeMode: "contain",
          marginHorizontal: 16,
        }}
      />

      {/* TEXT */}
      <View className="mx-4">
        <Text className="text-3xl font-bold text-center text-white">
          {item.mainText}
        </Text>
        <Text className="text-center text-white font-normal mt-2">
          {item.text}
        </Text>
      </View>
    </View>
  );
};

export default WelcomeItem;
