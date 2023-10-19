import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "react-native";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import BackButton from "../../../components/BackButton";
import BasketIcon from "../../../components/Basket/BasketIcon";

import { AuthDataContext } from "../../../hooks/AuthWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

const DisplayName = () => {
  const { user, updateUser } = AuthDataContext();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //SCHEMA
  const validationSchema = yup.object().shape({
    displayName: yup
      .string()
      .required("Full name is required")
      .matches(
        /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/,
        "Full name should only contain letters"
      ),
  });

  //FORM SETTING
  const {
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      displayName: "",
    },
  });
  const onSubmit = async (data) => {
    if (!user.isAuthenticated) {
      console.log("User not authenticated.");
      return;
    }

    if (!data.displayName) {
      console.log("Display name is empty.");
      return;
    }

    try {
      setLoading(true);
      await updateProfile(auth.currentUser, {
        displayName: data.displayName,
      });

      const updatedUser = { ...user, displayName: data.displayName };
      updateUser(updatedUser);
      await updateFB(data);
    } catch (error) {
      console.error("Error updating displayName:", error.message);
    } finally {
      setLoading(false);
    }
  };

  // const onSubmit = (data) => {
  //   if (user.isAuthenticated) {
  //     setLoading(true);

  //     updateProfile(auth.currentUser, {
  //       displayName: data.displayName,
  //     })
  //       .then(() => {
  //         const updatedUser = { ...user, displayName: data.displayName };
  //         updateUser(updatedUser);
  //         updateFB(data);
  //         setLoading(false);
  //       })
  //       .catch((error) => {
  //         // An error occurred
  //         console.log("displayName error");
  //         console.log(error);
  //         setLoading(false);
  //       });
  //   } else {
  //     console.log("User not authenticated.");
  //     setLoading(false);
  //   }
  // };
  const updateFB = async (data) => {
    try {
      const collectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", user.uid))
      );

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, { displayName: data.displayName });
        // UPDATE CONTEXT WITH NEW NAME
        const updatedUser = {
          ...user,
          displayName: data.displayName,
        };
        updateUser(updatedUser);
        setError(false);
        setAdded(true);
        reset();
      } else {
        setError(true);
        setAdded(false);

        console.log("Doc not found!");
      }
    } catch (error) {
      setError(true);
      setAdded(false);

      console.log("Error doc:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-2 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center">
        {/* Drawer Icon */}
        <BackButton />
        <Text className="text-xl font-bold text-black">Change name</Text>
        <BasketIcon />
      </View>
      <View className="my-5">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">
                Your name:
              </Text>

              {/* INPUT */}
              <TextInput
                onPressIn={() => setAdded(false)}
                placeholder={user.displayName || "set your name"}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errors.displayName?.message || "\u0000"}
              </Text>
            </View>
          )}
          name="displayName"
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-[#fe6c44] text-white rounded-xl items-center justify-center"
        >
          <Text className="text-white font-bold text-lg p-5 uppercase">
            Set your new name
          </Text>
        </TouchableOpacity>
        {loading ? (
          <ActivityIndicator className="my-5" color="black" size="large" />
        ) : (
          ""
        )}

        {added ? (
          <View className="border border-[#fe6c44] rounded-xl mt-2">
            <Text className="text-center text-2xl p-2 text-[#fe6c44]">
              Updated!
            </Text>
          </View>
        ) : (
          ""
        )}
        {error ? (
          <View className="border border-[#fe6c44] rounded-xl mt-2">
            <Text className="text-center text-2xl p-2 text-[#fe6c44]">
              Error!
            </Text>
          </View>
        ) : (
          ""
        )}
      </View>
    </SafeAreaView>
  );
};

export default DisplayName;
