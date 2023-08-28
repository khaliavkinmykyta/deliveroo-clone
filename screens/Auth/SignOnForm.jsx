import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection } from "firebase/firestore";

const SignOnForm = () => {
  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorAllMessage, setErrorAllMessage] = useState("");

  //SCHEMA
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
    mobileNumber: yup
      .string()
      .required("Mobile number is required"),
    password: yup
      .string()
      .required("Password is required")
      .min(6, "Password should be at least 6 characters long"),
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
      mobileNumber: "+44",
    },
  });

  //ON SUBMIT
  const onSubmit = (data) => {
    setErrorEmailMessage("");
    setErrorPasswordMessage("");
    setErrorAllMessage("");
    createUserWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        addDoc(collection(db, "clients"), {
          email: data.email,
          token: user.refreshToken,
          id: user.uid,
          mobile: data.mobileNumber,
        })
          .then(() => {
            console.log(
              "Пользователь успешно зарегистрирован и добавлен в коллекцию"
            );
          })
          .catch((error) => {
            console.log(
              "Ошибка при добавлении пользователя в коллекцию:",
              error
            );
          });
      })
      .catch((error) => {
        const errorCode = error.code;

        const errorMessage = error.message;

        switch (errorCode) {
          case "auth/email-already-in-use":
            setErrorEmailMessage("Email already exists");
            break;
          case "auth/invalid-email":
            setErrorEmailMessage("Incorrect e-mail");
            break;
          case "auth/weak-password":
          case "auth/invalid-password":
            setErrorPasswordMessage("Password should be at least 6 characters");
            break;
          default:
            setErrorAllMessage(errorMessage);
            break;
        }
      });
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <View className="">
        {/* EMAIL CONTROLLER */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">Email*</Text>

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

        {/* MOBILE CONTROLLER */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">
                Mobile number*
              </Text>

              {/* INPUT */}
              <TextInput
                placeholder="your mobile number"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
                keyboardType="phone-pad"
                autoCapitalize="none"
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errors.mobileNumber?.message || "\u0000"}
              </Text>
            </View>
          )}
          name="mobileNumber"
        />

        {/* PASSWORD  CONTROLLER */}
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">
                Password*
              </Text>

              {/* INPUT */}
              <TextInput
                placeholder="your password name"
                onBlur={onBlur}
                onChangeText={onChange}
                secureTextEntry={true}
                value={value}
                autoCapitalize="none"
                className="bg-gray-200 h-12 rounded-xl p-4"
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errorPasswordMessage || errors.password?.message || "\u0000"}
              </Text>

              {errorAllMessage ? (
                <Text className="text-xs text-red-500 p-2 text-center">
                  {errorAllMessage}
                </Text>
              ) : (
                ""
              )}
            </View>
          )}
          name="password"
        />

        {/* BUTTON Sign Up*/}

        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-[#fe6c44] text-white rounded-xl items-center justify-center"
        >
          <Text className="text-white font-bold text-lg p-5">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignOnForm;
