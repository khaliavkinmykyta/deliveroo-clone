import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal } from "react-native";
import { useForm, Controller } from "react-hook-form";
import * as yup from "yup";


const MobileSetting = ({value, isModalVisible}) => {
  return (
    <Modal
      visible={isModalVisible}
      animationType="slide"
      transparent={true}
    >
      <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
        <View
          style={{ backgroundColor: "white", padding: 20, borderRadius: 10 }}
        >
          {/* Здесь вы можете добавить форму для ввода нового номера телефона */}
          {/* Например, используя react-hook-form */}
          <Controller
            control={control}
            render={({ field: { onChange, onBlur, value } }) => (
              <View>
                <Text>New Phone Number</Text>
                <TextInput
                  placeholder="Enter new phone number"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  keyboardType="phone-pad"
                />
                {/* Ошибки ввода */}
                <Text>{errors.newPhoneNumber?.message || ""}</Text>
              </View>
            )}
            name="newPhoneNumber"
          />
          {/* Кнопка для подтверждения смены номера */}
          <TouchableOpacity onPress={handleSubmit(onChangePhoneNumber)}>
            <Text>Change Phone Number</Text>
          </TouchableOpacity>
          {/* Кнопка для закрытия модального окна */}
          <TouchableOpacity onPress={toggleModal}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

export default MobileSetting;
