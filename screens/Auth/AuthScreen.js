import { View, Text, Image, TextInput, Button, Switch } from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";
import { auth } from "../../firebase";

const AuthScreen = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        navigation.navigate("Home");
        // ...
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
      });
  };

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
        // ..
      });
  };

  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };
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
        <Text className="font-bold text-lg mt-10">Let's Sign You In</Text>
        <Text className="text-gray-600 ">Welcome Back, you've been missed</Text>
      </View>

      <View className="space-y-5 mt-20">
        <TextInput
          value={email}
          onChangeText={(text) => setEmail(text)}
          className="bg-gray-200 h-12 rounded-xl p-4"
          placeholder="your email"
          keyboardType="email-address"
        />
        <Text
          for="password"
          className="block text-sm font-semibold text-gray-800"
        >
          Password
        </Text>
        <TextInput
          value={password}
          onChangeText={(text) => setPassword(text)}
          className="bg-gray-200 h-12 rounded-xl p-4"
          placeholder="your password"
          keyboardType="default"
          secureTextEntry={true}
        />
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
      <View className="m-auto">
        <Button
          onPress={handleSignIn}
          className="bg-orange-400 text-black"
          title="Sign In"
        />
        <Button
          onPress={handleSignUp}
          className="bg-orange-400 text-black"
          title="Register"
        />

        <Text>Don't have account? Sign up!</Text>
      </View>
    </SafeAreaView>
  );
};

export default AuthScreen;
