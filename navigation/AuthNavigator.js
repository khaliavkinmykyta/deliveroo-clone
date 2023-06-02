import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import SignInScreen from "../screens/Auth/SignInScreen";
import { NavigationContainer } from "@react-navigation/native";
import RootNavigator from "./RootNavigator";
import SignOnScreen from "../screens/Auth/SignOnScreen";

const AuthStack = createNativeStackNavigator();

const AuthNavigator = () => {
  return (
    <NavigationContainer>
      <AuthStack.Navigator>
        <AuthStack.Screen name="SignIn" component={SignInScreen} />
        <AuthStack.Screen name="SignOn" component={SignOnScreen} />
        <AuthStack.Screen name="UserLogged" component={RootNavigator} />
      </AuthStack.Navigator>
    </NavigationContainer>
  );
};

export default AuthNavigator;
