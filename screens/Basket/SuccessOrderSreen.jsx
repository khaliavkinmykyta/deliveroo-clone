import { View, Text, SafeAreaView, Image } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native";
import { useNavigation } from "@react-navigation/native";

const SuccessOrderScreen = () => {
  const navigation = useNavigation();
  return (
    <SafeAreaView className="bg-[#fe6c44] flex-1 justify-center items-center gap-10">
      <View className="justify-center items-center flex-row  px-4 ">
        <Text className="text-center font-bold text-3xl">
          Thank you for your order!
        </Text>
      </View>
      <View>
        <Image
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2Fcheers.png?alt=media&token=0f6a10e3-fe59-4752-96ca-53b1acdd42db",
          }}
          className="w-32 h-32 rounded-full"
        />
      </View>
      <View>
        <TouchableOpacity
          className="bg-black  rounded-full"
          onPress={() => navigation.navigate("Home")}
        >
          <Text className="text-white font-bold text-2xl px-6 py-2">
            Back to menu
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default SuccessOrderScreen;
