import { View, Image, FlatList, Animated, StyleSheet } from "react-native";
import React, {
  useEffect,
  useLayoutEffect,
  useState,
  useRef,
  useCallback,
} from "react";
import { useNavigation } from "@react-navigation/native";

import { collection, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../../components/Loading";
import WelcomeItem from "./WelcomeItem";
import Paginator from "./Paginator";
import NextButton from "./NextButton";
import LetsStartButton from "./LetsStartButton";
import SkipButton from "./SkipButton";

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
            uri: "https://companieslogo.com/img/orig/TKWY.AS.D-c5272108.png?t=1659645684",
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
