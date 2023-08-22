import { View, Text, TextInput, Image } from "react-native";
import React, { useEffect, useState } from "react";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
} from "react-native-heroicons/outline";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { FlatList } from "react-native-gesture-handler";

const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  useEffect(() => {
    const searchFoodItems = async () => {
      const q = query(
        collectionGroup(db, "foodItem"),
        where("name", ">=", searchTerm),
        where("name", "<", searchTerm + "z")
      );

      try {
        const querySnapshot = await getDocs(q);

        const results = [];
        querySnapshot.forEach((doc) => {
          results.push(doc.data());
        });

        setSearchResults(results);
        console.log("Search results:", results);
      } catch (error) {
        console.error("Error searching for food items:", error);
      }
    };

    if (searchTerm) {
      searchFoodItems();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);
  return (
    <>
      <View className="bg-gray-100 rounded-xl px-2 mx-2 my-4">
        <View className="flex-row items-center space-x-2  ">
          <View className="flex-row flex-1 space-x-2 p-2">
            <MagnifyingGlassIcon color="black" />
            <TextInput
              placeholder="Search food items..."
              value={searchTerm}
              onChangeText={(text) => setSearchTerm(text)}
            />
          </View>
          <AdjustmentsVerticalIcon color="black" />
        </View>
      </View>
      <View className="mx-2">
        <FlatList
          data={searchResults}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View className="flex-row justify-between items-center bg-zinc-100 p-2">
              <View className="flex-row gap-x-2">
                <Image
                  source={{ uri: item.img }}
                  className="h-5 w-5 rounded-full"
                />
                <Text className="">{item.name}</Text>
              </View>
              <Text className="font-bold">${item.price}</Text>
            </View>
          )}
        />
      </View>
    </>
  );
};

export default Search;
