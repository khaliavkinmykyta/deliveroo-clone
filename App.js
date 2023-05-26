import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home/HomeScreen";
import FoodScreen from "./screens/FoodItem/FoodScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthScreen from "./screens/Auth/AuthScreen";
import FoodCategoryScreen from "./screens/FoodCategoryScreen/FoodCategoryScreen";

// create our Stack for React Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="FoodScreen" component={FoodScreen} />
          <Stack.Screen name="FoodCategory" component={FoodCategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
