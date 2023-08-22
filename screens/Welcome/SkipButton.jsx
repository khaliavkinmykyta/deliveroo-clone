import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const SkipButton = ({scrollToEnd}) => {
  return (
    <View>
      <TouchableOpacity className="bg-[#fe6c44] border border-white px-8 py-4 rounded-xl" onPress={scrollToEnd}>
        <Text className="font-bold text-2xl text-white">Skip</Text>
      </TouchableOpacity>
    </View>
  );
};

export default SkipButton;
