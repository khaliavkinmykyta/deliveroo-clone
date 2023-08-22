import { View, Text, Button } from "react-native";
import React, { useEffect, useState } from "react";
import * as Location from "expo-location";
import { TextInput } from "react-native-gesture-handler";
import { StatusBar } from "expo-status-bar";

const Geolocation = () => {
  const [location, setLocation] = useState();
  const [address, setAddress] = useState();


  Location.setGoogleApiKey("AIzaSyDcxpYjobaloVeCaSst2Pm9TPhQZDEKkME");

  useEffect(() => {
    const getPermission = async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Please grant the permissions!");

        return;
      }
      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation(currentLocation);
      console.log('Current location: ');
      console.log(currentLocation)
    };
    getPermission();
  }, []);

  const geocode = async() => {
    const geocodedLocation = await Location.geocodeAsync(address);
    console.log("Geocoded address:")
    console.log(geocodedLocation)
  }

  const reverseGeocode = async () => {
    const reverseGeocodedAddress = await Location.reverseGeocodeAsync({
      longitude: location.coords.longitude,
      latitude: location.coords.latitude,
    }, {
        useGoogleMaps: true
    });
    console.log("Reverse Geocoded:");
    console.log(reverseGeocodedAddress);
  };
  

  return (
    <View>
      <Text>Geolocation</Text>
      <TextInput placeholder="address" value={address} onChangeText={setAddress}/>
      <Button title="Geocode Address" onPress={geocode}>Geocode Address"</Button>
      <Button title="Reverse Geocode Address" onPress={reverseGeocode}>Reverse Geocode Address</Button>

      <StatusBar style="auto"/>

    </View>
  );
};

export default Geolocation;
