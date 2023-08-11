import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RootNavigator from "./navigation/RootNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AuthWrapper, { AuthContext, AuthDataContext } from "./hooks/AuthWrapper";


export default function App() {
  

  // useEffect(() => {
  //   const unsubscribe = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       const uid = user.uid;
  //       console.log("User exists: " + uid);
  //       setUser(user);
  //     } else {
  //       console.log("User is signed out");
  //       setUser(null);
  //     }
  //   });

  //   return () => unsubscribe();
  // }, []);
  

  return (
    <AuthWrapper>
      {/* В этом месте AuthWrapper будет предоставлять данные о пользователе через контекст */}
      <RootNavigator />
    </AuthWrapper>
  );
}
