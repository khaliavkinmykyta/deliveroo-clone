import {
  View,
  Text,
  SafeAreaView,
  Image,
  ScrollView,
  TouchableOpacity,
  Linking,
} from "react-native";
import React from "react";
import BackButton from "../../components/BackButton";
import BasketIcon from "../../components/Basket/BasketIcon";
import { PhoneIcon } from "react-native-heroicons/outline";

const SupportScreen = () => {
  const openLinkWhatsapp = async () => {
    const url = "https://www.google.com.ua/";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Не удалось открыть URL:", url);
    }
  };
  const openLinkFacebook = async () => {
    const url = "https://www.google.com.ua/";
    const supported = await Linking.canOpenURL(url);

    if (supported) {
      await Linking.openURL(url);
    } else {
      console.log("Не удалось открыть URL:", url);
    }
  };
  return (
    <SafeAreaView className="bg-white flex-1">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center px-2">
        <BackButton />

        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
      </View>

      <ScrollView>
        {/* BODY */}
        <View className="px-4">
          {/* BODY H1 */}
          <Text className="text-2xl text-center my-10">
            Our support works from 08:00 to 20:00.
          </Text>

          {/* PHONE */}
          <View className="flex-row justify-center items-center mb-10">
            {/* <PhoneIcon size={26} color={"black"} /> */}
            <Text className="font-bold text-lg ml-3">+380 66 48 38 010</Text>
          </View>

          {/* CHANNEL */}
          <Text className="text-center">
            You can contact us and we will help you through these communication
            channels:
          </Text>

          {/* CHANNEL ITEM */}
          <View className="items-center p-4 my-3 border border-zinc-200">
            <Image
              source={{
                uri: "https://upload.wikimedia.org/wikipedia/commons/thumb/0/05/Facebook_Logo_%282019%29.png/1024px-Facebook_Logo_%282019%29.png",
              }}
              className="h-20 w-20 rounded-xl mb-5"
            />
            <TouchableOpacity
              className="bg-[#fe6c44]  px-6 py-4 rounded-full"
              onPress={openLinkFacebook}
            >
              <Text className="text-white font-bold text-center text-base ">
                Our Facebook Support, average response time 5 minutes
              </Text>
            </TouchableOpacity>
          </View>

          {/* CHANNEL ITEM */}
          <View className="items-center p-4 my-3 border border-zinc-200">
            <Image
              source={{
                uri: "https://png.pngtree.com/png-vector/20221018/ourmid/pngtree-whatsapp-mobile-software-icon-png-image_6315991.png",
              }}
              className="h-20 w-20 rounded-xl mb-5"
            />
            <TouchableOpacity
              className="bg-[#fe6c44]  px-6 py-4 rounded-full"
              onPress={openLinkWhatsapp}
            >
              <Text className="text-white font-bold text-center text-base ">
                Our Whatsapp Support, average response time 3 minutes
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default SupportScreen;
