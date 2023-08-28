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
import RecommendScreenFood from "../screens/Home/RecommendFood/RecommendScreenFood";
import PromotionScreenFood from "../screens/Home/PromotionFood/PromotionScreenFood";
import SuccessOrderScreen from "../screens/Basket/SuccessOrderSreen";


const HomeStack = createNativeStackNavigator();

const HomeStackNavigator = () => {
  return (
    <HomeStack.Navigator screenOptions={{ headerShown: false }}>
      <HomeStack.Screen name="Home" component={HomeScreen} />
      <HomeStack.Screen name="FoodCategory" component={FoodCategoryScreen}/>
      <HomeStack.Screen name="FoodScreen" component={FoodScreen}/> 
      <HomeStack.Screen name="PopularScreenFood" component={PopularScreenFood }/>
      <HomeStack.Screen name="RecommendScreenFood" component={RecommendScreenFood}/>
      <HomeStack.Screen name="PromotionScreenFood" component={PromotionScreenFood}/>

      <HomeStack.Screen name="BasketScreen" component={BasketScreen }/>
      <HomeStack.Screen name="SetOrderScreen" component={SetOrderScreen }/>
      <HomeStack.Screen name="SuccessOrderScreen" component={SuccessOrderScreen }/>




    </HomeStack.Navigator>
  );
};

export default HomeStackNavigator;
