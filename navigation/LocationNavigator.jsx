import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import LocationSetScreen from "../screens/Location/LocationSetScreen";
import YourLocation from "../screens/Location/YourLocation";

const LocationStack = createNativeStackNavigator();

const LocationNavigator = () => {
  return (
    <LocationStack.Navigator screenOptions={{ headerShown: false }}>
      <LocationStack.Screen
          options={{ unmountOnBlur: true }}

        name="LocationSetScreen"
        component={LocationSetScreen}
      />
      <LocationStack.Screen
        unmountOnBlur={true}
        options={{ unmountOnBlur: true }}
        name="YourLocation"
        component={YourLocation}
      />
    </LocationStack.Navigator>
  );
};

export default LocationNavigator;
