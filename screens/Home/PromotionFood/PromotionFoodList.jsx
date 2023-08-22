

import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../../firebase";
import { collection, addDoc } from "firebase/firestore";
import PopularFoodItem from "../PopularFood/PopularFoodItem";

const PromotionFoodList = () => {
  const [recommendFoodItems, setRecommendFoodItems] = useState([]);

  useEffect(() => {
    const recommendFoodRef = collection(db, "recommendFoodItem");

    getDocs(recommendFoodRef)
      .then((querySnapshot) => {
        console.log('RecFoodList UE')
        const recommendFoodData = [];
        querySnapshot.forEach((doc) => {
          recommendFoodData.push({ id: doc.id, ...doc.data() });
        });
        console.log("REC FOOD LIST UE")

        setRecommendFoodItems(recommendFoodData);
      })
      .catch((error) => {
        console.error("Error fetching popular food items:", error);
      });
  }, []);

  return (
    <View>
      <View className="flex-row justify-between items-center mt-4 px-2 ">
        <Text className="font-bold text-lg">Рекомендація їжа</Text>
        <Text className="text-[#fe6c44]">Показати усе</Text>
      </View>
      <Text className="text-xs px-2 text-gray-500">
        Топ-10 позицій за цей тиждень
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
          <PopularFoodItem key={item.id} item={item} />
        ))}
      </ScrollView>
    </View>
  );
};

export default PromotionFoodList;
