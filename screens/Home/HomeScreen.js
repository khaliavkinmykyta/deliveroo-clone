import { View, Text, Image, TextInput, ScrollView } from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3Icon,
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
} from "react-native-heroicons/outline";
import MenuList from "../../components/MenuList";
import FeaturedRow from "../../components/FeaturedRow";

// Create clear header
const HomeScreen = () => {
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <SafeAreaView className="bg-white p-2  ">

      {/* HEADER HOME SCREEN */}

      <View className="bg-white flex-row justify-between items-center px-2">
        <Bars3Icon
          color="#cecfd2"
          className=" border-black"
          size={35}
          style={{
            borderColor: "#cecfd2",
            borderWidth: 2,
            borderRadius: "10%",
          }}
        />
        <Text className="text-xl font-bold text-black">Home</Text>
        <Image
          source={{
            uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
          }}
          className="h-10 w-10 rounded-xl"
        />
      </View>

      {/* SEARCH */}

      <View className="flex-row items-center space-x-2 bg-gray-100 rounded-xl px-2 mx-2 my-4 ">
        <View className="flex-row flex-1 space-x-2 p-2">
          <MagnifyingGlassIcon color="black" />
          <TextInput
            placeholder="try to find..."
            keyboardType="default"
          ></TextInput>
        </View>
        <AdjustmentsVerticalIcon color="black" />
      </View>
      <View className="px-2">
        <Text className="text-lg font-bold text-[#fe6c44]  ">Delivery to:</Text>
        <View className="flex-row items-center space-x-1">
          <Text className="font-bold">st. Koneva 21, app. 70</Text>
          <ChevronDownIcon color="#fe6c44" />
        </View>
      </View>

      {/* BODY */}

      <ScrollView>

        {/* Categories */}

        <MenuList />

        {/* Featured Row */}

        <FeaturedRow
          title="Popular Food"
          description="Paid placement from out partners"
          featuredCategory={"featured"}
          id={"123"}
        />
        <FeaturedRow
          title="Recommended"
          description="Paid placement from out partners"
          featuredCategory={"featured"}
          id={"123"}
        />
        <FeaturedRow
          title="Featured"
          description="Paid placement from out partners"
          featuredCategory={"featured"}
          id={"123"}
        />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
