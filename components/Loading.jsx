import React, { useEffect } from "react";
import { Text, ActivityIndicator, View, Image } from "react-native";

export default function Loading() {
  useEffect(() => {
    console.log('now loading')
  }, [])
  return (
    <View className="flex-1 justify-around  items-center bg-[#fe6c44]">
      <Image
        className="h-12 w-12 mt-20 "
        source={{
          uri: "https://companieslogo.com/img/orig/TKWY.AS.D-c5272108.png?t=1659645684",
        }}
      />
      <ActivityIndicator color="white" size="large" />
      <Text className='text-white font-semibold'>Downloading application data...</Text>

    </View>
  );
}
