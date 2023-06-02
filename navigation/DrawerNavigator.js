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
import { Ionicons } from "@expo/vector-icons";
import WalletScreen from "../screens/Wallet/WalletScreen";

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
      useLegacyImplementation
      drawerContent={(props) => <CustomDrawerContent {...props} />}
    >
      <Drawer.Screen
        name="HomeStack"
        component={HomeStackNavigator} // Используем созданный стек навигации
        options={{
          drawerIcon: ({ focused, size }) => (
            // Иконка для главного экрана
            <Ionicons
              name="home"
              color={DEFAULT_ICON_COLOR}
              size={DEFAULT_ICON_SIZE}
              style={{ marginRight: -20 }}
            />
          ),
        }}
      />

      <Drawer.Screen
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
      />
      {/* <Drawer.Screen
      name="Notifications"
      component={NotificationsScreen}
      options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="notifications"
            color={DEFAULT_ICON_COLOR}
            size={DEFAULT_ICON_SIZE}
            style={{ marginRight: -20 }}
          />
        ),
      }}
    /> */}
      {/* <Drawer.Screen
      name="Track Order"
      component={TrackOrderScreen}
      options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="bicycle"
            color={DEFAULT_ICON_COLOR}
            size={DEFAULT_ICON_SIZE}
            style={{ marginRight: -20 }}
          />
        ),
      }}
    /> */}
      {/* <Drawer.Screen
      name="Coupons"
      component={CouponsScreen}
      options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="archive"
            color={DEFAULT_ICON_COLOR}
            size={DEFAULT_ICON_SIZE}
            style={{ marginRight: -20 }}
          />
        ),
      }}
    /> */}
      {/* <Drawer.Screen
      name="Setting"
      component={SettingScreen}
      options={{
        drawerIcon: ({ focused, size }) => (
          <Ionicons
            name="cog"
            color={DEFAULT_ICON_COLOR}
            size={DEFAULT_ICON_SIZE}
            style={{ marginRight: -20 }}
          />
        ),
      }}
    /> */}
    </Drawer.Navigator>
  );
};

function CustomDrawerContent(props) {
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
              uri: "https://cdnn21.img.ria.ru/images/07e5/05/14/1733173627_0:52:3071:1780_1920x0_80_0_0_4c00a7025448352e94166e2c65fb05d0.jpg",
            }}
            className="h-10 w-10 rounded-xl"
          />
          <View>
            <Text className="text-white font-bold">your personal email</Text>
            <Text className="text-white">View your profile</Text>
          </View>
        </View>
        <DrawerItemList {...props} />
      </View>
      <DrawerItem
        label="Log out"
        labelStyle={{ color: "white" }}
        onPress={() => Linking.openURL("https://mywebsite.com/help")}
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
