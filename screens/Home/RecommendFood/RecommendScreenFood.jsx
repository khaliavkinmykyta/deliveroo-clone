import { View, Text, FlatList } from "react-native";
import React, { useEffect } from "react";
import { SafeAreaView } from "react-native-safe-area-context";

import { collection, getDocs } from "firebase/firestore";
import FoodRow from "../../../components/FoodRow";
import { db } from "../../../firebase";
import CategoriesList from "../../../components/CategoriesList";
import BackButton from "../../../components/BackButton";
import BasketIcon from "../../../components/Basket/BasketIcon";

const PopularScreenFood = () => {
  const [foodItems, setFoodItems] = React.useState([]);

  useEffect(() => {
    const foodItemsCollectionRef = collection(db, "recommendFoodItem");

    getDocs(foodItemsCollectionRef)
      .then((querySnapshot) => {
        const foodItemsData = [];
        console.log("recommendFoodItem  food  USE EFFECT");

        querySnapshot.forEach((foodItemDoc) => {
          const foodItemData = foodItemDoc.data();
          (foodItemData.docName = foodItemDoc.id),
            foodItemsData.push(foodItemData);
        });

        // Проверяем, если коллекция пуста, устанавливаем empty в true
        console.log(foodItemsData);
        setFoodItems(foodItemsData);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1 px-4 py-2">
      {/* HEADER */}
      <View className="flex-row justify-between items-center">
        <BackButton />
        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
      </View>

      {/* CategoriesList */}
      <CategoriesList />

      {/* NAME OF CATEGORY */}
      <Text className="font-bold text-2xl my-2 text-center">Recommend</Text>

      <FlatList
        data={foodItems.sort((a, b) => a.displaySequence - b.displaySequence)}
        keyExtractor={(item) => item.docName}
        renderItem={({ item }) => <FoodRow item={item} key={item.docName} />}
      />
    </SafeAreaView>
  );
};

export default PopularScreenFood;
