import React, { createContext, useContext, useState, useEffect } from "react";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../firebase";
import Loading from "../components/Loading";
import { collection, getDocs, query, where } from "firebase/firestore";

export const AuthContext = createContext();
export const AuthDataContext = () => useContext(AuthContext);

//Initial state for guest/user
const initialUserState = {
  email: "Guest",
  isAuthenticated: false,
};

export default function AuthWrapper({ children }) {
  const [user, setUser] = useState(initialUserState);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      setIsLoading(true)
      if (user) {
        const usersCollection = collection(db, "clients");
        const q = query(usersCollection, where("id", "==", user.uid));

        try {
          const querySnapshot = await getDocs(q);

          if (querySnapshot.empty) {
            console.log("User not found");
          } else {
            const userDBData = querySnapshot.docs[0].data();
            console.log("User data from DB:", userDBData);

            setUser({
              email: user.email,
              uid: user.uid,
              displayName: user.displayName,
              isAuthenticated: true,
              geoAddress: [],
              ...userDBData,
            });
          }
        } catch (error) {
          console.error("Error searching user:", error);
        }
      } else {
        setUser({
          email: "Guest",
          isAuthenticated: false,
        });
      }

      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  //Login Firebase
  const login = (email, password) => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const firebaseUser = userCredential.user;

        setUser({
          email: firebaseUser.email,
          isAuthenticated: true,
        });
        console.log("Success login!");
      })
      .catch((error) => {
        console.log("Failed login!");

        const errorCode = error.code;
        const errorMessage = error.message;
        console.error(errorCode, errorMessage);
      });
  };

  //Logout Firebase
  const logout = () => {
    auth
      .signOut()
      .then(() => {
        // Sign-out successful.
        console.log("Sign-out successful.");
        setUser({
          email: "Guest",
          isAuthenticated: false,
        });
      })
      .catch((error) => {
        // An error happened.
        console.error("Error during sign-out:", error);
      });
  };

  const updateUser = (newUser) => {
    setUser(newUser);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, updateUser }}>
      {isLoading ? <Loading /> : children}
    </AuthContext.Provider>
  );
}
