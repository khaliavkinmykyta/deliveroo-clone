import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store";
import DrawerNavigator from "./DrawerNavigator";
import { AuthDataContext } from "../hooks/AuthWrapper";
import AuthNavigator from "./AuthNavigator";

const RootNavigator = () => {
  const { user } = AuthDataContext();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log("User authenticated:", user);
      setLogged(true);
    } else {
      console.log("User is signed out");

      setLogged(false);
    }
  }, [user.isAuthenticated]);
  console.log(user);

  return logged ? (
    <Provider store={store}>
      <NavigationContainer>
        <DrawerNavigator />
      </NavigationContainer>
    </Provider>
  ) : (
    <AuthNavigator />
  );
};

export default RootNavigator;
