import { TouchableOpacity, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { ChevronLeftIcon } from "react-native-heroicons/solid";

const BackButton = () => {
  const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity
        onPress={navigation.goBack}
        className=" border-[#cecfd2] p-1"
        style={{
          borderColor: "#cecfd2",
          borderWidth: 1,
          borderRadius: 10,
        }}
      >
        <ChevronLeftIcon color="#cecfd2" />
      </TouchableOpacity>
    </View>
  );
};

export default BackButton;
