import { View, Text, SafeAreaView, TextInput } from "react-native";
import React from "react";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";

const NotificationsScreen = () => {
  const renderTextInput = (props) => (
    <TextInput
      style={{
        height: 40,
        borderColor: "gray",
        borderWidth: 1,
        paddingHorizontal: 10,
        borderRadius: 5,
        marginTop: 10,
        marginBottom: 5,
      }}
      {...props}
    />
  );

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <GooglePlacesAutocomplete
        placeholder="Type a place"
        onPress={(data, details = null) => console.log(data, details)}
        query={{
          key: "AIzaSyDcxpYjobaloVeCaSst2Pm9TPhQZDEKkME",
          components: 'country:uk', // Replace with the desired city name
        }}
        minLength={0}
        autoFocus={false}
        returnKeyType={"default"}
        // styles={{
        //   textInputContainer: {
        //     backgroundColor: "orange",
        //     margin: 25,
        //     padding: 25,
        //   },
        //   textInput: {
        //     height: 38,
        //     color: "#5d5d5d",
        //     fontSize: 16,
        //     backgroundColor: "orange",
        //   },
        //   predefinedPlacesDescription: {
        //     color: "#1faadb",
        //   },
        // }}
        currentLocation={true}

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

export default NotificationsScreen;
