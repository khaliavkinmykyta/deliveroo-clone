import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  Button,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Marker } from "react-native-maps";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { db } from "../../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import BasketIcon from "../../components/Basket/BasketIcon";

const initialLondonLocation = {
  latitude: 51.5074, // Широта Лондона
  longitude: -0.1278, // Долгота Лондона
};

const NotificationsScreen = () => {
  const { user, updateUser } = AuthDataContext();
  const [selectedLocation, setSelectedLocation] = useState(
    initialLondonLocation
  );
  const [geoAddress, setGeoAddress] = useState();
  const [floor, setFloor] = useState();
  const [apartment, setApartment] = useState();
  const [addInfo, setAddInfo] = useState();

  const writeData = () => {
    const usersCollection = collection(db, "clients");
    const q = query(usersCollection, where("id", "==", user.uid));

    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("User not found");
        } else {
          querySnapshot.forEach((doc) => {
            const userDocRef = doc.ref;
            const currentGeoAddress = doc.data().geoAddress || [];
            console.log(currentGeoAddress);
            const newAddress = {
              ...geoAddress,
              floor,
              apartment,
              addInfo,
            };
            const updatedGeoAddress = [...currentGeoAddress, newAddress];

            updateDoc(userDocRef, { geoAddress: updatedGeoAddress })
              .then(() => {
                console.log("User data updated successfully");
                        const updatedUser = {
              ...user,
              geoAddress: updatedGeoAddress
            };
            updateUser(updatedUser);
              })
              .catch((error) => {
                console.error("Error updating user data:", error);
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error searching user:", error);
      });
  };
  const navigation = useNavigation();

  const openSetting = () => {
    navigation.navigate("Setting");
  };
  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center px-2 mb-2">
        {/* Drawer Icon */}
        <TouchableOpacity
          onPress={openSetting}
          className=" border-[#cecfd2] p-1"
          style={{
            borderColor: "#cecfd2",
            borderWidth: 1,
            borderRadius: "10%",
          }}
        >
          <ChevronLeftIcon color="#cecfd2" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-black">Add address</Text>
        <BasketIcon />
      </View>
      <View className="mx-4">
        <GooglePlacesAutocomplete
          placeholder="Type a place"
          onPress={(data, details = null) => {
            setGeoAddress({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
              address: data.description,
            });
            setSelectedLocation({
              latitude: details.geometry.location.lat,
              longitude: details.geometry.location.lng,
            });

            // const updatedUser = {
            //   ...user,
            //   address: data.description,
            //   latitude: details.geometry.location.lat,
            //   longitude: details.geometry.location.lng,
            // };
            // updateUser(updatedUser);

            // writeData(geoAddress);
          }}
          query={{
            key: "",
            components: "country:uk",
            language: "en",
          }}
          minLength={0}
          suppressDefaultStyles={false}
          styles={{
            container: {
              flex: 0,
            },
            textInput: styles.textInput,
          }}
          enablePoweredByContainer={false}
          autoFocus={false}
          returnKeyType={"default"}
          fetchDetails={true}
          onFail={(error) => console.log(error)}
          onNotFound={() => console.log("no results")}
          listEmptyComponent={() => (
            <View style={{ flex: 1 }}>
              <Text>No results were found</Text>
            </View>
          )}
        />
        <TextInput
          placeholder="Add floor"
          style={styles.textInput}
          value={floor}
          onChangeText={setFloor}
        />
        <TextInput
          placeholder="Add apartment"
          style={styles.textInput}
          value={apartment}
          onChangeText={setApartment}
        />
        <TextInput
          placeholder="Add additional info"
          style={styles.textInput}
          value={addInfo}
          onChangeText={setAddInfo}
        />

        <TouchableOpacity
          onPress={writeData}
          className="bg-[#fe6c44] text-white rounded-xl items-center justify-center w-1/2 mx-auto my-5"
        >
          <Text className="text-white font-bold text-md p-5">Add address</Text>
        </TouchableOpacity>

        <TouchableOpacity
          className="bg-white border-[#fe6c44]  border text-white rounded-xl items-center justify-center w-1/2 mx-auto my-5"
        >
          <Text className="text-[#fe6c44]  font-bold text-md py-5 px-2 text-center">Your previous address</Text>
        </TouchableOpacity>
      </View>
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: selectedLocation.latitude,
          longitude: selectedLocation.longitude,
          latitudeDelta: 0.1,
          longitudeDelta: 0.1,
        }}
      >
        <Marker
          coordinate={{
            latitude: selectedLocation.latitude,
            longitude: selectedLocation.longitude,
          }}
        />
      </MapView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({
  textInput: {
    backgroundColor: "#FFFFFF",
    height: 44,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 5,
    fontSize: 15,
    marginVertical: 5,
    borderColor: "#d4d4d8", // Серая обводка
    borderWidth: 1, // Толщина обводки
  },
});
export default NotificationsScreen;
