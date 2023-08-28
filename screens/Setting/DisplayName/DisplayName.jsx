import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "react-native";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import {
  addDoc,
  collection,
  doc,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import BackButton from "../../../components/BackButton";
import BasketIcon from "../../../components/Basket/BasketIcon";

import { AuthDataContext } from "../../../hooks/AuthWrapper";

const DisplayName = () => {
  const { user, updateUser } = AuthDataContext();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

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
      email: "",
    },
  });

  const onSubmit = (data) => {
    // console.log("start");
    // console.log(user);
    // console.log(data.displayName);
    // console.log(auth.currentUser);

    if (user.isAuthenticated) {
      updateProfile(auth.currentUser, {
        displayName: data.displayName,
      })
        .then(() => {
          console.log("displayName updated");
          console.log(user);
          const updatedUser = { ...user, displayName: data.displayName };
          updateUser(updatedUser);
          updateFB(data);
        })
        .catch((error) => {
          // An error occurred
          console.log("displayName error");
          console.log(error);
        });
    } else {
      console.log("User not authenticated.");
    }
  };
  const updateFB = async (data) => {
    if (user.isAuthenticated) {
      updateProfile(auth.currentUser, {
        displayName: data.displayName,
      })
        .then(() => {
          console.log("displayName updated");
          console.log(user);
          const updatedUser = { ...user, displayName: data.displayName };
          updateUser(updatedUser);
        })
        .catch((error) => {
          // An error occurred
          console.log("displayName error");
          console.log(error);
        });
    } else {
      console.log("User not authenticated.");
    }
    try {
      const collectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", user.uid))
      );

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, { displayName: data.displayName });
        // UPDATE CONTEXT WITH NEW ADDRESS
        const updatedUser = {
          ...user,
          displayName: data.displayName,
        };
        updateUser(updatedUser);
        setError(false)
        setAdded(true);
        reset();
        console.log("Обновление успешно выполнено");
      } else {
        setError(true);
        setAdded(false);

        console.log("Документ не найден");
      }
    } catch (error) {
      setError(true);
      setAdded(false);

      console.log("Ошибка при получении или обновлении документа:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center px-2">
        {/* Drawer Icon */}
        <BackButton />

        <Text className="text-xl font-bold text-black">Change name</Text>
        <BasketIcon />
      </View>
      <View className="mx-4 my-4">
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">
                Your name
              </Text>

              {/* INPUT */}
              <TextInput
                onPressIn={() => setAdded(false)}
                placeholder={user.displayName}
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
          <Text className="text-white font-bold text-lg p-5">
            Set your new name
          </Text>
        </TouchableOpacity>
        {added ? (
          <View className="border border-[#fe6c44] rounded-xl mt-2">
            <Text className="text-center text-2xl p-2 text-[#fe6c44]">
              Added!
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
