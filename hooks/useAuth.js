import React, { useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { auth } from "../firebase";


export function useAuth() {
  const [user, setUser] = React.useState();

  // useEffect(() => {
  //   const unsubscribeFromAuthStateChanged = onAuthStateChanged(auth, (user) => {
  //     if (user) {
  //       // User is signed in, see docs for a list of available properties
  //       // https://firebase.google.com/docs/reference/js/firebase.User
  //       setUser(user);
  //       console.log('00000')
  //       console.log(user)

  //     } else {
  //       // User is signed out
  //       setUser(undefined);
  //     }
  //   });

  //   return unsubscribeFromAuthStateChanged;
  // }, []);

  return {
    user,
  };
}