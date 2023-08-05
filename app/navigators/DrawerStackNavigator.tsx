import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserStackScreen from './UserStackScreen';
import BottomTabNavigator from './BottomTabNavigator';

const Drawer = createDrawerNavigator();
export default function DrawerStackNavigator() {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}>
      <Drawer.Screen
        name="bottomTab "
        options={{
          drawerLabel: 'Home screen',
          title: 'Home',
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name="userStack"
        options={{
          drawerLabel: 'user screen',
          title: 'user screen',
        }}
        component={UserStackScreen}
      />
    </Drawer.Navigator>
  );
}
