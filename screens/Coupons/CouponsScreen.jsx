import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useState } from "react";
import {
  Bars3CenterLeftIcon,
  PlusIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GifIcon, GiftIcon } from "react-native-heroicons/solid";

const CouponsScreen = () => {
  const navigation = useNavigation();
  const [promocode, setPromoCode] = useState(false);

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView className="bg-white p-3 ">
      <ScrollView>
        {/* CUSTOM HEADER Drawer + Name + Logo */}
        <View className="flex-row justify-between items-center px-2">
          {/* Drawer Icon */}
          <TouchableWithoutFeedback onPress={openDrawer}>
            <View className="p-1 border border-zinc-500 rounded-xl">
              <Bars3CenterLeftIcon color="#71717a" size={26} />
            </View>
          </TouchableWithoutFeedback>

          {/* Name Screen */}
          <Text className="text-xl font-bold text-black">Coupons</Text>

          {/* Logo */}
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
            }}
            className="h-10 w-10 rounded-xl"
          />
        </View>

        {/* PROMO CODE BODY */}
        <View className="flex-row justify-between items-center px-2">
          <View className="mx-4 gap-y-5 mt-10">

            {/* CHECK PROMO CODE FOR CURRENT USER */}
            {promocode ? (
              <View className="bg-gray-100 rounded-xl flex-row justify-between px-2 py-4">
                <View className="flex-row gap-5">
                  <Image
                    source={{
                      uri: "https://cdn.pixabay.com/photo/2019/12/16/15/47/vector-4699584_1280.png",
                    }}
                    className="h-10 w-10 rounded-xl"
                  />
                  <View className="justify-between">
                    <Text className="font-semibold ">Discount 20%</Text>
                    <Text className="text-slate-500">Only for drinks</Text>
                  </View>
                </View>
                <View className="items-end ">
                  <Text className="font-bold">Expire by: </Text>
                  <Text className="font-bold">18/09/2023</Text>
                </View>
              </View>
            ) : (
              <View className='flex-row justify-center items-center gap-x-5'>
              <GiftIcon size={28} color="#71717a" />
              <Text className='font-bold'>You don't have active promo code</Text>
              </View>
            )}

            {/* ADD PROMO CODE */}
            <View className="bg-white rounded-xl flex-row justify-between px-2 py-4">
              <View className="flex-row items-center w-1/2">
                <Text className="font-bold text-lg">Add promo code:</Text>
              </View>

              <View className="w-1/2    ">
                <TextInput
                  // value={email}
                  // onChangeText={(text) => setEmail(text)}
                  className="bg-gray-200 h-12 rounded-xl p-4"
                  placeholder="paste your code"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* BUTTON ADDING */}
            <View className="mx-auto w-full">
              <TouchableOpacity className="bg-[#fe6c44] rounded-xl h-12">
                <Text className="m-auto text-white font-bold text-lg">
                  Add promo code
                </Text>
              </TouchableOpacity>
            </View>
            
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CouponsScreen;
