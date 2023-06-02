import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import AuthScreen from "../screens/Auth/AuthScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import FoodCategoryScreen from "../screens/FoodCategory/FoodCategoryScreen";
import FoodScreen from "../screens/FoodItem/FoodScreen";
import SignInScreen from "../screens/Auth/SignInScreen";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FoodCategory" component={FoodCategoryScreen}/>
      <HomeStack.Screen name="FoodScreen" component={FoodScreen}/>
    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
