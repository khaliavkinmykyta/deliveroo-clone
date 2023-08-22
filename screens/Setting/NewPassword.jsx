import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";

import BackButton from "../../components/BackButton";
import BasketIcon from "../../components/Basket/BasketIcon";
import { auth } from "../../firebase";
import { updatePassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { Bars3CenterLeftIcon, ChevronLeftIcon } from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";

const NewPassword = () => {

  const user = auth.currentUser;
  const navigation = useNavigation();

  const [successChange, setSuccessChange] = useState(false);

  //SCHEMAS
  const newPasswordSchema = yup.object().shape({
    newPassword: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters long"),
  });

  //FORM SETTING
  const {
    control,
    reset,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(newPasswordSchema),
    defaultValues: {
      newPassword: "",
    },
  });

  //   CHANGE PASSWORD
  const changePassword = (data) => {
    console.log("?");
    // auth.user
    console.log(user);
    updatePassword(user, data.newPassword)
      .then(() => {
        // Update successful.
        console.log("+");
        setSuccessChange(true);
        reset();
      })
      .catch((error) => {
        console.log("-");
        console.log(error);
        setSuccessChange(false);
        // An error ocurred
        // ...
      });
  };
  const openSetting= () => {
    navigation.navigate("SettingScreen")
  };

//  
  return (
    <SafeAreaView className="flex-1 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center px-2">
                {/* Drawer Icon */}
                <TouchableOpacity
          onPress={openSetting}
          className=" border-[#cecfd2] p-1"
          style={{
            borderColor: "#cecfd2",
            borderWidth: 1,
            borderRadius: "10%",
          }}
        >
          <ChevronLeftIcon color="#cecfd2" />
        </TouchableOpacity>

        <Text className="text-xl font-bold text-black">Change password</Text>
        <BasketIcon />
      </View>

      {successChange ? (
        <View className="bg-green-300 m-4 rounded-xl">
          <Text className='text-2xl font-bold p-5 text-center'>You have successfully updated your password!</Text>
        </View>
      ) : (
        <View className="mx-4 my-4">
          {/* NEW PASSWORD  CONTROLLER */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {/* LABEL */}
                <Text className="block text-sm text-gray-500 mb-1">
                  Input your new password
                </Text>

                {/* INPUT */}
                <TextInput
                  placeholder="your new password name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  secureTextEntry={true}
                  value={value}
                  className="bg-gray-200 h-12 rounded-xl p-4"
                />

                {/* ERROR LABEL */}
                <Text className="text-xs text-red-500 p-2">
                  {errors.newPassword?.message || "\u0000"}
                </Text>
              </View>
            )}
            name="newPassword"
          />

          {/* SUBMIT ORIGINAL PASSWORD */}
          <TouchableOpacity className="bg-[#fe6c44] text-white p-4 rounded-xl">
            <Text
              className="text-white font-bold text-lg text-center"
              onPress={handleSubmit(changePassword)}
            >
              SET NEW PASSWORD
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewPassword;
