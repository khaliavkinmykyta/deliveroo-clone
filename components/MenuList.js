import { View, Text, ScrollView } from "react-native";
import React, { useEffect, useState } from "react";
import MenuCard from "./MenuCard";
import { db } from "../firebase";
import { doc, getDoc, getDocs } from "firebase/firestore";
import { collection, addDoc } from "firebase/firestore";

const MenuList = () => {
  const [cat, setCat] = useState([]);

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

    // console.log("test123");

    // async function fetchData() {
    //   const docRef = doc(db, "category food", "category food");

    //   const docSnap = await getDoc(docRef);

    //   if (docSnap.exists()) {
    //     console.log("Document data:", docSnap.data());

    //     setCategories(docSnap.data());

    //     console.log(categories);
    //   } else {
    //     // docSnap.data() will be undefined in this case
    //     console.log("No such document!");
    //   }
    // }
    // fetchData();
  }, []);
  // const categoriesArray = Object.entries(categories);
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
        <MenuCard imgUrl={item.image} title={item.title}  key={item.image} />
      ))}

      {/* <MenuCard
        imgUrl={
          "https://www.thespruceeats.com/thmb/jSsI2w8FkyTDrJhQkYJ5d0HS2uE=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/green-salad-recipe-ensalada-verde-3083556-hero-01-256ac7f4162b45e5a1f82a5234a0708c.jpg"
        }
        title={"Testing"}
      />
      <MenuCard
        imgUrl={
          "https://www.tastingtable.com/img/gallery/what-makes-restaurant-burgers-taste-different-from-homemade-burgers-upgrade/l-intro-1662064407.jpg"
        }
        title={"Testing"}
      />
      <MenuCard
        imgUrl={
          "https://www.thespruceeats.com/thmb/PKK63OuoTMaezzPYvaq2fy-TB5Y=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/bar101-cocktails-504754220-580e83415f9b58564cf470b9.jpg"
        }
        title={"Testing"}
      />
      <MenuCard
        imgUrl={
          "https://cdn.britannica.com/50/80550-050-5D392AC7/Scoops-kinds-ice-cream.jpg"
        }
        title={"Testing"}
      />
      <MenuCard
        imgUrl={
          "https://hips.hearstapps.com/hmg-prod/images/classic-cheese-pizza-recipe-2-64429a0cb408b.jpg?crop=0.6666666666666667xw:1xh;center,top&resize=1200:*"
        }
        title={"Testing"}
      /> */}
    </ScrollView>
  );
};

export default MenuList;
