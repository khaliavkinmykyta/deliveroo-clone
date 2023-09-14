import { useState, useEffect, useRef } from "react";
import {
  Text,
  View,
  Button,
  Platform,
  Image,
  TouchableWithoutFeedback,
} from "react-native";
import * as Device from "expo-device";
import * as Notifications from "expo-notifications";
import { TouchableOpacity } from "react-native-gesture-handler";
import OpenDrawer from "../../components/Buttons/OpenDrawer";
import BasketIcon from "../../components/Basket/BasketIcon";
import { useNavigation } from "@react-navigation/native";
import { Bars3CenterLeftIcon } from "react-native-heroicons/outline";
import { SafeAreaView } from "react-native-safe-area-context";

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export default function NotificationsScreen() {
  const navigation = useNavigation();

  const openDrawer = () => {
    navigation.openDrawer();
  };
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) =>
      setExpoPushToken(token)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification);
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current
      );
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView className="bg-[#fe6c44] flex-1  ">
      <View className="flex-row justify-between items-center px-2 mb-2">
        {/* Back Icon */}
        <View>
          <TouchableWithoutFeedback onPress={openDrawer}>
            <View className="p-1 border border-white rounded-xl">
              <Bars3CenterLeftIcon color="white" size={26} />
            </View>
          </TouchableWithoutFeedback>
        </View>
        <Text className="text-xl font-bold text-black">Notifications</Text>
        <BasketIcon />
      </View>
      <View className="mx-4 flex-1 justify-evenly">
        <View className="items-center gap-1">
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2Fgirl.png?alt=media&token=ddab01cb-480a-4021-ba5f-217ec4e36326",
            }}
            className="h-20 w-20 rounded-xl relative mr-2"
          />
          <Text className="text-white text-center text-lg font-semibold">
            This is an example of the kind of notification your customers can
            receive when you have a promotion!
          </Text>

          <TouchableOpacity
            className="bg-white text-white items-center justify-center m-2 rounded-full border border-white"
            onPress={async () => {
              await promotionPushNotification();
            }}
          >
            <Text className=" text-center font-bold text-xl px-4 py-2">
              Get the notification
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center gap-1">
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2FScreenshot%202023-09-02%20at%2021.41.43.png?alt=media&token=11aeac0b-2bb9-42d2-91d7-3acbd1e6e78d",
            }}
            className="h-20 w-20 rounded-xl relative mr-2"
          />
          <Text className="text-white text-center text-lg font-semibold">
            This is, again, an example of a courier picking up an order from
            your restaurant and heading to the customer.
          </Text>

          <TouchableOpacity
            className="bg-white text-white items-center justify-center m-2 rounded-full border border-white"
            onPress={async () => {
              await courierPickedUpPushNotification();
            }}
          >
            <Text className=" text-center font-bold text-xl px-4 py-2">
              Get the notification
            </Text>
          </TouchableOpacity>
        </View>
        <View className="items-center gap-1">
          <Image
            source={{
              uri: "https://firebasestorage.googleapis.com/v0/b/test-client-app-ff5fa.appspot.com/o/images%2Fcour.png?alt=media&token=3282b467-ce2b-447e-8654-1a0bcebe1b10",
            }}
            className="h-20 w-20 rounded-xl relative mr-2"
          />
          <Text className="text-white text-center text-lg font-semibold">
            For example, a customer hasn't placed an order in a long time.
            Remind yourself!
          </Text>

          <TouchableOpacity
            className="bg-white text-white items-center justify-center m-2 rounded-full border border-white"
            onPress={async () => {
              await missYouPushNotification();
            }}
          >
            <Text className=" text-center font-bold text-xl px-4 py-2">
              Get the notification
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

async function schedulePushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "You've got mail! 📬",
      body: "Here is the notification body",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

async function promotionPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Today only! 🍔",
      body: "20% off all burgers! \nOrder now! ",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

async function courierPickedUpPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Courier's on the way! 🛵",
      body: "The courier has already picked up the order!",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

async function missYouPushNotification() {
  await Notifications.scheduleNotificationAsync({
    content: {
      title: "Are you hungry? 😋",
      body: "Make an order and get free shipping!",
      data: { data: "goes here" },
    },
    trigger: { seconds: 1 },
  });
}

async function registerForPushNotificationsAsync() {
  let token;

  if (Platform.OS === "android") {
    await Notifications.setNotificationChannelAsync("default", {
      name: "default",
      importance: Notifications.AndroidImportance.MAX,
      vibrationPattern: [0, 250, 250, 250],
      lightColor: "#FF231F7C",
    });
  }

  if (Device.isDevice) {
    const { status: existingStatus } =
      await Notifications.getPermissionsAsync();
    let finalStatus = existingStatus;
    if (existingStatus !== "granted") {
      const { status } = await Notifications.requestPermissionsAsync();
      finalStatus = status;
    }
    if (finalStatus !== "granted") {
      alert("Failed to get push token for push notification!");
      return;
    }
    // Learn more about projectId:
    // https://docs.expo.dev/push-notifications/push-notifications-setup/#configure-projectid
    token = (
      await Notifications.getExpoPushTokenAsync({
        projectId: "d59a1232-73bb-4073-8d6d-6d0248941efc",
      })
    ).data;
    console.log(token);
  } else {
    alert("Must use physical device for Push Notifications");
  }

  return token;
}
