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

const MobileScreen = () => {
  const [passValid, setPassValid] = useState(false);
  const navigation = useNavigation();
  const user = auth.currentUser;

  //SCHEMAS
  const currentMobileSchema = yup.object().shape({
    mobileNumber: yup
      .number()
      .typeError("Mobile number should only contain numbers")
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
        console.log("Обновление успешно выполнено");
      } else {
        console.log("Документ не найден");
      }
    } catch (error) {
      console.log("Ошибка при получении или обновлении документа:", error);
    }
  };

  return (
    <SafeAreaView>
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
                placeholder="your mobile number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
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
        <TouchableOpacity className="bg-[#fe6c44] text-white p-4 rounded-xl">
          <Text
            className="text-white font-bold text-lg text-center"
            onPress={handleSubmit(onSubmit)}
          >
            ENTER YOUR NEW MOBILE
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default MobileScreen;
