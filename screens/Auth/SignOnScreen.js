import {
  View,
  Text,
  Image,
  TextInput,
  Button,
  Switch,
  TouchableOpacity,
  Alert,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../firebase";

const SignOnScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignUp = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        // Alert.alert("Alert", "Email already exists", [
        //     { text: errorCode, onPress: () => console.log("OK Pressed") },
        //   ]);
        if (errorCode === 'auth/email-already-in-use') {
            Alert.alert("Alert", "Email already exists", [
                { text: "OK", onPress: () => console.log("OK Pressed") },
              ]);
        }
       
        // ..
      });
  };

  //Save me toggle switch
  const [isEnabled, setIsEnabled] = useState(true);
  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  //clear header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

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
        <Text className="font-bold text-lg mt-10">Getting Started</Text>
        <Text className="text-gray-600 ">Create an account to continue</Text>
      </View>

      <View className="space-y-4 mt-20">
        <View>
          <Text className="block text-sm text-gray-500 mb-1">Login</Text>
          <TextInput
            value={email}
            onChangeText={(text) => setEmail(text)}
            className="bg-gray-200 h-12 rounded-xl p-4"
            placeholder="your email"
            keyboardType="email-address"
          />
        </View>

        <View>
          <Text className="block text-sm text-gray-500 mb-1">Password</Text>
          <TextInput
            value={password}
            onChangeText={(text) => setPassword(text)}
            className="bg-gray-200 h-12 rounded-xl p-4"
            placeholder="your password"
            keyboardType="default"
            secureTextEntry={true}
          />
        </View>
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

      {/* BUTTON FOR SIGN ON */}
      <View className="mx-auto mt-8  w-full">
        <TouchableOpacity
          className="bg-[#fe6c44] rounded-xl h-12"
          onPress={handleSignUp}
        >
          <Text className="m-auto text-white font-bold text-lg">Sign Up</Text>
        </TouchableOpacity>
      </View>

      {/* BUTTON FOR SIGN IN */}
      <View className="mt-2 mx-auto">
        <Text className="text-gray-500  ">
          Already have an account?
          <Text
            className="text-[#fe6c44] font-bold"
            onPress={() => navigation.navigate("SignIn")}
          >
            {" "}
            Sign up!
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default SignOnScreen;
