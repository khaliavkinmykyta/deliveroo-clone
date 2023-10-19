import { View, Text, TouchableOpacity, ScrollView } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import {
  EnvelopeIcon,
  LockClosedIcon,
  ChevronRightIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  MegaphoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { auth } from "../../firebase";
import OpenDrawer from "../../components/Buttons/OpenDrawer";
import { SafeAreaView } from "react-native-safe-area-context";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";

const SettingScreen = () => {
  const { user } = AuthDataContext();
  const navigation = useNavigation();
  // const userTrue = auth.currentUser;
  // if (userTrue !== null) {
  //   console.log("userTrue");
  // }

  return (
    <SafeAreaView className="bg-white px-4 py-2 flex-1">
      {/* CUSTOM HEADER Drawer + Name + Logo */}
      <View className="flex-row justify-between items-center">
        {/* Drawer Icon */}
        <BackButton />
        {/* Name Screen */}
        <Text className="text-xl font-bold text-black">Setting</Text>
        {/* Logo */}
        <BasketIcon />
      </View>
      <ScrollView className="">
        <View className="gap-5  mt-3">
          {/* Your name */}
          <TouchableOpacity onPress={() => navigation.navigate("DisplayName")}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <UserIcon color="#71717a" size={26} />
                <Text className="font-semibold">
                  {user.displayName || "Set your name"}
                </Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Your email */}
          <TouchableOpacity onPress={() => navigation.navigate("EmailScreen")}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <EnvelopeIcon color="#71717a" size={26} />
                <Text className="font-semibold">{user.email}</Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Change password */}
          <TouchableOpacity
            onPress={() => navigation.navigate("ChangePassword")}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <LockClosedIcon color="#71717a" size={26} />
                <Text className="font-semibold">Change password</Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Change phone number */}
          <TouchableOpacity onPress={() => navigation.navigate("MobileScreen")}>
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <DevicePhoneMobileIcon color="#71717a" size={26} />
                <Text className="font-semibold">Change phone number</Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Change payment methods */}
          <TouchableOpacity
            onPress={() => alert("Not available in demo mode!")}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <CreditCardIcon color="#71717a" size={26} />
                <Text className="font-semibold">Change payment methods</Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>

          {/* Manage my privacy */}
          <TouchableOpacity
            onPress={() => alert("Not available in demo mode!")}
          >
            <View className="flex-row justify-between items-center">
              <View className="flex-row items-center gap-2">
                <MegaphoneIcon color="#71717a" size={26} />
                <Text className="font-semibold">Manage my privacy</Text>
              </View>
              <View className="">
                <ChevronRightIcon color="#71717a" size={26} />
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SettingScreen;
