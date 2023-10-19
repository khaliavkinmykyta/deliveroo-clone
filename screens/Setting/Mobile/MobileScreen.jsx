import { View, Text, TouchableOpacity, ActivityIndicator } from "react-native";
import React, { useState } from "react";
import BasketIcon from "../../../components/Basket/BasketIcon";
import BackButton from "../../../components/BackButton";
import { db } from "../../../firebase";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "react-native";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthDataContext } from "../../../hooks/AuthWrapper";
import { SafeAreaView } from "react-native-safe-area-context";

const MobileScreen = () => {
  const { user, updateUser } = AuthDataContext();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);

  //SCHEMAS
  const currentMobileSchema = yup.object().shape({
    mobileNumber: yup.string().required("Mobile number is required"),
  });

  //FORM SETTING
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(currentMobileSchema),
    defaultValues: {
      mobileNumber: user.mobile || "+48",
    },
  });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const collectionRef = collection(db, "clients");
      const querySnapshot = await getDocs(
        query(collectionRef, where("id", "==", user.uid))
      );

      if (!querySnapshot.empty) {
        const userDocRef = querySnapshot.docs[0].ref;
        await updateDoc(userDocRef, { mobile: data.mobileNumber });
        // UPDATE CONTEXT WITH NEW ADDRESS
        const updatedUser = {
          ...user,
          mobile: data.mobileNumber,
        };
        updateUser(updatedUser);
        setError(false);

        setAdded(true);
      } else {
        setError(true);
        setAdded(false);
      }
    } catch (error) {
      setError(true);
      setAdded(false);

      console.log("Error doc:", error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-2 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center">
        {/* Drawer Icon */}
        <BackButton />
        <Text className="text-xl font-bold text-black">Change mobile</Text>
        <BasketIcon />
      </View>

      {/* INPUT ORIGINAL PASS */}
      <View className="my-5">
        {/* PASSWORD  CONTROLLER */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">Mobile</Text>

              {/* INPUT */}
              <TextInput
                placeholder={user.mobile}
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
                onPressIn={() => setAdded(false)}
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errors.mobileNumber?.message || "\u0000"}
              </Text>
            </View>
          )}
          name="mobileNumber"
        />

        {/* SUBMIT ORIGINAL PASSWORD */}
        <TouchableOpacity
          className="bg-[#fe6c44] text-white p-4 rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-bold text-lg text-center">
            ENTER YOUR NEW MOBILE
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

export default MobileScreen;
