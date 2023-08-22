import {
  View,
  Text,
  StyleSheet,
  Touchable,
  TouchableOpacity,
  Animated,
} from "react-native";
import React, { useEffect, useRef } from "react";
import Svg, { G, Circle } from "react-native-svg";
import {
  AdjustmentsVerticalIcon,
  MagnifyingGlassIcon,
  ChevronDownIcon,
  Bars3CenterLeftIcon,
} from "react-native-heroicons/outline";

const NextButton = ({ scrollTo }) => {
  return (
    <View>
      <TouchableOpacity className="bg-white border border-white rounded-xl px-8 py-4" onPress={scrollTo}>
        <Text className="text-[#fe6c44] font-bold text-2xl">Next</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContainer: "center",
    alignItems: "center",
  },
});

export default NextButton;
