import { View, Text, SafeAreaView, FlatList, ScrollView } from "react-native";
import React from "react";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ChevronLeftIcon,
  InformationCircleIcon,
  PencilIcon,
  ShoppingBagIcon,
} from "react-native-heroicons/outline";
import { useNavigation } from "@react-navigation/native";
import { useSelector } from "react-redux";
import {
  selectBasketItems,
  selectBasketTotal,
  selectBasketTotalQuantity,
} from "../../features/basketSlice";
import { TextInput } from "react-native";
import { AuthDataContext } from "../../hooks/AuthWrapper";

const SetOrderScreen = () => {
  const navigation = useNavigation();
  const basketItems = useSelector(selectBasketItems);
  const total = useSelector(selectBasketTotal);
  const totalQuantity = useSelector(selectBasketTotalQuantity);
  const { user } = AuthDataContext();

  return (
    // SAFE AREA CONTAINER
    <SafeAreaView className="bg-white flex-1">
      {/* HEADER AND FLAT*/}
      <View className="">
        {/* HEADER */}
        <View className="flex-row justify-between items-center px-2">
          {/* GO BACK */}
          <TouchableOpacity
            onPress={navigation.goBack}
            className=" border-[#cecfd2] p-1"
            style={{
              borderColor: "#cecfd2",
              borderWidth: 1,
              borderRadius: "10%",
            }}
          >
            <ChevronLeftIcon color="#cecfd2" />
          </TouchableOpacity>

          {/* BASKET */}
          <Text className="text-xl font-bold text-black">Basket</Text>

          {/* SHOPPING CART */}
          <View className="bg-[#ffebe5] rounded-md p-2">
            <ShoppingBagIcon color={"black"} className="z-50" />
            <View className="absolute top-1 right-1 rounded-md bg-[#000000] px-1 ">
              <Text className=" text-white font-bold text-xs">
                {totalQuantity}
              </Text>
            </View>
          </View>
        </View>
      </View>
      {/* INFO ORDER BLOCK */}
      <ScrollView>
        <View className="mx-4 gap-y-3 mt-2">
          {/* Your name */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your name</Text>
            <View className="flex-row mt-2 items-center">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />
              <TextInput
                className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2"
                placeholder="Type here..."
              >
                {user.displayName}
              </TextInput>
            </View>
          </View>

          {/* Your phone */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your phone</Text>
            <View className="flex-row mt-2 items-center">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />

              <TextInput
                className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2"
                placeholder="Type here..."
              >
                {user.email}
              </TextInput>
            </View>
          </View>

          {/* Your address */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your address</Text>
            <View className="flex-row items-center mt-2">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />
              <TextInput className="ml-2" placeholder="Type here...">
                st. 5 Maple Avenue, W37LE
              </TextInput>
            </View>

            {/* NOTICE ADDRESS */}
            <View className="mt-2">
              <Text className="font-bold">Your notice about of address</Text>
              <View className="flex-row items-center mt-2">
                <PencilIcon name="user" size={20} color="#fe6c44" />

                <TextInput
                  className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2"
                  placeholder="Type here..."
                ></TextInput>
              </View>
            </View>

            {/* CHANGE ADDRESS */}
            <TouchableOpacity className="bg-[#fe6c44] rounded-xl p-2 my-4 justify-center items-center">
              <View>
                <Text className="text-white font-semibold ">
                  Change my location
                </Text>
              </View>
            </TouchableOpacity>
          </View>

          {/* Your notice about of order */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your notice about of order</Text>
            <View className="flex-row mt-2 items-center">
              <PencilIcon name="user" size={20} color="#fe6c44" />

              <TextInput
                className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2"
                placeholder="Type here..."
              ></TextInput>
            </View>
          </View>

          {/* Your total */}
          <View className="bg-zinc-100 rounded-xl p-2 shadow-sm  shadow-zinc-500">
            <Text className="font-bold">Your total</Text>
            <View className="flex-row mt-2 items-center">
              <InformationCircleIcon name="user" size={28} color="#fe6c44" />

              <Text className="ml-2 border border-zinc-300 flex-1 rounded-xl p-2 ">
                £ {total}
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <TouchableOpacity onPress={() => navigation.navigate("SetOrderScreen")}>
        <View className="bg-[#fe6c44] rounded-xl m-2">
          <Text className="text-white font-bold text-xl text-center py-4 px-4">
            Place your order
          </Text>
        </View>
      </TouchableOpacity>

      {/* </ScrollView> */}
    </SafeAreaView>
  );
};

export default SetOrderScreen;
