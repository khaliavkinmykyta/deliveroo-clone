import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import BasketIcon from "../../../components/Basket/BasketIcon";
import { auth, db } from "../../../firebase";
import { updateEmail, updateProfile } from "firebase/auth";
import { SafeAreaView } from "react-native-safe-area-context";
import BackButton from "../../../components/BackButton";
import { collection, getDocs, query, updateDoc, where } from "firebase/firestore";
import { AuthDataContext } from "../../../hooks/AuthWrapper";

const NewEmail = () => {
  const { user, updateUser } = AuthDataContext();

  const [successChange, setSuccessChange] = useState(false);
  const [loading, setLoading] = useState(false);
  const [passValid, setPassValid] = useState(true);
  const [errorPass, setErrorPass] = useState("");

  //SCHEMAS
  const newEmailSchema = yup.object().shape({
    newEmail: yup.string().email("Invalid email").required("Email is required"),
  });

  //FORM SETTING
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newEmailSchema),
    defaultValues: {
      newEmail: "",
    },
  });

  //   CHANGE PASSWORD
  // const changeEmail = (data) => {

  //   updateEmail(user, data.newEmail)
  //     .then(() => {
  //       // Update successful.
  //       console.log("+");
  //       setSuccessChange(true);
  //       reset();
  //     })
  //     .catch((error) => {
  //       console.log("-");
  //       console.log(error);
  //       setSuccessChange(false);
  //       // An error ocurred
  //       // ...
  //     });
  // };
  const changeEmail = async (data) => {
    setLoading(true);
    try {
      await updateEmail(auth.currentUser, data.newEmail);

      await updateProfile(auth.currentUser, {
        email: data.newEmail,
      });

      const updatedUser = { ...user, email: data.newEmail };
      updateUser(updatedUser);
      updateFB(data);
      setSuccessChange(true);

      setPassValid(true);
      reset();
    } catch (error) {
      console.log("Failed login!");
      setSuccessChange(false);
      const errorMessage = error.message;

      setErrorPass(errorMessage);
      setPassValid(false);
    } finally {
      setLoading(false);
    }
  };

  const updateFB = async (data) => {
    try {
      const collectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", user.uid))
      );

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, { email: data.newEmail });
        // UPDATE CONTEXT WITH NEW NAME
        const updatedUser = {
          ...user,
          email: data.newEmail
        };
        updateUser(updatedUser);
      } else {
        console.log("Doc not found!");
      }
    } catch (error) {
      console.log("Error doc:", error);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-2 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center">
        {/* Drawer Icon */}
        <BackButton />
        <Text className="text-xl font-bold text-black">Change email</Text>
        <BasketIcon />
      </View>

      {successChange ? (
        <View className="bg-green-300 m-4 rounded-xl">
          <Text className="text-2xl font-bold p-5 text-center">
            You have successfully updated your email!
          </Text>
        </View>
      ) : (
        <View className="my-5">
          {/* NEW PASSWORD  CONTROLLER */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {/* LABEL */}
                <Text className="block text-sm text-gray-500 mb-1">
                  Input your new email:
                </Text>

                {/* INPUT */}
                <TextInput
                  onPressIn={() => setPassValid(true)}
                  placeholder="your new email name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  autoCapitalize="none"
                  className="bg-gray-200 h-12 rounded-xl p-4"
                />

                {/* ERROR LABEL */}
                <Text className="text-xs text-red-500 p-2">
                  {errors.newEmail?.message || "\u0000"}
                </Text>
              </View>
            )}
            name="newEmail"
          />

          {/* SUBMIT ORIGINAL PASSWORD */}
          <TouchableOpacity
            className="bg-[#fe6c44] text-white p-4 rounded-xl"
            onPress={handleSubmit(changeEmail)}
          >
            <Text className="text-white font-bold text-lg text-center">
              SET NEW EMAIL
            </Text>
          </TouchableOpacity>
          {loading ? (
            <ActivityIndicator className="my-5" color="black" size="large" />
          ) : (
            ""
          )}

          {passValid ? (
            ""
          ) : (
            <Text className="text-xs text-red-500 p-2">{errorPass}</Text>
          )}
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewEmail;
