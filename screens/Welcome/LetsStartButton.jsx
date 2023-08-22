import { View, Text, TouchableOpacity, Animated } from "react-native";
import React, { useEffect, useState } from "react";

const LetsStartButton = ({scrollToEnd}) => {
  const [animation] = useState(new Animated.Value(0));

  const scale = animation.interpolate({
    inputRange: [0, 1],
    outputRange: [0.8, 1],
  });
  const animatedStyle = {
    transform: [{ scale }],
  };

  useEffect(() => {
    Animated.timing(animation, {
      toValue: 1,
      duration: 500,
      useNativeDriver: true,
    }).start();
  }, []);
  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity className="bg-[#fe6c44] border border-white px-8 py-4 rounded-xl" onPress={scrollToEnd}>
        <Text className="font-bold text-2xl text-white">Let's get started</Text>
      </TouchableOpacity>
    </Animated.View>
  );
};

export default LetsStartButton;
