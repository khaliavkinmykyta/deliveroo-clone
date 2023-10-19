import { View, Text, TextInput, Image, TouchableOpacity } from "react-native";
import React, { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from "react-native-heroicons/outline";
import { collectionGroup, getDocs, query, where } from "firebase/firestore";
import { db } from "../../firebase";
import { FlatList } from "react-native-gesture-handler";
import { useNavigation } from "@react-navigation/native";
import { v4 as uuidv4 } from "uuid";


const Search = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const navigation = useNavigation();
  useEffect(() => {
    const searchFoodItems = async () => {
      const q = query(
        collectionGroup(db, "foodItem"),
        where("nameSearchFilter", ">=", searchTerm),
        where("nameSearchFilter", "<", searchTerm + "z")
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
      <View className="bg-gray-100 rounded-xl my-4 ">
        <View className="flex-row items-center space-x-2  ">
          <View className="flex-row flex-1 space-x-2 p-2">
            <MagnifyingGlassIcon color="black" />
            <TextInput
              placeholder="Search food items..."
              // value={searchTerm}
              autoCapitalize="none"
              onChangeText={(text) => {
                setSearchTerm(text.toLowerCase());
              }}
            />
          </View>
        </View>
      </View>
      <View className="relative" style={{ zIndex: 2 }}>
        <View className="absolute z-100 w-full">
          <FlatList
            data={searchResults}
            keyExtractor={() => uuidv4()}
            renderItem={({ item }) => (
              <TouchableOpacity
              activeOpacity={0.90}
                onPress={() => {
                  navigation.navigate("FoodScreen", {
                    item: item,
                    id: item.docName,
                  });
                }}
              >
                <View className="flex-row justify-between items-center bg-zinc-100 p-2 ">
                  <View className="flex-row gap-x-2">
                    <Image
                      source={{ uri: item.img }}
                      className="h-5 w-5 rounded-full"
                    />
                    <Text className="">{item.name.length > 30 ? `${item.name.slice(0, 30)}...` : item.name}</Text>
                  </View>
                  <Text className="font-bold">£{item.price}</Text>
                </View>
              </TouchableOpacity>
            )}
          />
        </View>
      </View>
    </>
  );
};

export default Search;
