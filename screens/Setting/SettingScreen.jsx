import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
  Modal,
} from "react-native";
import React, { useState } from "react";
import { useNavigation } from "@react-navigation/native";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  EnvelopeIcon,
  LockClosedIcon,
  ChevronRightIcon,
  Bars3CenterLeftIcon,
  DevicePhoneMobileIcon,
  CreditCardIcon,
  MegaphoneIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { useForm, Controller } from "react-hook-form";
import ChangePassword from "./ChangePassword";
import { auth } from "../../firebase";

const SettingScreen = () => {
  const navigation = useNavigation();
  const userTrue = auth.currentUser;
  if (userTrue !== null) {
    console.log("userTrue");

    console.log(userTrue.displayName);
  }

  const goChangePassword = () => {
    navigation.navigate("ChangePassword");
  };
  const [name, setName] = useState(""); // Состояние для имени пользователя

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { user } = AuthDataContext();
  console.log(user);

  const openDrawer = () => {
    navigation.openDrawer();
  };

  return (
      <SafeAreaView className="bg-white p-3 flex-1">
        <ScrollView className="mx-4">
          {/* CUSTOM HEADER Drawer + Name + Logo */}
          <View className="flex-row justify-between items-center">
            {/* Drawer Icon */}
            <TouchableWithoutFeedback onPress={openDrawer}>
              <View className="p-1 border border-zinc-500 rounded-xl">
                <Bars3CenterLeftIcon color="#71717a" size={26} />
              </View>
            </TouchableWithoutFeedback>

            {/* Name Screen */}
            <Text className="text-xl font-bold text-black">Setting</Text>

            {/* Logo */}
            <Image
              source={{
                uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
              }}
              className="h-10 w-10 rounded-xl"
            />
          </View>
          <View className="gap-5 mt-3">
            {/* Your name */}
            <TouchableOpacity
              onPress={() => navigation.navigate("DisplayName")}
            >
              <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <UserIcon color="#71717a" size={26} />
                  <Text className="font-semibold">{user.displayName}</Text>
                </View>
              </View>
            </TouchableOpacity>

            {/* Your email */}
            <TouchableOpacity
              onPress={() => navigation.navigate("EmailScreen")}
            >
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
            <TouchableOpacity onPress={goChangePassword}>
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
            <TouchableOpacity
              onPress={() => navigation.navigate("MobileScreen")}
            >
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
