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
    // Получение данных из коллекции "categories"
    async function fetchCategories() {
      try {
        const categoriesRef = collection(db, "categories");
        const snapshot = await getDocs(categoriesRef);
        const categories = [];
        snapshot.forEach((doc) => {
          const category = doc.data();
          categories.push(category);
        });

        return setCat(categories);
      } catch (error) {
        console.error("Ошибка при получении категорий:", error);
        return [];
      }
    }

    // Пример использования функции для получения категорий
    fetchCategories();

  
  }, []);

  const handleSetCategory = async (categoryId) => {
    setActiveCategory(categoryId);
  
    const categoryDocRef = doc(db, "categories", categoryId);
    const foodItemsCollectionRef = collection(categoryDocRef, "foodItem");
  
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
      if (foodItemsData.length === 0) {
        setEmpty(true);
      } else {
        setEmpty(false);
      }
  
      setFoodItems(foodItemsData);
    });
  
    // Удаляем подписку при очистке компонента
    return () => {
      unsubscribe();
    };
  };
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
        <MenuCard imgUrl={item.img} name={item.name}  key={item.id}/>
      ))}

   
    </ScrollView>
  );
};

export default CategoriesList;
