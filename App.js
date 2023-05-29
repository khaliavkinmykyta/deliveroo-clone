import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import HomeScreen from "./screens/Home/HomeScreen";
import FoodScreen from "./screens/FoodItem/FoodScreen";
import { Provider } from "react-redux";
import { store } from "./store";
import AuthScreen from "./screens/Auth/AuthScreen";
import FoodCategoryScreen from "./screens/FoodCategoryScreen/FoodCategoryScreen";
import WelcomeScreen from "./screens/Welcome/WelcomeScreen";
import SignInScreen from "./screens/Auth/SignInScreen";
import SignOnScreen from "./screens/Auth/SignOnScreen";

// create our Stack for React Navigation
const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <Provider store={store}>
      <NavigationContainer>
        <Stack.Navigator>

          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="Auth" component={AuthScreen} />
          <Stack.Screen name="Welcome" component={WelcomeScreen} />
          <Stack.Screen name="SignIn" component={SignInScreen} />
          <Stack.Screen name="SignOn" component={SignOnScreen} />

          <Stack.Screen name="FoodScreen" component={FoodScreen} />
          <Stack.Screen name="FoodCategory" component={FoodCategoryScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
