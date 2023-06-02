import React, { useEffect, useState } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import RootNavigator from './navigation/RootNavigator';
import AuthNavigator from './navigation/AuthNavigator';

const auth = getAuth();

export default function App() {
  const [user, setUser] = useState(null); // Состояние пользователя

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        // User is signed in
        const uid = user.uid;
        console.log('User exists: ' + uid);
        setUser(user);
      } else {
        // User is signed out
        console.log('User is signed out');
        setUser(null);
      }
    });

    return () => unsubscribe(); // Отписываемся от слушателя при размонтировании компонента
  }, []);

  if (user) {
    // Если пользователь авторизован, отображаем RootNavigator
    return <RootNavigator />;
  } else {
    // Если пользователь не авторизован, отображаем SignInScreen
    return <AuthNavigator/>
  }
}
