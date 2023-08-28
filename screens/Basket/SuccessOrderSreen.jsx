import { View, Text, SafeAreaView, Touchable } from "react-native";
import React from "react";
import { HandThumbUpIcon } from "react-native-heroicons/outline";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessOrderScreen = () => {
  const navigation = useNavigation()
  return (
    <SafeAreaView className="bg-[#fe6c44] flex-1 justify-center items-center gap-5">
      <View className="justify-center items-center flex-row gap-1">

        <Text className="text-center font-bold text-3xl">Order success</Text>
        <HandThumbUpIcon size={32} color={"black"} />

      </View>
      <View>
        <TouchableOpacity className="bg-black  rounded-full" onPress={() => navigation.navigate("Home")}>
          <Text className="text-[#fe6c44] text-3xl p-3">Back to menu</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessOrderScreen;
