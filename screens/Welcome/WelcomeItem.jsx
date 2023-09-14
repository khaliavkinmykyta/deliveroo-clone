import {
  View,
  Text,
  Image,
  useWindowDimensions,
  StyleSheet,
} from "react-native";
import React from "react";

const WelcomeItem = ({ item }) => {
  const { width } = useWindowDimensions();
  const imageWidth = width - 32; // Уменьшаем ширину изображения на 32 (16 отступы с каждой стороны)

  return (
    // CONTAINER
    <View style={{ width }} className=''>
      {/* IMAGE */}
      <Image
        source={{
          uri: item.img,
        }}
        style={ { width: imageWidth, resizeMode: "contain", marginHorizontal: 16, }} className=' h-48'
      />

      {/* TEXT */}
      <View className='mx-4'>
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
