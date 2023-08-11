import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Bars3CenterLeftIcon,
} from "react-native-heroicons/outline";
import CategoriesList from "../../components/CategoriesList";
import PopularFoodList from "./PopularFood/PopularFoodList";
import RecommendFoodList from "./RecommendFood/RecommendFoodList.jsx";

const HomeScreen = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <SafeAreaView className="bg-white p-3 ">
      <ScrollView >
      {/* CUSTOM HEADER Drawer + Name + Logo */}
      <View className="flex-row justify-between items-center px-2">
        {/* Drawer Icon */}
        <TouchableWithoutFeedback onPress={openDrawer}>
          <View className="p-1 border border-zinc-500 rounded-xl">
            <Bars3CenterLeftIcon color="#71717a" size={26} />
          </View>
        </TouchableWithoutFeedback>

        {/* Name Screen */}
        <Text className="text-xl font-bold text-black">Home</Text>

        {/* Logo */}
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

      {/* GEO ADDRESS LABEL */}
      <View className="mx-2">
        <Text className="text-lg font-bold text-[#fe6c44]  ">Delivery to:</Text>
        <View className="flex-row items-center space-x-1">
          <Text className="font-bold">st. Koneva 21, app. 70</Text>
          <ChevronDownIcon color="#fe6c44" />
        </View>
      </View>

      
        {/* CATEGORIES LIST */}
        <CategoriesList />

        {/* POPULAR FOOD LIST*/}
        <PopularFoodList />

        {/* RECOMMENDED FOOD LIST */}
        <RecommendFoodList />

        {/* PROMOTION FOOD LIST */}
        <RecommendFoodList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
