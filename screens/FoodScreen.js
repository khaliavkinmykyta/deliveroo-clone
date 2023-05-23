import { View, Text, ScrollView, TouchableOpacity } from "react-native";
import React, { useLayoutEffect } from "react";
import { useRoute } from "@react-navigation/native";
import { useNavigation } from "@react-navigation/native";

const FoodScreen = () => {
  const {
    params: { id, imgUrl, nameFood, descFood, price },
  } = useRoute();

  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);
  return (
    <ScrollView>
      <Text>{price}</Text>
      <TouchableOpacity className='m-8' onPress={navigation.goBack}>
        <View>
          <Text>PRES BACK</Text>
        </View>
      </TouchableOpacity>
    </ScrollView>
  );
};

export default FoodScreen;
