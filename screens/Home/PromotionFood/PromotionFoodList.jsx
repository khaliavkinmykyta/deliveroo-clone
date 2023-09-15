import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import { onSnapshot, query, collection, limit } from "firebase/firestore"; // Изменили импорты
import { db } from "../../../firebase";
import { useNavigation } from "@react-navigation/native";
import { PlusCircleIcon } from "react-native-heroicons/outline";
import { v4 as uuidv4 } from "uuid";
import PromotionFoodItem from "./PromotionFoodItem";

const PromotionFoodList = () => {
  const [promotionFoodItems, setPromotionFoodItems] = useState([]);
  const navigation = useNavigation();

  const goToFoodCategory = () => {
    navigation.navigate("PromotionScreenFood");
  };

  const fetchPromotionFood = useCallback(async () => {
    console.log("fetchPromotionFood promotion list");

    try {
      const promotionFoodRef = collection(db, "promotionFoodItem");
      const q = query(promotionFoodRef, limit(5));
      // Используем onSnapshot для подписки на изменения
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const promotionFoodData = querySnapshot.docs.map((doc) => doc.data());
        setPromotionFoodItems(promotionFoodData);
      });

      return unsubscribe; // Возвращаем функцию отписки
    } catch (error) {
      console.error("Error fetching promo food items:", error);
    }
  }, []);

  useEffect(() => {
    "UE promotion list";

    let unsubscribe = fetchPromotionFood();
    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [fetchPromotionFood]);

  return (
    <View className="">
      {/* HEADER TAB */}
      <View className="flex-row justify-between items-center mt-4">
        <Text className="font-bold text-lg">Promotion Food</Text>
        <TouchableOpacity>
          <Text className="text-[#fe6c44]" onPress={goToFoodCategory}>
            View all
          </Text>
        </TouchableOpacity>
      </View>

      {/* HEADER TAB DESCRIPTION */}
      <Text className="text-xs text-gray-500">Best promotional offers</Text>

      {/* PROMOTION FOOD LIST ON HOME SCREEN */}
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
        }}
      >
        {/* PROMOTION FOOD MAPPING */}
        {promotionFoodItems.map((item) => (
          <PromotionFoodItem key={uuidv4()} item={item} />
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

export default PromotionFoodList;
