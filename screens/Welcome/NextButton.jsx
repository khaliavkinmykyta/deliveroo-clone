import { View, Text, TouchableOpacity } from "react-native";
import React from "react";

const NextButton = ({ scrollTo }) => {
  return (
    <View>
      <TouchableOpacity
        className="bg-white border border-white rounded-xl px-8 py-4"
        onPress={scrollTo}
      >
        <Text className="text-[#fe6c44] font-bold text-2xl">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

export default NextButton;
