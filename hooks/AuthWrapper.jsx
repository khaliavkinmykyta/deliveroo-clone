import React, {
    createContext,
    useContext,
    useState,
    useEffect,
  } from "react";
  import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase";
import Loading from "../components/Loading";

  
  export const AuthContext = createContext();
  export const AuthDataContext = () => useContext(AuthContext);
  
  //Initial state for guest/user
  const initialUserState = {
    email: "Guest",
    isAuthenticated: false,
  };
  
  export default function AuthWrapper({ children }) {
    const [user, setUser] = useState(initialUserState);
    const [isLoading, setIsLoading] = useState(true);
  
    //Keep user save
    useEffect(() => {
      const unsubscribe = auth.onAuthStateChanged((user) => {
        if (user) {
          setUser({
            email: user.email,
            displayName: user.displayName,
            phoneNumber: user.phoneNumber,

            isAuthenticated: true,
          });
        } else {
          setUser({
            email: "Guest",
            isAuthenticated: false,
          });
        }
        console.log("что по загрузке?");
        setIsLoading(false);
      });
  
      // Отписываемся от подписки при размонтировании компонента
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
  
    return (
      <AuthContext.Provider value={{ user, login, logout }}>
        {isLoading ?
         <Loading /> 
         : 
         children}
      </AuthContext.Provider>
    );
  }
  