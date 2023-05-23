import { View, Text, Image, ScrollView } from "react-native";
import React from "react";
import { ArrowRightIcon } from "react-native-heroicons/outline";
import FoodFeatured from "./FoodFeatured";

const FeaturedRow = ({ id, title, description, featuredCategory }) => {
  return (
    <View>
      <View className="flex-row justify-between items-center mt-4 px-2 ">
        <Text className="font-bold text-lg">{title}</Text>
        <Text className="text-[#fe6c44]">Show all</Text>
      </View>
      <Text className="text-xs px-2 text-gray-500">{description}</Text>
      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={{
          paddingHorizontal: 10,
          paddingTop: 10,
        }}
      >
        {/* Food Banners */}
        <FoodFeatured
          id="111"
          imgUrl="https://s.06452.com.ua/section/catalogproducts/upload/images/catalog/products/000/006/499/403720_5ff73003e7ac8.png"
          nameFood="Test Set"
          descFood="big burger, potato fry, coca-cola 0.5"
          price="$3,49"
        />
         <FoodFeatured
          id="111"
          imgUrl="https://sud.ua/uploads/news/2022/09/19/c681fe772cdbd69bc830d142e7d3e9357ce98d0b.png"
          nameFood="Test Set"
          descFood="big burger, potato fry, coca-cola 0.5"
          price="$3,49"
        />
         <FoodFeatured
          id="111"
          imgUrl="https://s.06452.com.ua/section/catalogproducts/upload/images/catalog/products/000/006/499/403720_5ff73003e7ac8.png"
          nameFood="Test Set"
          descFood="big burger, potato fry, coca-cola 0.5"
          price="$3,49"
        />
         <FoodFeatured
          id="111"
          imgUrl="https://s.06452.com.ua/section/catalogproducts/upload/images/catalog/products/000/006/499/403720_5ff73003e7ac8.png"
          nameFood="Test Set"
          descFood="big burger, potato fry, coca-cola 0.5"
          price="$3,49"
        />
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
