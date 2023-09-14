import React, { useEffect } from "react";
import { ActivityIndicator, View } from "react-native";

export default function LoadingFood() {
  useEffect(() => {
    console.log("EU loadingFood loader");
  }, []);
  return (
    <View
      className="flex-1 justify-around  items-center"
      style={{ backgroundColor: "rgba(0, 0, 0" }}
    >
      <ActivityIndicator color="black" size="large" />
    </View>
  );
}
