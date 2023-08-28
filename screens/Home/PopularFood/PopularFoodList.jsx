import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { collection } from "firebase/firestore";
import PopularFoodItem from "./PopularFoodItem";
import { useNavigation } from "@react-navigation/native";
import {
  PlusCircleIcon,
} from "react-native-heroicons/outline";
import { v4 as uuidv4 } from 'uuid';


const PopularFoodList = () => {
  const [popularFoodItems, setPopularFoodItems] = useState([]);
  const navigation = useNavigation();

  const goToFoodCategory = () => {
    navigation.navigate("PopularScreenFood");
  };

  // FETCH POPULAR FOOD
  useEffect(() => {
    const popularFoodRef = collection(db, "popularFoodItem");

    // Limit the query to 5 elements
    const q = query(popularFoodRef, limit(5));

    getDocs(q)
      .then((querySnapshot) => {
        console.log("Popular food list USE EFFECT");
        const popularFoodData = [];
        querySnapshot.forEach((doc) => {
          popularFoodData.push({ id: doc.id, ...doc.data() });
        });
        setPopularFoodItems(popularFoodData);
      })
      .catch((error) => {
        console.error("Error fetching popular food items:", error);
      });
  }, []);

  return (
    <View className="px-2">
      {/* HEADER TAB */}
      <View className="flex-row justify-between items-center mt-4">
        <Text className="font-bold text-lg">Popular Food</Text>
        <TouchableOpacity>
          <Text className="text-[#fe6c44]" onPress={goToFoodCategory}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {/* HEADER TAB DESCRIPTION */}
      <Text className="text-xs text-gray-500">Top-10 dishes for this week</Text>

      {/* POPULAR FOOD LIST ON HOME SCREEN */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 0,
          paddingTop: 10,
        }}
      >
        {/* POPULAR FOOD MAPPING */}
        {popularFoodItems.map((item) => (
          <PopularFoodItem key={uuidv4()} item={item} />
        ))}
        {/* VIEW ALL LAST CARD */}
        <TouchableOpacity
          className="items-center justify-center w-28 rounded-xl"
          onPress={goToFoodCategory}
        >
          <PlusCircleIcon size={40} color={"#fe6c44"} strokeWidth={1} />
        </TouchableOpacity>
      </ScrollView>
    </View>
  );
};

export default PopularFoodList;
