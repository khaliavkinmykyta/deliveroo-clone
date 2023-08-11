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
import { selectBasketItems } from "../../features/basketSlice";
import { collection, doc, getDocs, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase";

const FoodCategoryScreen = () => {
  const navigation = useNavigation();
  const [foodItems, setFoodItems] = React.useState([]);
  const route = useRoute();
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
    

      setFoodItems(foodItemsData);
    });

    // Удаляем подписку при очистке компонента
    return () => {
      unsubscribe();
    };
  }, [foodItems]);

  const items = useSelector(selectBasketItems);

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
            <Text className=" text-white font-bold">{items.length}</Text>
          </View>
        </View>
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

      {/* <FoodRow
        title="Popular Food"
        description="Paid placement from out partners"
        featuredCategory={"featured"}
        id={"123"}
      />
      <FoodRow
        title="Popular Food"
        description="Paid placement from out partners"
        featuredCategory={"featured"}
        id={"123"}
      /> */}
      {/* <FoodRow /> */}
    </SafeAreaView>
  );
};

export default FoodCategoryScreen;
