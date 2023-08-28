import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { getDocs, limit, query } from "firebase/firestore";
import { db } from "../../../firebase";
import { collection } from "firebase/firestore";
import RecommendFoodItem from "./RecommendFoodItem";
import { v4 as uuidv4 } from "uuid";
import { useNavigation } from "@react-navigation/native";
import { PlusCircleIcon } from "react-native-heroicons/outline";

const RecommendFoodList = () => {
  const [recommendFoodItems, setRecommendFoodItems] = useState([]);
  const navigation = useNavigation();

  useEffect(() => {
    const recommendFoodRef = collection(db, "recommendFoodItem");

    // Limit the query to 5 elements
    const q = query(recommendFoodRef, limit(5));

    getDocs(q)
      .then((querySnapshot) => {
        console.log("recommendFoodData food list USE EFFECT");
        const recommendFoodData = [];
        querySnapshot.forEach((doc) => {
          recommendFoodData.push({ id: doc.id, ...doc.data() });
        });
        setRecommendFoodItems(recommendFoodData);
      })
      .catch((error) => {
        console.error("Error fetching recommendFoodData food items:", error);
      });
  }, []);

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
