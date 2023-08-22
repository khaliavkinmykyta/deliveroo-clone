import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { db } from "../firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const CategoriesList = () => {
  const [cat, setCat] = useState([]);
  const [handleCategories, setHandleCategories] = React.useState([]);
  const [activeCategory, setActiveCategory] = React.useState(null);
  const [categories, setCategories] = React.useState([]);

  useEffect(() => {
    const categoriesRef = collection(db, "categories");
    getDocs(categoriesRef)
      .then((snapshot) => {
        const categories = [];
        snapshot.forEach((doc) => {
          const category = doc.data();
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
        <MenuCard imgUrl={item.img} name={item.name} key={item.id}/>
      ))}
    </ScrollView>
  );
};

export default CategoriesList;
