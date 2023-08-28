import {
  View,
  Text,
  Image,
  ScrollView,
  TouchableWithoutFeedback,
  TouchableOpacity,
} from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  Bars3CenterLeftIcon,
  MapPinIcon,
} from "react-native-heroicons/outline";
import CategoriesList from "../../components/CategoriesList";
import PopularFoodList from "./PopularFood/PopularFoodList";
import RecommendFoodList from "./RecommendFood/RecommendFoodList.jsx";
import PromotionFoodList from "./PromotionFood/PromotionFoodList";
import Search from "../../components/Search/Search";
import { AuthDataContext } from "../../hooks/AuthWrapper";

const HomeScreen = () => {
  const { user } = AuthDataContext();
  const navigation = useNavigation();

 

  return (
    <SafeAreaView className="bg-white p-2 flex-1">
      {/* CUSTOM HEADER Drawer + Name + Logo */}
      <View className="flex-row justify-between items-center px-2">
        {/* Drawer Icon */}
        <TouchableWithoutFeedback onPress={() => navigation.openDrawer()}>
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

      {/* SEARCH */}
      <Search />
      <ScrollView className=''>
        {/* GEO ADDRESS LABEL */}
        <View className="mx-2">
          <Text className="text-lg font-bold text-[#fe6c44]  ">
            Delivery to:
          </Text>
          <TouchableOpacity
            onPress={() =>
              navigation.navigate("Location")
            }
          >
            <View className="flex-row items-center space-x-1 py-2">
              <MapPinIcon color="#fe6c44" size={20} />
              <Text className="font-bold">
                {user && user.geoAddress
                  ? user.geoAddress[user.geoAddress.length - 1].address
                  : "Set location"}
              </Text>
            </View>
          </TouchableOpacity>
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
