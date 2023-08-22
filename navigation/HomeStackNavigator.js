import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "../screens/Home/HomeScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import FoodCategoryScreen from "../screens/FoodCategory/FoodCategoryScreen";
import FoodScreen from "../screens/FoodItem/FoodScreen";
import SignInScreen from "../screens/Auth/SignInScreen";
import PopularScreenFood from "../screens/Home/PopularFood/PopularScreenFood";
import BasketScreen from "../screens/Basket/BasketScreen";
import SetOrderScreen from "../screens/Basket/SetOrderScreen";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FoodCategory" component={FoodCategoryScreen}/>
      <HomeStack.Screen name="FoodScreen" component={FoodScreen}/> 
      <HomeStack.Screen name="PopularScreenFood" component={PopularScreenFood }/>
      <HomeStack.Screen name="BasketScreen" component={BasketScreen }/>
      <HomeStack.Screen name="SetOrderScreen" component={SetOrderScreen }/>



    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
