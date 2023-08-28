import { View, Text } from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation, useRoute } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";
import CategoriesList from "../../components/CategoriesList";
import FoodRow from "../../components/FoodRow";

import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import { ScrollView } from "react-native-gesture-handler";

const FoodCategoryScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = React.useState([]);
  const route = useRoute();

  const { imgUrl, name, docName } = route.params;



  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  useEffect(() => {
    console.log('hi')
    // const categoryId = name.toLowerCase();
    // const categoryDocRef = doc(db, "categories", categoryId);
        const categoryDocRef = doc(db, "categories", docName);

    const foodItemsCollectionRef = collection(categoryDocRef, "foodItem");

    getDocs(foodItemsCollectionRef)
      .then((querySnapshot) => {
        const foodItemsData = [];

        querySnapshot.forEach((foodItemDoc) => {
          const foodItemData = foodItemDoc.data();


          const foodItem = {
            displaySequence: foodItemData.displaySequence,
            docName: foodItemDoc.id,
            categoryId: foodItemData.categoryId,

            name: foodItemData.name,
            description: foodItemData.description,
            price: foodItemData.price,
            img: foodItemData.img,
          };
          foodItemsData.push(foodItem);
        });
        console.log("FoodCatScren - maybe this is");
        setFoodItems(foodItemsData);
      })
      .catch((error) => {
        console.error("Error fetching food items:", error);
      });
  }, [docName]);

  return (
    <SafeAreaView className="bg-white flex-1">
      <ScrollView>
        {/* HEADER */}
        <View className="flex-row justify-between items-center px-2 ">
          <BackButton />
          <Text className="text-xl font-bold text-black">Details</Text>
          <BasketIcon />
        </View>

        {/* CategoriesList */}
        <CategoriesList/>

        {/* NAME OF CATEGORY */}
        <Text className="font-bold text-2xl my-2 text-center">{name}</Text>

        {/* Mapping current foodItem from selected category */}
        {foodItems.map((foodItem) => (
          <FoodRow item={foodItem} key={foodItem.docName} test={foodItem.uid} />
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};

export default FoodCategoryScreen;
