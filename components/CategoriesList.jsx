import { View, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { db } from "../firebase";
import { getDocs } from "firebase/firestore";
import { collection } from "firebase/firestore";

const CategoriesList = ({ onCategoryPress }) => {
  const [cat, setCat] = useState([]);

  useEffect(() => {
    const categoriesRef = collection(db, "categories");
    getDocs(categoriesRef)
      .then((snapshot) => {
        const categories = [];
        snapshot.forEach((doc) => {
          // const category = doc.data();
          // categories.push(category);
          const category = doc.data();
          // Добавляем в объект категории поле id с именем документа
          category.id = doc.id;
          categories.push(category);
        });
        setCat(categories);
      })
      .catch((error) => {
        console.error("Ошибка при получении категорий:", error);
      });
  }, []);

  return (
    // HORIZONTAL Scroll View Setting
    <View>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        {/* Mapping our categories to render each item in MenuCard */}
        {cat?.map((item) => (
          <MenuCard
            imgUrl={item.img}
            docName={item.id}
            name={item.name}
            key={item.id}
            // onPress={() => onCategoryPress(item.name)}
          />
        ))}
      </ScrollView>
    </View>
  );
};

export default CategoriesList;
