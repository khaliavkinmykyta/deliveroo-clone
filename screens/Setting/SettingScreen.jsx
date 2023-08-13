import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  ScrollView,
  TouchableWithoutFeedback,
  Image,
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
  UserIcon
} from "react-native-heroicons/outline";
import { AuthDataContext } from "../../hooks/AuthWrapper";

const SettingScreen = () => {
  const [name, setName] = useState(""); // Состояние для имени пользователя
  const navigation = useNavigation();

  const { login, logout, user } = AuthDataContext();

  const openDrawer = () => {
    navigation.openDrawer();
  };

  const handleSave = () => {
    // Здесь можно добавить логику сохранения нового значения имени
    // Например, отправить запрос на сервер или обновить состояние в контексте

    console.log("New name:", name);
  };
  return (
    <View className='bg-white '>
      <SafeAreaView className="bg-white p-3 ">
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
            <View className="flex-row justify-between items-center">
                <View className="flex-row items-center gap-2">
                  <UserIcon color="#71717a" size={26} />
                  <Text className="font-semibold">{user.displayName}</Text>
                </View>
               
              </View>

            {/* Your email */}
            <TouchableOpacity>
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
            <TouchableOpacity>
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
            <TouchableOpacity>
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
                  <Text className="font-semibold">Change payment methods </Text>
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
                  <Text className="font-semibold">Manage my privacy </Text>
                </View>
                <View className="">
                  <ChevronRightIcon color="#71717a" size={26} />
                </View>
              </View>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </SafeAreaView>
    </View>
  );
};

export default SettingScreen;
