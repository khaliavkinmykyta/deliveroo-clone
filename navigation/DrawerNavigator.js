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
  ChatBubbleOvalLeftIcon,
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
import WalletScreen from "../screens/Wallet/WalletScreen";
import { AuthDataContext } from "../hooks/AuthWrapper";
import { auth } from "../firebase";
import SettingScreen from "../screens/Setting/SettingScreen";
import CouponsScreen from "../screens/Coupons/CouponsScreen";
import SupportScreen from "../screens/Support/SupportScreen";
import NotificationsScreen from "../screens/Notifications/NotificationsScreen";
import TrackOrderScreen from "../screens/Track/TrackOrderScreen";
import SettingNavigator from "./SettingNavigator";
import OrdersScreen from "../screens/Orders/OrdersScreen";
import LocationNavigator from "./LocationNavigator";
import { useDispatch } from "react-redux";
import { clearBasket } from "../features/basketSlice";

const DEFAULT_ICON_COLOR = "white";
const DEFAULT_ICON_SIZE = 24;

const Drawer = createDrawerNavigator();

const DrawerNavigator = () => {
  const navigation = useNavigation();

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
      //   initialRouteName="Home"
      // useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="Main"
        component={HomeStackNavigator} // Используем созданный стек навигации
        options={{
          headerShown: false,
          drawerIcon: ({ focused, size }) => (
            // Иконка для главного экрана
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
      {/* <Drawer.Screen
        name="Wallet"
        component={WalletScreen}
        options={{
          drawerIcon: ({ focused, size }) => (
            <Ionicons
              name="wallet"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      /> */}
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
  const { login, logout, user } = AuthDataContext();
  const dispatch = useDispatch();

  console.log("drawer");
  console.log(user.email);

  const navigation = useNavigation();
  const handleLogout = () => {
    dispatch(clearBasket());
    logout();
    // auth
    //   .signOut()
    //   .then(() => {
    //     // Sign-out successful.
    //     console.log("Sign-out successful.");
    //   })
    //   .catch((error) => {
    //     // An error happened.
    //     console.error("Error during sign-out:", error);
    //   });
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
              uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2FScreenshot%202023-09-02%20at%2021.41.43.png?alt=media&token=11aeac0b-2bb9-42d2-91d7-3acbd1e6e78d",
            }}
            className="h-10 w-10 rounded-xl"
          />
          <TouchableOpacity onPress={()=> {navigation.navigate('Setting')}}>
            <View>
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
