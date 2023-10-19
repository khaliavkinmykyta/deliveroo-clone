import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import { MapPinIcon } from "react-native-heroicons/outline";
import CategoriesList from "../../components/CategoriesList";
import PopularFoodList from "./PopularFood/PopularFoodList";
import RecommendFoodList from "./RecommendFood/RecommendFoodList.jsx";
import PromotionFoodList from "./PromotionFood/PromotionFoodList";
import Search from "../../components/Search/Search";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import BasketIcon from "../../components/Basket/BasketIcon";
import OpenDrawer from "../../components/Buttons/OpenDrawer";

const HomeScreen = () => {
  const { user } = AuthDataContext();
  const navigation = useNavigation();

  return (
    <SafeAreaView className="bg-white px-4 py-2 flex-1">
      {/* CUSTOM HEADER Drawer + Name + Logo */}
      <View className="flex-row justify-between items-center">
        {/* Drawer Icon */}
        <View>
          <OpenDrawer />
        </View>

        {/* Name Screen */}
        <Text className="text-xl font-bold text-black text-center flex-1">
          Main
        </Text>

        {/* BASKET */}
        <View>
          <BasketIcon />
        </View>
      </View>

      {/* SEARCH */}
      <Search />

      {/* SCROLL BLOCK */}
      <ScrollView className="">
        {/* GEO ADDRESS LABEL */}
        <View className="">
          <Text className="text-lg font-bold text-[#fe6c44]  ">
            Delivery to:
          </Text>
          <TouchableOpacity onPress={() => navigation.navigate("Location")}>
            <View className="flex-row items-center space-x-1 py-2">
              <MapPinIcon color="#fe6c44" size={20} />
              <Text className="font-bold">
                {user && user.geoAddress && user.geoAddress.length !== 0
                  ? user.geoAddress[user.geoAddress.length - 1].address
                  : "Set location"}
              </Text>
            </View>
          </TouchableOpacity>
        </View>

        {/* CATEGORIES LIST */}
        <CategoriesList />

        {/* PROMOTION FOOD LIST */}
        <PromotionFoodList />

        {/* POPULAR FOOD LIST*/}
        <PopularFoodList />

        {/* RECOMMENDED FOOD LIST */}
        <RecommendFoodList />
      </ScrollView>
    </SafeAreaView>
  );
};

export default HomeScreen;
