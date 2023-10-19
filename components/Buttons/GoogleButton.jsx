import React from "react";

import { TouchableOpacity, Text, Image, View } from "react-native";
import { auth } from "../../firebase";
import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";

const MyGoogleButton = ({ onPress, style }) => {
  const provider = new GoogleAuthProvider();
  provider.addScope("https://www.googleapis.com/auth/contacts.readonly");

//   const handleGoogleAuth = async () => {
//     try {
//       const result = await signInWithPopup(auth, provider);
//       // This gives you a Google Access Token. You can use it to access the Google API.
//       const credential = GoogleAuthProvider.credentialFromResult(result);
//       const token = credential.accessToken;
//       // The signed-in user info.
//       const user = result.user;
//       console.log("success");
//       console.log(user);

//       // IdP data available using getAdditionalUserInfo(result)
//       // ...
//     } catch (error) {
//       // Handle Errors here.
//       const errorCode = error.code;
//       const errorMessage = error.message;
//       // The email of the user's account used.
//       const email = error.customData?.email;
//       // The AuthCredential type that was used.
//       const credential = GoogleAuthProvider.credentialFromError(error);
//       console.log("error");
//       console.log(errorCode);
//       console.log(errorMessage);
//       // handle error here

//       // ...
//     }
//   };

  return (
    <TouchableOpacity
      className="bg-blue-500 flex-row items-center justify-center rounded-3xl p-2"
    //   onPress={handleGoogleAuth}
    >
      <View className="h-10 w-10 bg-white rounded-full p-2 mr-3">
        <Image
          source={{
            uri: "https://img.freepik.com/free-icon/search_318-265146.jpg",
          }}
          style={{
            width: "100%",
            height: "100%",
          }}
          resizeMode="contain"
        />
      </View>
      <Text className="text-white font-medium text-lg">
        Continue with Google
      </Text>
    </TouchableOpacity>
  );
};

export default MyGoogleButton;
