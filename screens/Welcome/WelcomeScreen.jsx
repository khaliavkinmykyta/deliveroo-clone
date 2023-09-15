import { View, Image, FlatList, Animated } from "react-native";
import React, { useEffect, useState, useRef } from "react";
import { useNavigation } from "@react-navigation/native";
import { collection, getDocs } from "firebase/firestore";
import { auth, db } from "../../firebase";
import Loading from "../../components/Loading";
import WelcomeItem from "./WelcomeItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import LetsStartButton from "./LetsStartButton";
import SkipButton from "./SkipButton";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { signInWithEmailAndPassword } from "firebase/auth";

const WelcomeScreen = () => {
  // Our data from DB
  const [welcomePage, setWelcomePage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [sizeData, setSizeData] = useState(0);
  const scrollX = useRef(new Animated.Value(0)).current;
  const slidesRef = useRef(null);

  // SCROLL GESTURE SETTING
  const viewableItemsChanged = useRef(({ viewableItems }) => {
    const firstVisibleItem = viewableItems[0];

    if (firstVisibleItem.key === "last") {
      setLastPage(true);
    } else {
      setLastPage(false);
    }
    setCurrentIndex(firstVisibleItem.index);
  }).current;

  const viewConfig = useRef({ viewAreaCoveragePercentThreshold: 50 }).current;

  const [loading, setLoading] = useState(false);

  const [lastPage, setLastPage] = useState(false);
  const navigation = useNavigation();

  // Check user data
  useEffect(() => {
    async function checkUserAuthentication() {
      const userData = await AsyncStorage.getItem("userData");

      if (userData) {
        const user = JSON.parse(userData);
        console.log("user +");

        console.log(user);
        signInUser(user);
      } else {
        console.log("user -");
      }
    }

    checkUserAuthentication();
  }, []);

  function signInUser(user) {
    // Пример использования signInWithEmailAndPassword для Firebase
    signInWithEmailAndPassword(auth, user.email, user.password)
      .then((userCredential) => {
        const signedInUser = userCredential.user;
      })
      .catch((error) => {
        console.error("Error Welcome Screen:", error);
      });
  }

  // LOADING DATA
  useEffect(() => {
    console.log("UE - load welcome pages");
    const welcomePageRef = collection(db, "welcomePage");

    getDocs(welcomePageRef)
      .then((querySnapshot) => {
        const welcomePageData = querySnapshot.docs.map((doc) => doc.data());
        welcomePageData.sort((a, b) => a.index - b.index);
        setSizeData(welcomePageData.length);
        setWelcomePage(welcomePageData);
        setLoading(true);
      })
      .catch((error) => {
        console.error("Error fetching welcomePage data:", error);
      });
  }, []);

  // HANDLE SCROLL
  const scrollTo = () => {
    if (currentIndex < welcomePage.length - 1) {
      slidesRef.current.scrollToIndex({ index: currentIndex + 1 });
      setLastPage(false);
    }
    if (currentIndex == welcomePage.length - 2) {
      setLastPage(true);
    }
  };

  // SKIP SCROLL
  const scrollToEnd = () => {
    navigation.navigate("SignOn");
  };

  return loading ? (
    <View className="bg-[#fe6c44] flex-1 justify-between  items-center pb-10">
      {/* LOGO BLOCK */}
      <View className="justify-center items-center">
        <Image
          className="h-12 w-12 mt-20 "
          source={{
            uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2Ftest.png?alt=media&token=48084187-95cd-4fdb-b5c1-5ca64d7c04a3",
          }}
        />
      </View>

      {/* FLAT LIST */}
      <View className="flex-1 justify-center items-center">
        <FlatList
          className="grow-0"
          data={welcomePage}
          renderItem={({ item }) => <WelcomeItem item={item} />}
          horizontal
          showsHorizontalScrollIndicator={false}
          pagingEnabled
          bounces={false}
          keyExtractor={(item) =>
            item.index == sizeData - 1 ? "last" : item.index.toString()
          }
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { x: scrollX } } }],
            {
              useNativeDriver: false,
            }
          )}
          scrollEventThrottle={32}
          onViewableItemsChanged={viewableItemsChanged}
          viewabilityConfig={viewConfig}
          ref={slidesRef}
        />
        <Paginator data={welcomePage} scrollX={scrollX} />
      </View>

      {/* BUTTON */}
      {!lastPage ? (
        <View className="flex-row justify-around w-full">
          <SkipButton scrollToEnd={scrollToEnd} />
          <NextButton scrollTo={scrollTo} />
        </View>
      ) : (
        <LetsStartButton scrollToEnd={scrollToEnd} />
      )}
    </View>
  ) : (
    <Loading />
  );
};

export default WelcomeScreen;
