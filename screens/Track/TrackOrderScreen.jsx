import { View, Text, Button } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import Geolocation from "../Home/Geolocation/Geolocation";
import Geocoder from "react-native-geocoding";

Geocoder.init("AIzaSyDcxpYjobaloVeCaSst2Pm9TPhQZDEKkME");
const TrackOrderScreen = () => {
  const getAddressFromCoordinates = async () => {
    try {
      const response = await Geocoder.from(37.78825, -122.4324);
      const address = response.results[0].formatted_address;
      console.log(address);
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <View>
      <Text>TrackOrderScreen</Text>
      {/* <Geolocation /> */}
      <GooglePlacesAutocomplete />
      <View>
        {/* <Button title="Get Address from Coordinates" onPress={getAddressFromCoordinates} /> */}
      </View>
    </View>
  );
};

export default TrackOrderScreen;
