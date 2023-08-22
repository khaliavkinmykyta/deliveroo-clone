import {
  View,
  Text,
  Image,
  TextInput,
  Switch,
  TouchableOpacity,
  ScrollView,
  Alert,
  Button,
} from "react-native";
import { useNavigation } from "@react-navigation/native";
import React, { useLayoutEffect, useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";
import SignOnForm from "./SignOnForm";
import MobileForm from "./MobileForm";

const MobileAuth = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

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
    <SafeAreaView className="p-4 flex-1  bg-white">
      <ScrollView>
        {/* LOGO&COMPANY NAME */}
        <View className="flex-row justify-center items-center space-x-3 ">
          <Image
            className="h-14 w-14 rounded-xl"
            source={{
              uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
            }}
          />
          <Text className="text-orange font-bold text-3xl ">EatMe</Text>
        </View>

        {/* GET START TEXT */}
        <View className="items-center space-y-2 ">
          <Text className="font-bold text-lg mt-10">Getting Started</Text>
          <Text className="text-gray-600 ">Create an account to continue</Text>
        </View>

        <MobileForm />

        {/* BUTTON FOR SIGN IN */}
        <View className="mt-2 mx-auto">
          <Text className="text-gray-500  ">
            Already have an account?{" "}
            <Text
              className="text-[#fe6c44] font-bold"
              onPress={() => navigation.navigate("SignIn")}
            >
              Login!
            </Text>
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default MobileAuth;
