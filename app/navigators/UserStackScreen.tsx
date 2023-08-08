import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProfileScreen from '../screens/UserScreen/ProfileScreen';
import EditProfileScreen from '../screens/UserScreen/EditProfileScreen';

const Stack = createStackNavigator();
export default function UserStackScreen() {
  return (
    <Stack.Navigator screenOptions={{
      headerShown:false
    }} initialRouteName="ProfileScreen">
      <Stack.Screen name="ProfileScreen" component={ProfileScreen} />
      <Stack.Screen name="EditProfileScreen" component={EditProfileScreen} />
    </Stack.Navigator>
  );
}
