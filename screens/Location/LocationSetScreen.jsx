import {
  View,
  Text,
  SafeAreaView,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import React, { useEffect, useState } from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import MapView, { Circle, Marker } from "react-native-maps";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import { db } from "../../firebase";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { useNavigation } from "@react-navigation/native";
import BasketIcon from "../../components/Basket/BasketIcon";
import BackButton from "../../components/BackButton";
import * as geolib from "geolib";


const LocationSetScreen = () => {
  const navigation = useNavigation();
  const { user, updateUser } = AuthDataContext();

  //   INITIAL FROM STORE
  const [storeLocation, setStoreLocation] = useState({});
  const [deliveryRange, setDeliveryRange] = useState(0);
  const [selectedLocation, setSelectedLocation] = useState(storeLocation);

  // GET STORE GEO DATA
  useEffect(() => {
    const docRef = doc(db, "store", "storeInfo");
    getDoc(docRef)
      .then((docSnap) => {
        if (docSnap.exists()) {
          const data = docSnap.data();
          const address = data.address;
          const range = data.deliveryRange;
          setDeliveryRange(range);
          setStoreLocation(address);
        } else {
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.error("Error getting document:", error);
      });
  }, []);

  //   ADD.INFO
  const [floor, setFloor] = useState("");
  const [apartment, setApartment] = useState("");
  const [addInfo, setAddInfo] = useState("");

  const [geoAddress, setGeoAddress] = useState();
  //   ADDED
  const [added, setAdded] = useState(false);
  const [addedError, setAddedError] = useState(false);
  const [disableAddBtn, setDisableAddBtn] = useState(true);

  //   USER PIN
  const [pin, setPin] = useState(false);

  //   VALIDATION
  const [outAddress, setOutAddress] = useState("");

  const writeData = () => {
    const usersCollection = collection(db, "clients");
    const q = query(usersCollection, where("id", "==", user.uid));

    getDocs(q)
      .then((querySnapshot) => {
        if (querySnapshot.empty) {
          console.log("User not found");
          setAddedError("User not found");
        } else {
          querySnapshot.forEach((doc) => {
            const userDocRef = doc.ref;

            // get current addresses from FS
            const currentGeoAddress = doc.data().geoAddress || [];

            // preparation to add new address to FS
            const newAddress = {
              ...geoAddress,
              floor,
              apartment,
              addInfo,
            };

            // new array of address
            const updatedGeoAddress = [...currentGeoAddress, newAddress];

            updateDoc(userDocRef, { geoAddress: updatedGeoAddress })
              .then(() => {
                console.log("User data updated successfully");

                // UPDATE CONTEXT WITH NEW ADDRESS
                const updatedUser = {
                  ...user,
                  geoAddress: updatedGeoAddress,
                };
                updateUser(updatedUser);
                setAdded(true);
                resetInputs(); // Сбрасываем значения инпутов
              })
              .catch((error) => {
                console.error("Error updating user data:", error);
                setAddedError("Error updating user data");
              });
          });
        }
      })
      .catch((error) => {
        console.error("Error searching user:", error);
        setAddedError("Error searching user");
      });
  };

  const resetInputs = () => {
    setFloor("");
    setApartment("");
    setAddInfo("");
  };

  //   DELIVERY RANGE CALCULATING
  const validateLocation = (locationNow) => {
    console.log(locationNow);
    if (!locationNow) {
      console.log("Please select a location");
      return;
    }

    const distance = geolib.getDistance(locationNow, storeLocation);

    if (distance <= deliveryRange) {
      setOutAddress("");
      setDisableAddBtn(false);
      console.log("Location is within 5 km radius");
      // Продолжите выполнение записи данных и других операций
    } else {
      // Расстояние больше 5 км
      setDisableAddBtn(true);

      console.log("Location is outside 5 km radius");
      setOutAddress("Location is outside 5 km radius delivery");
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }} className="bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center px-2 mb-2">
        {/* Back Icon */}
        <BackButton />
        <Text className="text-xl font-bold text-black">Your location</Text>
        <BasketIcon />
      </View>
      <View className="mx-4">
        <View
          className="relative"
          style={{ zIndex: 2, height: 44, marginVertical: 5 }}
        >
          <View className="absolute z-100 w-full">
            <GooglePlacesAutocomplete
              placeholder="Type a zip code or a place"
              onPress={(data, details = null) => {
                setAdded(false);
                setPin(true);
                setGeoAddress({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                  address: data.description,
                });
                setSelectedLocation({
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                });
                const locationNow = {
                  latitude: details.geometry.location.lat,
                  longitude: details.geometry.location.lng,
                };
                validateLocation(locationNow);
              }}
              query={{
                key: GOOGlE_API_KEY,
                components: "country:uk",
                language: "en",
              }}
              minLength={0}
              suppressDefaultStyles={false}
              //   STYLES
              styles={{
                container: {
                  flex: 0,
                },
                textInput: styles.textInput,
                row: styles.row,
                textInputContainer: styles.textInputContainer,
                poweredContainer: styles.poweredContainer,
              }}
              enablePoweredByContainer={false}
              autoFocus={false}
              returnKeyType={"default"}
              fetchDetails={true}
              onFail={(error) => {
                setAddedError(true);
                console.log(error);
              }}
              onNotFound={() => console.log("no results")}
              listEmptyComponent={() => (
                <View style={{ flex: 1 }}>
                  <Text>No results were found</Text>
                </View>
              )}
            />
          </View>
        </View>
        {/* EXTRA FIELD FOR ADDRESS */}
        <View>
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
        </View>

        {/* SUCCESS ADDED */}
        {added ? (
          <View className="bg-[#fe6c44] items-center p-2 rounded-full">
            <Text className="font-bold text-white">Added!</Text>
          </View>
        ) : (
          ""
        )}

        {/* ADDED ADDRESS ERROR */}
        {addedError ? (
          <View className="bg-[#fe6c44] items-center p-2 rounded-full">
            <Text className="font-bold text-w">{addedError}</Text>
          </View>
        ) : (
          ""
        )}

        {/* OUT OF RANGE */}
        {outAddress ? (
          <View className="bg-[#fe6c44] items-center p-2 rounded-full my-2 w-1/2 mx-auto ">
            <Text className="font-bold text-white text-center">
              {outAddress}
            </Text>
          </View>
        ) : (
          ""
        )}
        {/* BUTTON FOR ADDRESS */}
        <View className="my-5 space-y-2">
          {outAddress.length > 0 ? (
            ""
          ) : (
            <TouchableOpacity
              disabled={disableAddBtn}
              onPress={writeData}
              className={`bg-[#fe6c44] text-white rounded-xl items-center justify-center w-1/2 mx-auto ${
                disableAddBtn ? "opacity-50" : ""
              }`}
            >
              <Text className="text-white font-bold text-md p-5">
                Add address
              </Text>
            </TouchableOpacity>
          )}

          <TouchableOpacity
            onPress={() => navigation.navigate("YourLocation")}
            className="bg-white border-[#fe6c44]  border text-white rounded-xl items-center justify-center w-1/2 mx-auto"
          >
            <Text className="text-[#fe6c44]  font-bold text-md py-5 px-2 text-center">
              Your previous address
            </Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* MAP SETTING */}
      <MapView
        style={{ flex: 1 }}
        region={{
          latitude: storeLocation.latitude,
          longitude: storeLocation.longitude,
          latitudeDelta: 0.2,
          longitudeDelta: 0.2,
        }}
      >
        {/* PIN USER ADDRESS */}
        {pin && (
          <Marker
            coordinate={{
              latitude: selectedLocation.latitude,
              longitude: selectedLocation.longitude,
            }}
            pinColor={"#fe6c44"}
          />
        )}

        {/* PIN CIRCLE FOR RADIUS STORE */}
        <Circle
          center={storeLocation}
          radius={deliveryRange}
          fillColor="rgba(254, 108, 68, 0.3)"
          strokeColor="rgba(254, 108, 68, 0.3)"
          strokeWidth={1}
        />
      </MapView>
    </SafeAreaView>
  );
};

// STYLE FOR INPUT AND GOOGLE PLACE
const styles = StyleSheet.create({
  textInputContainer: {},

  textInput: {
    // position: "relative",
    backgroundColor: "#FFFFFF",
    height: 44,
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    fontSize: 15,
    marginVertical: 5,
    borderColor: "#d4d4d8",
    borderWidth: 1,
  },
  row: {
    padding: 13,
    height: 44,
    flexDirection: "row",
  },
});
export default LocationSetScreen;
