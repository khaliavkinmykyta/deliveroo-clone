import { View, Text, TouchableOpacity, SafeAreaView } from "react-native";
import React from "react";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { TextInput } from "react-native";
import { updateProfile } from "firebase/auth";
import { auth, db } from "../../../firebase";
import { addDoc, collection, doc, updateDoc } from "firebase/firestore";
import BackButton from "../../../components/BackButton";
import { AuthDataContext } from "../../../hooks/AuthWrapper";


const DisplayName = () => {
    const {user, updateUser} = AuthDataContext()
  //SCHEMA
  const validationSchema = yup.object().shape({
    displayName: yup
      .string()
      .required("Full name is required")
      .matches(
        /^[a-zA-Z\s]*[a-zA-Z][a-zA-Z\s]*$/,
        "Full name should only contain letters"
      ),
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

  const onSubmit = (data) => {
    console.log("start")
    console.log(user)
    console.log(data.displayName)

    if (user.isAuthenticated) {
      updateProfile(auth.currentUser, {
        displayName: data.displayName,
      })
        .then(() => {
          console.log("displayName updated");
          console.log(user);
          const updatedUser = { ...user, displayName: data.displayName };
          updateUser(updatedUser);

        })
        .catch((error) => {
          // An error occurred
          console.log("displayName error");
          console.log(error);
        });
    } else {
      console.log("User not authenticated.");
    }

  };


  return (
    <SafeAreaView>
        <BackButton/>
      <View>
        <Controller
          control={control}
          render={({ field: { onChange, onBlur, value } }) => (
            <View>
              {/* LABEL */}
              <Text className="block text-sm text-gray-500 mb-1">
                Full name*
              </Text>

              {/* INPUT */}
              <TextInput
                placeholder="your full name"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                className="bg-gray-200 h-12 rounded-xl p-4"
              />

              {/* ERROR LABEL */}
              <Text className="text-xs text-red-500 p-2">
                {errors.displayName?.message || "\u0000"}
              </Text>
            </View>
          )}
          name="displayName"
        />
        <TouchableOpacity
          onPress={handleSubmit(onSubmit)}
          className="bg-[#fe6c44] text-white rounded-xl items-center justify-center"
        >
          <Text className="text-white font-bold text-lg p-5">Sign Up</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default DisplayName;
