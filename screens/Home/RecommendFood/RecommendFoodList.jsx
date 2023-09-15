import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { getDocs, limit, onSnapshot, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { collection } from "firebase/firestore";
import RecommendFoodItem from "./RecommendFoodItem";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import { PlusCircleIcon } from "react-native-heroicons/outline";

const RecommendFoodList = () => {
  const [recommendFoodItems, setRecommendFoodItems] = useState([]);
  const navigation = useNavigation();

  const fetchRecommendFood = useCallback(async () => {
    console.log("fetchRecommendFood promotion list");

    try {
      const recommendFoodRef = collection(db, "recommendFoodItem");
      const q = query(recommendFoodRef, limit(5));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const recommendFoodData = querySnapshot.docs.map((doc) => doc.data());
        setRecommendFoodItems(recommendFoodData);
      });

      return unsubscribe; // Возвращаем функцию отписки
    } catch (error) {
      console.error("Error fetching rec food items:", error);
    }
  }, []);

  useEffect(() => {
    "UE rec list";

    let unsubscribe = fetchRecommendFood();
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [fetchRecommendFood]);

  const goToFoodCategory = () => {
    navigation.navigate("RecommendScreenFood");
  };

  return (
    <View>
      <View className="flex-row justify-between items-center mt-4 px-2 ">
        <Text className="font-bold text-lg">Recommend food</Text>
        <TouchableOpacity>
          <Text className="text-[#fe6c44]" onPress={goToFoodCategory}>
            View all
          </Text>
        </TouchableOpacity>
      </View>
      <Text className="text-xs px-2 text-gray-500">
        Top-10 recommend dishes
      </Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        {/* Food Banners */}
        {recommendFoodItems.map((item) => (
          <RecommendFoodItem key={uuidv4()} item={item} />
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

export default RecommendFoodList;
