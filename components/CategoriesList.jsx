import { View, ScrollView } from "react-native";
import React, { useCallback, useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { db } from "../firebase";
import { getDocs, onSnapshot } from "firebase/firestore";
import { collection } from "firebase/firestore";

const CategoriesList = () => {
  const [cat, setCat] = useState([]);

  const fetchCategories = useCallback(async () => {
    try {
      const categoriesRef = collection(db, "categories");
      const querySnapshot = await getDocs(categoriesRef);

      const categories = querySnapshot.docs.map((doc) => {
        const data = doc.data();
        return { ...data, id: doc.id };
      });

      setCat(categories);

      // Создаем подписку на изменения и возвращаем функцию отписки
      const unsubscribe = onSnapshot(categoriesRef, (snapshot) => {
        const updatedCategories = snapshot.docs.map((doc) => {
          const data = doc.data();
          return { ...data, id: doc.id };
        });
        setCat(updatedCategories);
      });

      return unsubscribe; // Возвращаем функцию отписки
    } catch (error) {
      console.error("Error when receiving categories:", error);
    }
  }, []);

  useEffect(() => {
    console.log("EU cat.list");

    let unsubscribe = fetchCategories();

    return () => {
      if (unsubscribe && typeof unsubscribe === "function") {
        unsubscribe();
      }
    };
  }, [fetchCategories]);

  return (
    // HORIZONTAL Scroll View Setting
    <View className="">
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingTop: 10,
        }}
      >
        {/* Mapping our categories to render each item in MenuCard */}
        {cat
          ?.sort((a, b) => a.displaySequence - b.displaySequence)
          .map((item) => (
            <MenuCard item={item} key={item.id} />
          ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesList;
