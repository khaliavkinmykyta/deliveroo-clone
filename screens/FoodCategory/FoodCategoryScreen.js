import { View, Text, Image, Button, TouchableOpacity } from "react-native";
import React, { useEffect, useLayoutEffect } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesList from "../../components/CategoriesList";
import FoodRow from "../../components/FoodRow";
import {
  ChevronLeftIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { useSelector } from "react-redux";
import { selectBasketItems, selectBasketTotalQuantity } from "../../features/basketSlice";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import BasketIcon from "../../components/Basket/BasketIcon";

const FoodCategoryScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = React.useState([]);
  const route = useRoute();
  const totalQuantity = useSelector(selectBasketTotalQuantity);

  const { imgUrl, name } = route.params;

  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    const categoryId = name.toLowerCase();
    const categoryDocRef = doc(db, "categories", categoryId);
    const foodItemsCollectionRef = collection(categoryDocRef, "foodItem");

  
    getDocs(foodItemsCollectionRef)
      .then((querySnapshot) => {
        const foodItemsData = [];
  
        querySnapshot.forEach((foodItemDoc) => {
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
        console.log('FoodCatScren - maybe this is')
        setFoodItems(foodItemsData);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, []);
  





  return (
    <SafeAreaView className="bg-red-300 ">
      {/* HEADER */}
      <View className="flex-row justify-between items-center px-2 ">
       
        <Text className="text-xl font-bold text-black">Details</Text>
    <BasketIcon/>
      </View>
      <CategoriesList />
      <Text className="font-bold text-2xl my-2 text-center">{name}</Text>

      {/* Mapping current foodItem from selected category */}
      {foodItems.map((foodItem) => (
        <FoodRow
          item={foodItem}
          key={foodItem.id}
          test={foodItem.uid}
          // categoryId={activeCategory}
        />
      ))}

    
    </SafeAreaView>
  );
};

export default FoodCategoryScreen;
