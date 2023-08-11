import { View, Text, ScrollView } from "react-native";
import React from "react";
import FoodFeatured from "./FoodFeatured";

const FeaturedRow = ({ id, title, description, featuredCategory, data }, ) => {
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
        {Object.keys(data).map((key) => {
          console.log(key);
          return (
            <FoodFeatured
              key={key} // Добавлен ключ (key) для каждого элемента списка
              id={key}
              imgUrl={data[key].img}
              nameFood={data[key].name}
              descFood={data[key].desc}
              price={data[key].price}
            />
          );
        })}
      </ScrollView>
    </View>
  );
};

export default FeaturedRow;
