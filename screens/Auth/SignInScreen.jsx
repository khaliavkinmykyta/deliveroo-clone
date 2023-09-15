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

import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import SignInForm from "./SignInForm";

const SignInScreen = () => {
  const navigation = useNavigation();

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="px-4 py-2 flex-1 justify-between  bg-white">
        {/* HEAD */}
        <View>
          {/* LOGO&COMPANY NAME */}
          <View className="flex-row justify-center items-center space-x-3 ">
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
            <Text className="font-bold text-lg mt-10">Let's Sign You In</Text>
            <Text className="text-gray-600 ">
              Welcome Back, you've been missed
            </Text>
          </View>
        </View>

        {/* BODY */}
        <ScrollView>
          <SignInForm className="flex-1" />
        </ScrollView>

        {/* BOTTOM and BUTTON FOR SIGN IN */}
        <TouchableOpacity
          className="my-5 mx-auto"
          onPress={() => navigation.navigate("SignOn")}
        >
          <Text className="text-zinc-400  ">
            Don't have an account?{" "}
            <Text className="text-[#fe6c44] font-bold">Sign Up!</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SignInScreen;
