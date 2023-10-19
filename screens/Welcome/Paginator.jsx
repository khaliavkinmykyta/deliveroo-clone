import { View, Animated, useWindowDimensions } from "react-native";
import React from "react";

const Paginator = ({ data, scrollX }) => {
  const { width } = useWindowDimensions();

  return (
    <View className="flex-row mt-5">
      {data.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const dotWidth = scrollX.interpolate({
          inputRange,
          outputRange: [10, 20, 10],
          extrapolate: "clamp",
        });
        const opacity = scrollX.interpolate({
          inputRange,
          outputRange: [0.3, 1, 0.3],
          extrapolate: "clamp",
        });
        return (
          <Animated.View
            className="bg-white rounded-full h-3 m-1"
            style={{ width: dotWidth, opacity }}
            key={i.toString()}
          ></Animated.View>
        );
      })}
    </View>
  );
};

export default Paginator;
