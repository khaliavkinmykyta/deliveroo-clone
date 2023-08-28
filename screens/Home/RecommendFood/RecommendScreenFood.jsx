import {
  View,
  Text,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { collection, getDocs, onSnapshot } from "firebase/firestore";
import FoodRow from "../../../components/FoodRow";
import { db } from "../../../firebase";
import CategoriesList from "../../../components/CategoriesList";
import BackButton from "../../../components/BackButton";
import BasketIcon from "../../../components/Basket/BasketIcon";

const PopularScreenFood = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = React.useState([]);

  useEffect(() => {
    const foodItemsCollectionRef = collection(db, "recommendFoodItem");

    getDocs(foodItemsCollectionRef)
      .then((querySnapshot) => {
        const foodItemsData = [];
        console.log("recommendFoodItem  food  USE EFFECT");

        querySnapshot.forEach((foodItemDoc) => {
          const foodItemData = foodItemDoc.data();
          const foodItem = {
            id: foodItemData.id,
            unicId: foodItemData.unicId,
            name: foodItemData.name,
            docName: foodItemData.docName,
            price: foodItemData.price,
            img: foodItemData.img,
            description: foodItemData.description,
          };
          foodItemsData.push(foodItem);
        });

        // Проверяем, если коллекция пуста, устанавливаем empty в true
        console.log(foodItemsData);
        setFoodItems(foodItemsData);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });

    // Заметьте, что мы убрали подписку и return из этого блока
  }, []);

  return (
    <SafeAreaView className="bg-white flex-1">
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-2 ">
        <BackButton />
        <Text className="text-xl font-bold text-black">Details</Text>
        <BasketIcon />
      </View>

      {/* CategoriesList */}
      <CategoriesList />

      {/* NAME OF CATEGORY */}
      <Text className="font-bold text-2xl my-2 text-center">Recommend</Text>

      {/* Заменили ScrollView на FlatList */}
      <FlatList
        data={foodItems}
        keyExtractor={(item) => item.unicId.toString()} 
        renderItem={({ item }) => (
          <FoodRow item={item} key={item.unicId} test={item.uid} />
        )}
      />
    </SafeAreaView>
  );
};

export default PopularScreenFood;
