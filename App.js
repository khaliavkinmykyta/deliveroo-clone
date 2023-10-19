import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import RootNavigator from "./navigation/RootNavigator";
import AuthNavigator from "./navigation/AuthNavigator";
import AuthWrapper, { AuthContext, AuthDataContext } from "./hooks/AuthWrapper";
import { StripeProvider } from "@stripe/stripe-react-native";

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
    <StripeProvider
      publishableKey="pk_test_51Ng7bWB7PJDFdlHZRxatWGdsCTmwL5kwAh4FmB3mSBkwjnd2PPd3mnomc3meoYlE3UKSiTcO4SHEu1hGKnJZ49k80043eAYCC9"
      urlScheme="your-url-scheme" // required for 3D Secure and bank redirects
      merchantIdentifier="merchant.com.{{YOUR_APP_NAME}}" // required for Apple Pay
    >
      <AuthWrapper>
        {/* В этом месте AuthWrapper будет предоставлять данные о пользователе через контекст */}
        <RootNavigator />
      </AuthWrapper>
    </StripeProvider>
  );
}
