import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import SignOnScreen from "../screens/Auth/SignOnScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="WelcomeScreen" component={WelcomeScreen} />
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignOn" component={SignOnScreen} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
