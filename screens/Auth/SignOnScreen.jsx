import React from "react";
import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import SignOnForm from "./SignOnForm";

import { useNavigation } from "@react-navigation/native";

const SignOnScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="bg-white px-4 py-2 flex-1 justify-between">
        {/* HEAD */}
        <View>
          {/* LOGO&COMPANY NAME */}
          <View className=" flex-row justify-center items-center space-x-3 ">
            <Image
              className="h-14 w-14 rounded-xl"
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2FScreenshot%202023-09-02%20at%2021.41.43.png?alt=media&token=11aeac0b-2bb9-42d2-91d7-3acbd1e6e78d",
              }}
            />

            <Text className="text-orange font-bold text-3xl">RestoWave</Text>
          </View>

          {/* GET START TEXT */}
          <View className="items-center space-y-2 mb-5 ">
            <Text className="font-bold text-lg mt-10">Getting Started</Text>
            <Text className="text-gray-600 ">
              Create an account to continue
            </Text>
          </View>
        </View>

        {/* BODY */}
        <ScrollView>
          <SignOnForm className="flex-1" />
        </ScrollView>

        {/* BOTTOM and BUTTON FOR SIGN IN */}
        <TouchableOpacity
          className="my-5 mx-auto"
          onPress={() => navigation.navigate("SignIn")}
        >
          <Text className="text-zinc-400 upper  ">
            Already have an account?{" "}
            <Text className="text-[#fe6c44] font-bold up">Login!</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignOnScreen;
