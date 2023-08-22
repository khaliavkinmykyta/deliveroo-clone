import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Switch,
  Button,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth, db } from "../../firebase";
import { addDoc, collection, updateDoc } from "firebase/firestore";
import { AuthDataContext } from "../../hooks/AuthWrapper";
import Loading from "../../components/Loading";
import { useNavigation } from "@react-navigation/native";

const SignInForm = () => {
    const navigation = useNavigation();

  //Save me toggle switch
  const [isEnabled, setIsEnabled] = useState(true);

  const toggleSwitch = () => {
    setIsEnabled((previousState) => !previousState);
  };

  const [errorEmailMessage, setErrorEmailMessage] = useState("");
  const [errorPasswordMessage, setErrorPasswordMessage] = useState("");
  const [errorAllMessage, setErrorAllMessage] = useState("");

  //SCHEMA
  const validationSchema = yup.object().shape({
    email: yup.string().email("Invalid email").required("Email is required"),
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
    },
  });

  //ON SUBMIT
  const onSubmit = (data) => {
    setErrorEmailMessage("");
    setErrorPasswordMessage("");
    setErrorAllMessage("");
    signInWithEmailAndPassword(auth, data.email, data.password)
      .then((userCredential) => {
        const user = userCredential.user;
        console.log(user);
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
          case "auth/wrong-password":
            setErrorPasswordMessage("Wrong password");
            break;
          case "auth/user-not-found":
            setErrorEmailMessage("User not found");
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
          <Text className="text-white font-bold text-lg p-5">Sign In</Text>
        </TouchableOpacity>

        {/* FFORGOT */}
        <View className="flex-row justify-between items-center mt-4">
          <View className="flex-row items-center space-x-1">
            <Switch
              className="scale-75 "
              trackColor={{ false: "#ffffff", true: "#fe6c44" }}
              thumbColor={isEnabled ? "#ffffff" : "#ffffff"}
              ios_backgroundColor="#3e3e3e"
              onValueChange={toggleSwitch}
              value={isEnabled}
              s
            />
            <Text className="text-gray-600">
              {isEnabled ? "Save me" : "Don't save me"}
            </Text>
          </View>
          <TouchableOpacity
            onPress={() => navigation.navigate("ForgotPassword")}
          >
            <Text className="text-gray-600 ">Forgot Password?</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default SignInForm;
