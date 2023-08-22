import React from "react";
import { View, Text } from "react-native"; // Import the Text component
import  {GooglePlacesAutocomplete}  from "react-native-google-places-autocomplete";
// AIzaSyDcxpYjobaloVeCaSst2Pm9TPhQZDEKkME
const GooglePlacesInput = () => {
  return (
    <SafeAreaView>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={(data, details = null) => console.log(data, details)}
        query={{ key: "AIzaSyDcxpYjobaloVeCaSst2Pm9TPhQZDEKkME" }}
        fetchDetails={true}
        onFail={(error) => console.log(error)}
        onNotFound={() => console.log("no results")}
        listEmptyComponent={() => (
          <View style={{ flex: 1 }}>
            <Text>No results were found</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

export default GooglePlacesInput;
