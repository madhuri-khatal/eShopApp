import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/UserScreen/ProfileScreen';
import DrawerStackNavigator from './DrawerStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import {CartScreen} from '../screens/UserScreen/CartScreen/CartScreen';
import CartStackScreen from './CartStackScreen';
import HomeStackScreen from './HomeStackScreen';
import {CartApi} from '../api/CartApi';
import {useCartContext} from './../context/CartContext';
import UserStackScreen from './UserStackScreen';

const Tab = createMaterialBottomTabNavigator();
export default function BottomTabNavigator() {
  const {cartItems, getCartList} = useCartContext();
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);

  return (
    <Tab.Navigator initialRouteName="Home">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="home" color={color} size={26} />
          ),
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="CartStack"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={26} />
          ),
          tabBarBadge: cartItems?.items.length || 0,
        }}
        component={CartStackScreen}
      />
      <Tab.Screen
        name="profileScreen"
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={26} />
          ),
        }}
        component={UserStackScreen}
      />
    </Tab.Navigator>
  );
}
