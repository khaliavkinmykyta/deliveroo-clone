import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ActivityIndicator,
} from "react-native";
import React, { useState } from "react";

import BackButton from "../../components/BackButton";
import BasketIcon from "../../components/Basket/BasketIcon";
import { auth } from "../../firebase";
import { signInWithEmailAndPassword, updatePassword } from "firebase/auth";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { useNavigation } from "@react-navigation/native";
import { SafeAreaView } from "react-native-safe-area-context";

const ChangePassword = () => {
  const user = auth.currentUser;
  const [passValid, setPassValid] = useState(true);
  const [errorPass, setErrorPass] = useState("");

  const navigation = useNavigation();
  const [loading, setLoading] = useState(false);

  //SCHEMAS
  const currentPasswordSchema = yup.object().shape({
    password: yup
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
    resolver: yupResolver(currentPasswordSchema),
    defaultValues: {
      password: "",
    },
  });

  //RE-LOGIN
  // const onSubmit = (data) => {
  //   signInWithEmailAndPassword(auth, user.email, data.password)
  //     .then((userCredential) => {
  //       const firebaseUser = userCredential.user;

  //       console.log("Success login!");
  //       setPassValid(true);
  //       reset();
  //       navigation.navigate("NewPassword");
  //     })
  //     .catch((error) => {
  //       console.log("Failed login!");

  //       const errorCode = error.code;
  //       const errorMessage = error.message;
  //       console.error(errorCode, errorMessage);
  //       setPassValid(false);
  //     });
  // };

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        user.email,
        data.password
      );

      console.log("Success login!");
      setPassValid(true);
      reset();
      navigation.navigate("NewPassword");
    } catch (error) {
      console.log("Failed login!");

      const errorCode = error.code;
      const errorMessage = error.message;

      setErrorPass(errorMessage);
      setPassValid(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView className="flex-1 px-4 py-2 bg-white">
      {/* HEADER */}
      <View className="bg-white flex-row justify-between items-center">
        <BackButton />

        <Text className="text-xl font-bold text-black">Change password</Text>
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
              <Text className="block text-sm text-gray-500 mb-1">
                Password:
              </Text>

              {/* INPUT */}
              <TextInput
               onPressIn={() => setPassValid(true)}
                placeholder="your password name"
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errors.password?.message || "\u0000"}
              </Text>
            </View>
          )}
          name="password"
        />

        {/* SUBMIT ORIGINAL PASSWORD */}
        <TouchableOpacity
          className="bg-[#fe6c44] text-white p-4 rounded-xl"
          onPress={handleSubmit(onSubmit)}
        >
          <Text className="text-white font-bold text-lg text-center">
            ENTER YOUR CURRENT PASSWORD
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
    </SafeAreaView>
  );
};

export default ChangePassword;
