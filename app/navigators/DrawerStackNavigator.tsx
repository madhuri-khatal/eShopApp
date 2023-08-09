import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserStackScreen from './UserStackScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductStackScreen from './ProductStackScreen';

const Drawer = createDrawerNavigator();
export default function DrawerStackNavigator () {
  return (
    <Drawer.Navigator
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
      }}>
      <Drawer.Screen
        name="bottomTab "
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
        component={BottomTabNavigator}
      />
      <Drawer.Screen
        name="userStack"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
        }}
        component={UserStackScreen}
      />
       <Drawer.Screen
        name="profile"
        options={{
          drawerLabel: 'Product',
          title: 'Product',
        }}
        component={ProductStackScreen}
      />
    </Drawer.Navigator>
  );
}
