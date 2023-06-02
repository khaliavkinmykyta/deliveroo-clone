import { View, Text, TouchableOpacity } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const WalletScreen = () => {
    const navigation = useNavigation();

  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate("Home")}>
        <Text>WalletScreen</Text>
      </TouchableOpacity>
    </View>
  );
};

export default WalletScreen;
