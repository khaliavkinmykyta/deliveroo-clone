import {
  View,
  Text,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignInScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        console.log(user);
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

  //Save me toggle switch
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const handleKeyboardDismiss = () => {
    Keyboard.dismiss(); // Скрывает клавиатуру
  };
  //clear header
  // useLayoutEffect(() => {
  //   navigation.setOptions({
  //     headerShown: false,
  //   });
  // }, []);

  return (
    <SafeAreaView className="m-4 ">
      <View className="flex-row justify-center items-center space-x-3">
        <Image
          className="h-14 w-14 rounded-xl"
          source={{
            uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
          }}
        />
        <Text className="text-orange font-bold text-3xl ">EatMe</Text>
      </View>

      <View className="items-center space-y-2">
        <Text className="font-bold text-lg mt-10">Let's Sign You In</Text>
        <Text className="text-gray-600 ">Welcome Back, you've been missed</Text>
      </View>

      <View className=" mt-20">
        <TouchableWithoutFeedback onPress={handleKeyboardDismiss}>
          <View>
            <Text className="block text-sm text-gray-500 mb-2">Login</Text>
            <TextInput
              value={email}
              onChangeText={(text) => setEmail(text)}
              className="bg-gray-200 h-12 rounded-xl p-4"
              placeholder="your email"
              keyboardType="email-address"
            />
          </View>
        </TouchableWithoutFeedback>

        <TouchableWithoutFeedback onPress={handleKeyboardDismiss} >
          <View >
            <Text className="block text-sm text-gray-500 mb-2 mt-4">Password</Text>
            <TextInput
              value={password}
              onChangeText={(text) => setPassword(text)}
              className="bg-gray-200 h-12 rounded-xl p-4"
              placeholder="your password"
              keyboardType="default"
              secureTextEntry={true}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
      <View className="flex-row justify-between items-center mt-4">
        <View className="flex-row items-center space-x-1">
          <Switch
            className="scale-75 "
            trackColor={{ false: "#ffffff", true: "#fe6c44" }}
            thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
            s
          />
          <Text className="text-gray-600">
            {isEnabled ? "Save me" : "Don't save me"}
          </Text>
        </View>

        <Text className="text-gray-600 ">Forgot Password?</Text>
      </View>

      {/* BUTTON FOR SIGN IN */}
      <View className="mx-auto mt-8  w-full">
        <TouchableOpacity
          className="bg-[#fe6c44] rounded-xl h-12"
          onPress={handleSignIn}
        >
          <Text className="m-auto text-white font-bold text-lg">Sign In</Text>
        </TouchableOpacity>
      </View>

      {/* BUTTON FOR SIGN UP */}
      <View className="mt-2 mx-auto">
        <Text className="text-gray-500  ">
          Don't have account?
          <Text
            className="text-[#fe6c44] font-bold"
            onPress={() => navigation.navigate("SignOn")}
          >
            {" "}
            Sign up!
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignInScreen;
