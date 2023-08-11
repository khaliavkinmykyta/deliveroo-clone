import { View, Text, TouchableOpacity } from "react-native";
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

const PopularScreenFood = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = React.useState([]);
  const route = useRoute();

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const foodItemsCollectionRef = collection(db, "popularFoodItem");

    // Подписываемся на изменения в подколлекции foodItem
    const unsubscribe = onSnapshot(foodItemsCollectionRef, (snapshot) => {
      const foodItemsData = [];

      snapshot.forEach((foodItemDoc) => {
        const foodItemData = foodItemDoc.data();
        const foodItem = {
          id: foodItemData.id,
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
    });

    // Удаляем подписку при очистке компонента
    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <SafeAreaView className="">
      <View className="flex-row justify-between items-center px-2">
        <TouchableOpacity
          onPress={navigation.goBack}
          className=" border-[#cecfd2] p-1"
          style={{
            borderColor: "#cecfd2",
            borderWidth: 1,
            borderRadius: "10%",
          }}
        >
          <ChevronLeftIcon color="#cecfd2" />
        </TouchableOpacity>
        <Text className="text-xl font-bold text-black">Details</Text>
        <View className="bg-[#ffebe5] rounded-md p-2">
          <ShoppingBagIcon color={"black"} className="z-50" />
          <View className="absolute top-1 right-1 rounded-md bg-[#000000] px-1 ">
            <Text className=" text-white font-bold">0</Text>
          </View>
        </View>
      </View>
      <CategoriesList />

      <Text className="font-bold text-2xl my-2 text-center">Popular</Text>

      {foodItems.map((foodItem) => (
        <React.Fragment key={foodItem.id}>
          {console.log(foodItem.description)}
          <FoodRow item={foodItem} />
        </React.Fragment>
      ))}
    </SafeAreaView>
  );
};

export default PopularScreenFood;
