import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useLayoutEffect } from "react";
import { useNavigation } from "@react-navigation/native";

const WelcomeScreen = () => {
  //clear header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  return (
    <View className="bg-[#fe6c44] h-full">
      <Image
        className="h-60 w-full mt-20 "
        source={{
          uri: "https://cdni.iconscout.com/illustration/premium/thumb/food-delivery-service-5969300-4948872.png",
        }}
      />
      <View className="mx-4 mt-52  space-y-4 w-3/4 m-auto">
        <TouchableOpacity className="bg-slate-50 rounded-xl h-12" onPress={() => navigation.navigate('Home')}>
          <Text className="m-auto text-[#fe6c44] font-bold text-lg">
            Sign In
          </Text>
        </TouchableOpacity>
        <TouchableOpacity className="bg-slate-50 rounded-xl h-12" onPress={() => navigation.navigate('Home')}>
          <Text className="m-auto text-[#fe6c44] font-bold text-lg  ">
            Sign On
          </Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default WelcomeScreen;
