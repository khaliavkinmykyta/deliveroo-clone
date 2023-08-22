import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";

const FoodRow = ({ item, categoryId, test }) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={() => {
        navigation.navigate("FoodScreen", {
          item: item,
          id: item.id,
        });
      }}
    >
      {/* ITEM ROW */}
      <View style={styles.itemContainer}>
        {/* LEFT SIDE */}
        <View style={styles.leftSide}>
          <View style={styles.imageContainer}>
            <Image
              source={{
                uri: item.img,
              }}
              style={styles.image}
            />
          </View>

          <View style={styles.textContainer}>
            <Text style={styles.name}>{item.name}</Text>
            <Text style={styles.description}>
              {item.description.length >= 50
                ? item.description.substring(0, 100) + " read more..."
                : item.description}
            </Text>
          </View>
        </View>

        <View className="py-2" style={styles.addButtonContainer}>
          <Text className={"text-lg font-bold text-white"}>${item.price}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F4F4F4",
    marginHorizontal: 20,
    marginVertical: 4,
    borderRadius: 8,
  },
  itemContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    padding: 12,
    gap: 20,
  },
  leftSide: {
    flexDirection: "row",
    alignItems: "center",
    flex: 3,
  },
  imageContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    overflow: "hidden",
    marginRight: 12,
  },
  image: {
    width: "100%",
    height: "100%",
  },
  textContainer: {
    flex: 1,
  },
  name: {
    fontWeight: "bold",
  },
  description: {
    color: "#888",
  },
  addButtonContainer: {
    backgroundColor: "#fe6c44",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
  },
});

export default FoodRow;
