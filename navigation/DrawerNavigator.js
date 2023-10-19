import React from "react";
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList,
  createDrawerNavigator,
} from "@react-navigation/drawer";
import { Text, View, Image } from "react-native";
import HomeStackNavigator from "./HomeStackNavigator";

import { DrawerActions, useNavigation } from "@react-navigation/native";
import { TouchableOpacity } from "react-native-gesture-handler";
import {
  ArrowRightOnRectangleIcon,
  XMarkIcon,
} from "react-native-heroicons/outline";
import {
  ChatBubbleOvalLeftEllipsisIcon,
  GiftIcon,
  BellAlertIcon,
  MapPinIcon,
  HomeIcon,
  QueueListIcon,
} from "react-native-heroicons/solid";
import { Ionicons } from "@expo/vector-icons";
import { AuthDataContext } from "../hooks/AuthWrapper";
import CouponsScreen from "../screens/Coupons/CouponsScreen";
import SupportScreen from "../screens/Support/SupportScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import TrackOrderScreen from "../screens/Track/TrackOrderScreen";
import SettingNavigator from "./SettingNavigator";
import OrdersScreen from "../screens/Orders/OrdersScreen";
import LocationNavigator from "./LocationNavigator";
import { useDispatch } from "react-redux";
import { clearBasket } from "../features/basketSlice";
import AsyncStorage from "@react-native-async-storage/async-storage";

const DEFAULT_ICON_COLOR = "white";
const DEFAULT_ICON_SIZE = 24;

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  return (
    <Drawer.Navigator
      initialRouteName="HomeStack"
      screenOptions={{
        drawerStyle: {
          backgroundColor: "#fe6c44",
          paddingVertical: 1,
          shadowOffset: { width: 5, height: 0 },
          shadowOpacity: 0.5,
          shadowRadius: 10,
          elevation: 5,
        },
        drawerContentStyle: {
          flex: 1,
        },
        drawerActiveTintColor: "white",
        drawerInactiveTintColor: "white",
      }}
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={HomeStackNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <HomeIcon
              name="homeicon"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Track Order"
        component={TrackOrderScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <MapPinIcon
              name="bicycle"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Your Orders"
        component={OrdersScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <QueueListIcon
              name="oreders"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
      <Drawer.Screen
        name="Location"
        component={LocationNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <MapPinIcon
              name="notifications"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Notifications"
        component={NotificationsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <BellAlertIcon
              name="notifications"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Coupons"
        component={CouponsScreen}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <GiftIcon
              name="gift"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Support"
        component={SupportScreen}
        options={{
          headerShown: false,

          drawerIcon: ({ focused, size }) => (
            <ChatBubbleOvalLeftEllipsisIcon
              name="support"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
        name="Setting"
        component={SettingNavigator}
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="cog"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
  const { logout, user } = AuthDataContext();
  const dispatch = useDispatch();

  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(clearBasket());
    const removeUserDataFromStorage = async () => {
      try {
        await AsyncStorage.removeItem("userData");
        console.log("Deleted AsyncStorage");
      } catch (error) {
        console.error("Error Deleted AsyncStorage:", error);
      }
    };

    removeUserDataFromStorage();
    logout();
  };

  return (
    <DrawerContentScrollView
      {...props}
      contentContainerStyle={{ flex: 1, justifyContent: "space-between" }}
    >
      <View>
        <TouchableOpacity
          onPress={() => props.navigation.dispatch(DrawerActions.closeDrawer())}
        >
          <XMarkIcon
            color="white"
            size={30}
            strokeWidth={4}
            style={{
              marginLeft: 15,
              marginBottom: 15,
            }}
          />
        </TouchableOpacity>

        <View className="mx-4 mb-5 flex-row space-x-2">
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2Ftest.png?alt=media&token=48084187-95cd-4fdb-b5c1-5ca64d7c04a3",
            }}
            className="h-10 w-10"
          />
          <TouchableOpacity
            onPress={() => {
              navigation.navigate("Setting");
            }}
          >
            <View className='justify-center'>
              <Text className="text-white font-bold">{user.email}</Text>
              <Text className="text-white">View your profile</Text>
            </View>
          </TouchableOpacity>
        </View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        label="Log out"
        labelStyle={{ color: "white" }}
        onPress={handleLogout}
        icon={({ color, size }) => (
          <ArrowRightOnRectangleIcon
            color="white"
            strokeWidth={2}
            style={{
              marginRight: -20,
            }}
          />
        )}
        style={{
          marginBottom: 50,
        }}
      />
    </DrawerContentScrollView>
  );
}

export default DrawerNavigator;
