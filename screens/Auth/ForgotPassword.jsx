import {
  View,
  Text,
  Image,
  TextInput,
  ScrollView,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

import { useNavigation } from "@react-navigation/native";
import React, { useState } from "react";
import { SafeAreaView } from "react-native-safe-area-context";
import { sendPasswordResetEmail } from "firebase/auth";
import { auth } from "../../firebase";

const ForgotPassword = () => {
  const [done, setDone] = useState(false);
  const [errorEmailMessage, setErrorEmailMessage] = useState("");

  //SCHEMA
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
  });

  //FORM SETTING
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    mode: "onBlur",
    resolver: yupResolver(validationSchema),
    defaultValues: {
      email: "",
    },
  });
  const navigation = useNavigation();

  const onSubmit = (data) => {
    console.log(data.email);
    sendPasswordResetEmail(auth, data.email)
      .then(() => {
        // Password reset email sent!
        // ..
        console.log("check email");
        setDone(true);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        console.log(errorMessage);

        switch (errorCode) {
          case "auth/user-not-found":
            setErrorEmailMessage("User not found");
            break;
          default:
            setErrorEmailMessage(errorMessage);
            break;
        }
      });
  };

  return !done ? (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="p-4 flex-1 justify-between  bg-white">
        {/* HEAD */}
        <View>
          {/* LOGO&COMPANY NAME */}
          <View className="flex-row justify-center items-center space-x-3 ">
            <Image
              className="h-14 w-14 rounded-xl"
              source={{
                uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2FScreenshot%202023-09-02%20at%2021.41.43.png?alt=media&token=11aeac0b-2bb9-42d2-91d7-3acbd1e6e78d",
              }}
            />
            <Text className="text-orange font-bold text-3xl">RestoWave</Text>
          </View>

          {/* GET START TEXT */}
          <View className="items-center space-y-2 mb-5 ">
            <Text className="font-bold text-lg mt-10">
              Forgot your password?
            </Text>
            <Text className="text-gray-600">Enter your e-mail </Text>
          </View>
        </View>

        <ScrollView>
          {/* BODY */}

          <View className="">
            {/* EMAIL CONTROLLER */}
            <Controller
              control={control}
              render={({ field: { onChange, onBlur, value } }) => (
                <View>
                  {/* LABEL */}
                  <Text className="block text-sm text-gray-500 mb-1">
                    Email*
                  </Text>

                  {/* INPUT */}
                  <TextInput
                    placeholder="your email"
                    onBlur={onBlur}
                    onChangeText={onChange}
                    value={value}
                    className="bg-gray-200 h-12 rounded-xl p-4"
                    autoCapitalize="none"
                    keyboardType="email-address"
                  />

                  {/* ERROR LABEL */}
                  <Text className="text-xs text-red-500 p-2">
                    {errorEmailMessage || errors.email?.message || "\u0000"}
                  </Text>
                </View>
              )}
              name="email"
            />

            {/* BUTTON*/}

            <TouchableOpacity
              onPress={handleSubmit(onSubmit)}
              className="bg-[#fe6c44] text-white rounded-xl items-center justify-center"
            >
              <Text className="text-white font-bold text-lg p-5 uppercase">
                Reset password
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>

        {/* BOTTOM and BUTTON FOR SIGN IN */}
        <TouchableOpacity
          className="my-5 mx-auto"
          onPress={() => navigation.navigate("SignOn")}
        >
          <Text className="text-zinc-400  ">
            Or sign up again.{" "}
            <Text className="text-[#fe6c44] font-bold">Sign Up!</Text>
          </Text>
        </TouchableOpacity>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  ) : (
    <View className="flex-1 bg-[#fe6c44] justify-center  items-center space-y-10 p-10">
      <Text className="text-xl rounded-xl  text-center font-semibold">
        A new password has been sent to your email!
      </Text>
      <TouchableOpacity
        className="bg-white p-5 rounded-xl"
        onPress={() => navigation.navigate("SignIn")}
      >
        <Text className="text-[#fe6c44] text-3xl font-bold">Sign in</Text>
      </TouchableOpacity>
    </View>
  );
};

export default ForgotPassword;
