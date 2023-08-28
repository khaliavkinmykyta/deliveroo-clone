import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { MinusIcon, PlusIcon } from "react-native-heroicons/solid";

const FoodPromotionRow = ({ item, categoryId, test }) => {
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

        <View className='flex-1 space-y-5'>
          <View className="py-2" style={styles.pastButtonContainer}>
            <Text className={"text-base  font-bold text-[#fe6c44] line-through "}>
              £{item.price}
            </Text>
          </View>
          <View className="py-2" style={styles.addButtonContainer}>
            <Text className={"text-base  font-bold text-white"}>
              £{(item.price*0.5).toFixed(2)}
            </Text>
          </View>
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
    marginTop: 5,
  },
  pastButtonContainer: {
    backgroundColor: "white",
    color: "#fe6c44",
    borderWidth: 1,
    borderColor: "#fe6c44",
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
    flex: 1,
    flexDirection: "row",
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

export default FoodPromotionRow;
