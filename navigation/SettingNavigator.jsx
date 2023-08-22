import { View, Text } from 'react-native'
import React from 'react'
import SettingScreen from '../screens/Setting/SettingScreen';
import ChangePassword from '../screens/Setting/ChangePassword';
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import NewPassword from '../screens/Setting/NewPassword';
import EmailScreen from '../screens/Setting/Email/EmailScreen';
import NewEmail from '../screens/Setting/Email/NewEmail';
import MobileScreen from '../screens/Setting/Mobile/MobileScreen';
import DisplayName from '../screens/Setting/DisplayName/DisplayName';

const SettingStack = createNativeStackNavigator();


const SettingNavigator = () => {
  return (
    <SettingStack.Navigator screenOptions={{ headerShown: false }}>
      <SettingStack.Screen name="SettingScreen" component={SettingScreen} />
      <SettingStack.Screen name="ChangePassword" component={ChangePassword}/>
      <SettingStack.Screen name="NewPassword" component={NewPassword}/>
      <SettingStack.Screen name="EmailScreen" component={EmailScreen}/>
      <SettingStack.Screen name="NewEmail" component={NewEmail}/>
      <SettingStack.Screen name="MobileScreen" component={MobileScreen}/>
      <SettingStack.Screen name="DisplayName" component={DisplayName}/>




    </SettingStack.Navigator>
  )
}

export default SettingNavigator