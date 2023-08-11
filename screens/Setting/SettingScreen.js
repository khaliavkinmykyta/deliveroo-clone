import { View, Text, TextInput, TouchableOpacity } from "react-native";
import React, { useState } from "react";

const SettingScreen = () => {
  const [name, setName] = useState(""); // Состояние для имени пользователя

  const handleSave = () => {
    // Здесь можно добавить логику сохранения нового значения имени
    // Например, отправить запрос на сервер или обновить состояние в контексте

    console.log("New name:", name);
  };
  return (
    <>
      <View>
        <Text>SettingScreen</Text>
      </View>
      <View className="flex-1 justify-center items-center bg-gray-100">
        <View className="bg-white p-4 rounded shadow-md w-80">
          <Text className="text-2xl font-bold mb-4">Profile Settings</Text>
          <TextInput
            className="bg-gray-200 p-2 rounded w-full mb-4"
            placeholder="Enter your name"
            value={name}
            onChangeText={(text) => setName(text)}
          />
          <TouchableOpacity
            className="bg-blue-500 py-2 px-4 rounded text-white text-center"
            onPress={handleSave}
          >
            <Text className="text-lg font-semibold">Save</Text>
          </TouchableOpacity>
        </View>
      </View>
    </>
  );
};

export default SettingScreen;
