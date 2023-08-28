import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React, { useState } from "react";
import { ChevronLeftIcon } from "react-native-heroicons/outline";
import BasketIcon from "../../../components/Basket/BasketIcon";
import BackButton from "../../../components/BackButton";
import { auth, db } from "../../../firebase";
import { EmailAuthProvider, reauthenticateWithCredential } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { TextInput } from "react-native";
import {
  collection,
  getDocs,
  query,
  updateDoc,
  where,
} from "firebase/firestore";
import { AuthDataContext } from "../../../hooks/AuthWrapper";

const MobileScreen = () => {
  const navigation = useNavigation();
  const { user, updateUser } = AuthDataContext();
  const [added, setAdded] = useState(false);
  const [error, setError] = useState(false);

  //SCHEMAS
  const currentMobileSchema = yup.object().shape({
    mobileNumber: yup
      .string()
      .required("Mobile number is required"),
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
      mobileNumber: "",
    },
  });
  const onSubmit = async (data) => {
    try {
      console.log("allo");
      console.log(data.mobileNumber);
      console.log(user.uid);
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

        <Text className="text-xl font-bold text-black">Change mobile</Text>
        <BasketIcon />
      </View>

      {/* INPUT ORIGINAL PASS */}
      <View className="mx-4 my-4">
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
        <TouchableOpacity className="bg-[#fe6c44] text-white p-4 rounded-xl"  onPress={handleSubmit(onSubmit)}>
          <Text
            className="text-white font-bold text-lg text-center"
           
          >
            ENTER YOUR NEW MOBILE
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

export default MobileScreen;
