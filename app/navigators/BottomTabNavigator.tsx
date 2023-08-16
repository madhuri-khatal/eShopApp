import {View, Text} from 'react-native';
import React from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/UserScreen/ProfileScreen';
import DrawerStackNavigator from './DrawerStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartScreen} from '../screens/UserScreen/CartScreen/CartScreen';
const Tab = createMaterialBottomTabNavigator();
export default function BottomTabNavigator() {
  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        component={HomeScreen}
      />
      <Tab.Screen
        name="CartScreen"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
        }}
        component={CartScreen}
      />
      <Tab.Screen
        name="profileScreen"
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        component={ProfileScreen}
      />
    </Tab.Navigator>
  );
}
