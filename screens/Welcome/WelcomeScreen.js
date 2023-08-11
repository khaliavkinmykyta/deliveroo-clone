import {
  View,
  StyleSheet,
  Text,
  Image,
  Button,
  TouchableOpacity,
} from "react-native";
import React, { useEffect, useLayoutEffect, useState } from "react";
import { useNavigation } from "@react-navigation/native";

import { collection, doc, getDoc, getDocs } from "firebase/firestore";
import { db } from "../../firebase";
import Loading from "../../components/Loading";

const WelcomeScreen = () => {
  const [welcomePage, setWelcomePage] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(false);
  const [lastPage, setLastPage] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      const welcomePageRef = collection(db, "welcomePage");

      try {
        const querySnapshot = await getDocs(welcomePageRef);
        const welcomePageData = [];

        querySnapshot.forEach((doc) => {
          const data = doc.data();
          welcomePageData.push(data);
        });

        welcomePageData.sort((a, b) => a.index - b.index);
        setWelcomePage(welcomePageData);
        setLoading(true);
      } catch (error) {
        console.error("Error fetching welcomePage data:", error);
      }
    };

    fetchData();
  }, []);

  //clear header
  const navigation = useNavigation();
  useLayoutEffect(() => {
    navigation.setOptions({
      headerShown: false,
    });
  }, []);

  const handleNextPage = () => {
    if (currentIndex < welcomePage.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
    if (currentIndex == welcomePage.length - 2) {
      setLastPage(false);
    }
  };

  const nextPage = () => {
    navigation.navigate("SignOn");
  };

  const currentData = welcomePage[currentIndex];

  return loading ? (
    <View className="bg-[#fe6c44] h-full px-10 justify-between pb-10">
      {/* LOGO BLOCK */}
      <View className="justify-center items-center">
        <Image
          className="h-12 w-12 mt-20 "
          source={{
            uri: "https://companieslogo.com/img/orig/TKWY.AS.D-c5272108.png?t=1659645684",
          }}
        />
      </View>

      {/* IMG + SLIDE + TEXT */}
      <View className="flex-col gap-y-3">
        {/* SLIDE IMG */}
        <View className="justify-center items-center h-56  w-full">
          <Image
          className="transition-all duration-75  "
            style={{
              height: "100%", // Ваш желаемый размер
              width: "100%", // Чтобы изображение занимало 100% ширины родительского контейнера
              resizeMode: "contain", // Это обеспечит обрезку изображения по нужным пропорциям
            }}
            source={{
              uri: currentData.img,
            }}
          />
        </View>

        {/* SLIDE UI */}
        <View className="flex-row justify-center gap-x-3">
          {welcomePage.map((_, index) => (
            <View
              key={index}
              className={`bg-white h-2 w-2 rounded-full ${
                currentIndex === index ? "bg-[#fe6c44] border border-white" : ""
              }`}
            />
          ))}
        </View>

        {/* TEXT BANNER */}
        <View className="gap-y-4">
          <Text className="text-3xl font-bold text-center text-white">
            {currentData.mainText}
          </Text>
          <Text className="text-center text-white font-normal">
            {currentData.text}
          </Text>
        </View>
      </View>

      {/* BTN BLOCK */}
      {lastPage ? (
        <View className="flex-row justify-around ">
          <TouchableOpacity
            className="bg-[#fe6c44] rounded-xl border border-white h-12 w-1/3"
            onPress={nextPage}
          >
            <Text className="m-auto text-slate-50 font-bold text-lg">Skip</Text>
          </TouchableOpacity>
          <TouchableOpacity
            className="bg-slate-50 rounded-xl h-12 w-1/3"
            onPress={handleNextPage}
          >
            <Text className="m-auto text-[#fe6c44] font-bold text-lg">
              Next page
            </Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View className="flex-row justify-around ">
          <TouchableOpacity
            className="bg-slate-50 rounded-xl h-12 w-2/3"
            onPress={nextPage}
          >
            <Text className="m-auto text-[#fe6c44] font-bold text-lg">
              Let's get started
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  ) : (
    <Loading />
  );
};

export default WelcomeScreen;
