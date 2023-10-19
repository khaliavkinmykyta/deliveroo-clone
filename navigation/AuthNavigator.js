import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import SignOnScreen from "../screens/Auth/SignOnScreen";
import WelcomeScreen from "../screens/Welcome/WelcomeScreen";
import ForgotPassword from "../screens/Auth/ForgotPassword";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>

        <AuthStack.Screen name="WelcomeScreen" options={{ headerShown: false }} component={WelcomeScreen} />
        <AuthStack.Screen name="SignIn"  options={{ headerShown: false }} component={SignInScreen} />
        <AuthStack.Screen name="SignOn"  options={{ headerShown: false }} component={SignOnScreen} />
        <AuthStack.Screen name="ForgotPassword"  options={{ headerShown: false }} component={ForgotPassword} />

      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
