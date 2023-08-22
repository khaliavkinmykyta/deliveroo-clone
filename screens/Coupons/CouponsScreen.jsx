import {
  View,
  Text,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";
import {
  Bars3CenterLeftIcon,
  PlusIcon,
  UserIcon,
} from "react-native-heroicons/outline";
import { ScrollView } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { GifIcon, GiftIcon } from "react-native-heroicons/solid";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
  addDoc,
} from "firebase/firestore";
import { AuthDataContext } from "../../hooks/AuthWrapper";

const CouponsScreen = () => {
  const navigation = useNavigation();
  const [promocode, setPromoCode] = useState(false);
  const [userPromocode, setUserPromocode] = useState(null); // Новое состояние для подколлекции
  const [userDocId, setUserDocId] = useState("");
  const [myPromocode, setMyPromocode] = useState(null);
  const [rerenderPromo, setRerenderPromo] = useState(0);

  const { user } = AuthDataContext();
  // console.log(user.uid)

  const [userCode, setUserCode] = useState("");

  useEffect(() => {
    console.log("hi");
  
    const clientsCollectionRef = collection(db, "clients");
  
    const userQuery = query(clientsCollectionRef, where("id", "==", user.uid));
  
    getDocs(userQuery)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          setUserDocId(userDocRef.id);
  
          // Проверяем наличие подколлекции "userPromocode"
          const userPromocodeCollectionRef = collection(
            userDocRef,
            "userPromocode"
          );
          getDocs(userPromocodeCollectionRef)
            .then((promocodeSnapshot) => {
              if (!promocodeSnapshot.empty) {
                const promocodes = [];
                promocodeSnapshot.forEach((doc) => {
                  const data = doc.data();
                  promocodes.push(data);
                });
                setMyPromocode(promocodes);
                console.log("Promocodes added to myPromocode:", promocodes);
              } else {
                console.log("User does not have userPromocode subcollection.");
              }
            })
            .catch((error) => {
              console.error(
                "Error checking for userPromocode subcollection:",
                error
              );
            });
        } else {
          console.log("User with the specified UID not found.");
        }
      })
      .catch((error) => {
        console.error("Error querying for user:", error);
      });
  }, [rerenderPromo]);
  
  const checkCode = () => {
    console.log();
    const promoCodeCollectionRef = collection(db, "promocode");
  
    const promoCodeQuery = query(
      promoCodeCollectionRef,
      where("id", "==", userCode)
    );
  
    getDocs(promoCodeQuery)
      .then((querySnapshot) => {
        console.log(querySnapshot);
        if (!querySnapshot.empty) {
          const promoCodeDoc = querySnapshot.docs[0];
          const promoCodeData = promoCodeDoc.data();
  
          // Устанавливаем значение promocode на основе данных промокода
          setPromoCode(promoCodeData.value);
  
          console.log("Promo code is valid!");
          console.log(
            "Fields in promo code document:",
            Object.keys(promoCodeData)
          );
  
          addCodeToUser(promoCodeData);
  
          // Вызываем функцию, чтобы обновить состояние и перезапустить useEffect
          triggerRerender();
        } else {
          console.log("Promo code is invalid.");
        }
      })
      .catch((error) => {
        console.error("Error checking promo code:", error);
      });
  };
  
  // Функция для увеличения значения rerenderPromo
  const triggerRerender = () => {
    setRerenderPromo((prev) => prev + 1);
  };
  
  const openDrawer = () => {
    navigation.openDrawer();
  };



  const addCodeToUser = (promoCodeData) => {
    const clientsCollectionRef = collection(db, "clients");

    const userQuery = query(clientsCollectionRef, where("id", "==", user.uid));

    getDocs(userQuery)
      .then((querySnapshot) => {
        if (!querySnapshot.empty) {
          const userDocRef = querySnapshot.docs[0].ref;
          setUserDocId(userDocRef.id);
          // Создаем подколлекцию "userPromocode" и добавляем данные
          addDoc(collection(userDocRef, "userPromocode"), {
            ...promoCodeData,
            count: 1, // Устанавливаем начальное значение для count
            a: "some value", // Устанавливаем значение для a
          })
            .then(() => {
              console.log("Promo code added to user successfully.");
              setRerenderPromo((prev) => prev + 1);
            })
            .catch((error) => {
              console.error("Error adding promo code to user:", error);
            });
        } else {
          console.log("User with the specified UID not found.");
        }
      })
      .catch((error) => {
        console.error("Error querying for user:", error);
      });
  };

  return (
    <SafeAreaView className="bg-white p-3 ">
      <ScrollView>
        {/* CUSTOM HEADER Drawer + Name + Logo */}
        <View className="flex-row justify-between items-center px-2">
          {/* Drawer Icon */}
          <TouchableWithoutFeedback onPress={openDrawer}>
            <View className="p-1 border border-zinc-500 rounded-xl">
              <Bars3CenterLeftIcon color="#71717a" size={26} />
            </View>
          </TouchableWithoutFeedback>

          {/* Name Screen */}
          <Text className="text-xl font-bold text-black">Coupons</Text>

          {/* Logo */}
          <Image
            source={{
              uri: "https://cdn.dribbble.com/users/5462907/screenshots/11960844/5.png",
            }}
            className="h-10 w-10 rounded-xl"
          />
        </View>

        {/* PROMO CODE BODY */}
        <View className="flex-row justify-between items-center px-2">
          <View className="mx-4 gap-y-5 mt-10">
            {/* CHECK PROMO CODE FOR CURRENT USER */}
            {myPromocode && myPromocode.length > 0 ? (
              myPromocode.map((promoCode, index) => (
                <View
                  key={index}
                  className="bg-gray-100 rounded-xl flex-row justify-between px-2 py-4 mt-4"
                >
                  <View className="flex-row gap-5">
                    <Image
                      source={{
                        uri: promoCode.img,
                      }}
                      className="h-10 w-10 rounded-xl"
                    />
                    <View className="justify-between">
                      <Text className="font-semibold">
                        {promoCode.discount}
                      </Text>
                      <Text className="text-slate-500">
                        {promoCode.description}
                      </Text>
                    </View>
                  </View>
                  <View className="items-end">
                    <Text className="font-bold">Expire by: </Text>
                    <Text className="font-bold">{promoCode.expireDate}</Text>
                  </View>
                </View>
              ))
            ) : (
              <View className="flex-row justify-center items-center gap-x-5 mt-4">
                <GiftIcon size={28} color="#71717a" />
                <Text className="font-bold">
                  You don't have active promo code
                </Text>
              </View>
            )}

            {/* ADD PROMO CODE */}
            <View className="bg-white rounded-xl flex-row justify-between px-2 py-4">
              <View className="flex-row items-center w-1/2">
                <Text className="font-bold text-lg">Add promo code:</Text>
              </View>

              <View className="w-1/2    ">
                <TextInput
                  value={userCode}
                  onChangeText={(text) => setUserCode(text)}
                  className="bg-gray-200 h-12 rounded-xl p-4"
                  placeholder="paste your code"
                  keyboardType="email-address"
                />
              </View>
            </View>

            {/* BUTTON ADDING */}
            <View className="mx-auto w-full">
              <TouchableOpacity
                className="bg-[#fe6c44] rounded-xl h-12 "
                onPress={checkCode}
              >
                <Text className="m-auto text-white font-bold text-lg">
                  Add promo code
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default CouponsScreen;
