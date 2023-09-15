import { View, Text, FlatList } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

import React, { useCallback, useEffect, useState } from "react";
import { useRoute } from "@react-navigation/native";
import CategoriesList from "../../components/CategoriesList";
import FoodRow from "../../components/FoodRow";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import LoadingFood from "../../components/LoadingFood";

const FoodCategoryScreen = () => {
  const [foodItems, setFoodItems] = React.useState([]);
  const [newNameCat, setNewNameCat] = useState("");
  const [loading, setLoading] = useState(false);
  const route = useRoute();

  const { docName } = route.params;

  const fetchFoodItems = useCallback(
    async (categoryDocName) => {
      setLoading(true);

      const categoryDocRef = doc(db, "categories", categoryDocName);
      const foodItemsCollectionRef = collection(categoryDocRef, "foodItem");

      try {
        const querySnapshot = await getDocs(foodItemsCollectionRef);
        const foodItemsData = [];

        querySnapshot.forEach((foodItemDoc) => {
          const foodItemData = foodItemDoc.data();
          (foodItemData.docName = foodItemDoc.id),
            foodItemsData.push(foodItemData);
        });

        setFoodItems(foodItemsData);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching food items:", error);
        setLoading(false);
      }
    },
    [setLoading, setFoodItems]
  );

  // FETCH items
  useEffect(() => {
    fetchFoodItems(docName);
  }, [docName, fetchFoodItems]);

  // FETCH name
  useEffect(() => {
    const getNameOfCategory = async () => {
      const categoryDocRef = doc(db, "categories", docName);

      try {
        const categoryDocSnapshot = await getDoc(categoryDocRef);

        if (categoryDocSnapshot.exists()) {
          const categoryName = categoryDocSnapshot.data().name;
          console.log("Category name is:", categoryName);
          setNewNameCat(categoryName);
        } else {
          console.log("Category document does not exist");
        }
      } catch (error) {
        console.error("Error fetching category data:", error);
      }
    };

    getNameOfCategory();
  }, [docName]);

  return !loading ? (
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
      <Text className="font-bold text-2xl my-2 text-center ">{newNameCat}</Text>

      {/* FLAT LIST items */}
      {foodItems.length > 0 ? (
        <FlatList
          data={foodItems.sort((a, b) => a.displaySequence - b.displaySequence)}
          keyExtractor={(item) => item.docName}
          renderItem={({ item }) => <FoodRow item={item} key={item.docName} />}
        />
      ) : (
        <View className="mx-4 justify-center items-center mt-10 bg-[#fe6c44] px-4 py-2 rounded-xl">
          <Text className="text-2xl text-center text-white font-medium ">
            We don't have any food at this category, sorry!
          </Text>
        </View>
      )}
    </SafeAreaView>
  ) : (
    <LoadingFood />
  );
};

export default FoodCategoryScreen;
