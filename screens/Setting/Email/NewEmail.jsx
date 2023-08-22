import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  TouchableWithoutFeedback,
} from "react-native";
import React, { useEffect, useState } from "react";

import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  Bars3CenterLeftIcon,
  ChevronLeftIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import BasketIcon from "../../../components/Basket/BasketIcon";
import { auth } from "../../../firebase";
import { updateEmail } from "firebase/auth";

const NewEmail = () => {
  const user = auth.currentUser;
  const navigation = useNavigation();

  const [successChange, setSuccessChange] = useState(false);

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
  const changeEmail = (data) => {
    console.log("?");
    // auth.user
    console.log(user);
    updateEmail(user, data.newEmail)
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
  const openSetting = () => {
    navigation.navigate("SettingScreen");
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
        <View className="mx-4 my-4">
          {/* NEW PASSWORD  CONTROLLER */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                {/* LABEL */}
                <Text className="block text-sm text-gray-500 mb-1">
                  Input your new email
                </Text>

                {/* INPUT */}
                <TextInput
                  placeholder="your new email name"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
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
          <TouchableOpacity className="bg-[#fe6c44] text-white p-4 rounded-xl">
            <Text
              className="text-white font-bold text-lg text-center"
              onPress={handleSubmit(changeEmail)}
            >
              SET NEW EMAIL
            </Text>
          </TouchableOpacity>
        </View>
      )}
    </SafeAreaView>
  );
};

export default NewEmail;
