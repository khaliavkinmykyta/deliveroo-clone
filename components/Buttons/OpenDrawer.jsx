import { View, TouchableWithoutFeedback } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";
import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";

const OpenDrawer = () => {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  return (
    <View>
      <TouchableWithoutFeedback onPress={openDrawer}>
        <View className="p-1 border border-zinc-500 rounded-xl">
          <Bars3CenterLeftIcon color="#71717a" size={26} />
        </View>
      </TouchableWithoutFeedback>
    </View>
  );
};

export default OpenDrawer;
