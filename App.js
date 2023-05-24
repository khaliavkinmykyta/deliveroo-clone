import { StatusBar } from "expo-status-bar";
import { StyleSheet, Text, View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/HomeScreen";
import FoodScreen from "./screens/FoodScreen";
import { Provider } from "react-redux";
import { store } from "./store";
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="FoodScreen" component={FoodScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
