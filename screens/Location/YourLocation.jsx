import {
  View,
  Text,
  SafeAreaView,
  TouchableOpacity,
  ScrollView,
  Button,
} from "react-native";
import React, { useEffect, useState } from "react";
import BasketIcon from "../../components/Basket/BasketIcon";
import { useNavigation } from "@react-navigation/native";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { db } from "../../firebase";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import BackButton from "../../components/BackButton";

const YourLocation = () => {
  const { user, updateUser } = AuthDataContext();
  const [currentGeoAddress, setCurrentGeoAddress] = useState([]);

  useEffect(() => {
    const usersCollection = collection(db, "clients");
    if (user.isAuthenticated) {
      const q = query(usersCollection, where("id", "==", user.uid));
      getDocs(q)
        .then((querySnapshot) => {
          if (querySnapshot.empty) {
            console.log("User not found");
          } else {
            const addresses = [];
            querySnapshot.forEach((doc) => {
              const currentGeoAddress = doc.data().geoAddress || [];
              addresses.push(...currentGeoAddress);
            });
            setCurrentGeoAddress(addresses);
          }
        })
        .catch((error) => {
          console.error("Error searching user:", error);
        });
    } 
  }, [user.geoAddress]);

  const deleteAddress = async (index) => {
    try {
      const usersCollection = collection(db, "clients");
      const q = query(usersCollection, where("id", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          const currentGeoAddress = doc.data().geoAddress || [];
          currentGeoAddress.splice(index, 1); // Удаление адреса по индексу
          updateDoc(userDocRef, { geoAddress: currentGeoAddress })
            .then(() => {
              console.log("Address deleted successfully");
              setCurrentGeoAddress(currentGeoAddress); // Обновление состояния
            })
            .catch((error) => {
              console.error("Error deleting address:", error);
            });
        });
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  const setAsLastLocation = async (index) => {
    try {
      const usersCollection = collection(db, "clients");
      const q = query(usersCollection, where("id", "==", user.uid));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
        querySnapshot.forEach((doc) => {
          const userDocRef = doc.ref;
          const currentGeoAddress = doc.data().geoAddress || [];
          const addressToMove = currentGeoAddress.splice(index, 1)[0]; // Удаление адреса по индексу и сохранение его
          currentGeoAddress.push(addressToMove); // Добавление адреса в конец массива
          updateDoc(userDocRef, { geoAddress: currentGeoAddress })
            .then(() => {
              console.log("Address moved to the end successfully");
              setCurrentGeoAddress(currentGeoAddress); // Обновление состояния
              const updatedUser = {
                ...user,
                geoAddress: currentGeoAddress,
              };
              updateUser(updatedUser);
            })
            .catch((error) => {
              console.error("Error moving address:", error);
            });
        });
      }
    } catch (error) {
      console.error("Error searching user:", error);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      <View className="bg-white flex-row justify-between items-center px-2 mb-2">
        {/* Drawer Icon */}
        <BackButton />

        <Text className="text-xl font-bold text-black">Your address</Text>
        <BasketIcon />
      </View>
      {currentGeoAddress.length === 0 ? (
        <View className="justify-center items-center flex-1">
        <Text className="text-center text-3xl font-bold ">Empty</Text>

        </View>
      ) : (
        <ScrollView>
          <View style={{ display: "flex", flexDirection: "column-reverse" }}>
            {currentGeoAddress.map((addressObj, index) => (
              <View
                key={index}
                className="m-4 shadow-sm  shadow-black bg-white rounded-xl p-2 space-y-2"
              >
                <Text>Address: {addressObj.address}</Text>
                {addressObj.addInfo && (
                  <Text>Additional info: {addressObj.addInfo}</Text>
                )}
                {addressObj.floor && <Text>Floor: {addressObj.floor}</Text>}
                {addressObj.apartment && (
                  <Text>Apartment: {addressObj.apartment}</Text>
                )}

                <View className="flex-row justify-between items-center ">
                  <TouchableOpacity
                    onPress={() => deleteAddress(index)}
                    className="bg-white p-2 font-medium border border-[#fe6c44] rounded-xl"
                  >
                    <Text>Delete</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    onPress={() => setAsLastLocation(index)}
                    className="bg-[#fe6c44] p-2 rounded-xl"
                  >
                    <Text className="text-white font-medium">
                      {index === currentGeoAddress.length - 1
                        ? "Current location"
                        : " Set my location"}
                    </Text>
                  </TouchableOpacity>
                </View>
              </View>
            ))}
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

export default YourLocation;
