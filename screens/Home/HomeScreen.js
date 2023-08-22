import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableWithoutFeedback,
  FlatList,
} from "react-native";
import React, { useEffect, useState } from "react";
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
import PromotionFoodList from "./PromotionFood/PromotionFoodList";
import Search from "../../components/Search/Search";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import Geolocation from "./Geolocation/Geolocation";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const HomeScreen = () => {
  const {user} = AuthDataContext()
  const navigation = useNavigation();


  const openDrawer = () => {
    navigation.openDrawer();
  };


  return (
    <SafeAreaView className="bg-white p-2 flex-1">

        {/* CUSTOM HEADER Drawer + Name + Logo */}
        <View className="flex-row justify-between items-center px-2">
          {/* Drawer Icon */}
          <TouchableWithoutFeedback onPress={openDrawer}>
            <View className="p-1 border border-zinc-500 rounded-xl">
              <Bars3CenterLeftIcon color="#71717a" size={26} />
            </View>
          </TouchableWithoutFeedback>

          {/* Name Screen */}
          <Text className="text-xl font-bold text-black">Main</Text>

          {/* Logo */}
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
            }}
            className="h-10 w-10 rounded-xl"
          />
        </View>

        {/* <Geolocation/>
        <GooglePlacesAutocomplete/> */}

        {/* SEARCH */}
        <Search />
        <ScrollView>

        {/* GEO ADDRESS LABEL */}
        <View className="mx-2">
          <Text className="text-lg font-bold text-[#fe6c44]  ">
            Delivery to:
          </Text>
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
        <PromotionFoodList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
