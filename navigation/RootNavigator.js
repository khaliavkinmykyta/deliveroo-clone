import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { Provider } from "react-redux";
import { store } from "../store";
import DrawerNavigator from "./DrawerNavigator";
import AuthWrapper, { AuthDataContext } from "../hooks/AuthWrapper";
import AuthNavigator from "./AuthNavigator";
import { auth } from "../firebase";

const RootNavigator = () => {
  const { user } = AuthDataContext();
  const [logged, setLogged] = useState(false);

  useEffect(() => {
    if (user.isAuthenticated) {
      console.log("User authenticated:", user);
      console.log("Cколько раз вызывается, норм? - рут навигатор - тру юзео:", user);

      setLogged(true);
    } else {
      setLogged(false);
      console.log("User is signed out");
      console.log("Cколько раз вызывается, норм?  - рут навигатор - тру фолс:");
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
    <AuthNavigator  />
  );
};

export default RootNavigator;
