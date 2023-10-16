import {View, Text} from 'react-native';
import React, {useEffect, useState} from 'react';
import {createMaterialBottomTabNavigator} from '@react-navigation/material-bottom-tabs';
import HomeScreen from '../screens/HomeScreen/HomeScreen';
import ProfileScreen from '../screens/UserScreen/ProfileScreen';
import DrawerStackNavigator from './DrawerStackNavigator';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {CartScreen} from '../screens/UserScreen/CartScreen/CartScreen';
import CartStackScreen from './CartStackScreen';
import HomeStackScreen from './HomeStackScreen';
import {CartApi} from '../api/CartApi';
import {useCartContext} from './../context/CartContext';
import UserStackScreen from './UserStackScreen';
import {CategoriesScreen} from '../screens/CategoriesScreen/CategoriesScreen';

const Tab = createMaterialBottomTabNavigator();
export default function BottomTabNavigator() {
  const {cartItems, getCartList} = useCartContext();
  useEffect(() => {
    (async () => {
      await getCartList();
    })();
  }, []);

  return (
    <Tab.Navigator
      initialRouteName="Home"
      // labeled={false}
      barStyle={{
        backgroundColor: '#e95d2a',
        height: '8%',
        // justifyContent: 'center',
        alignItems: 'center',
        // marginBottom: 1,
      }}
      activeColor="#e3e1e1"
      inactiveColor="#fff">
      <Tab.Screen
        name="Home"
        options={{
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons
              name="home"
              color={color}
              size={32}
              // style={{marginBottomBottom: 10}}
            />
          ),
        }}
        component={HomeStackScreen}
      />
      <Tab.Screen
        name="CartStack"
        options={{
          tabBarLabel: 'Cart',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="cart" color={color} size={32} />
          ),
          tabBarBadge: cartItems?.items.length || 0,
        }}
        component={CartStackScreen}
      />
      <Tab.Screen
        name="Categories"
        options={{
          tabBarLabel: 'Categories', 
          tabBarIcon: ({color}) => (
            <MaterialIcons name="category" color={color} size={32} />
          ),
        }}
        component={CategoriesScreen}
      />
      <Tab.Screen
        name="profileScreen"
        options={{
          tabBarLabel: 'profile',
          tabBarIcon: ({color}) => (
            <MaterialCommunityIcons name="account" color={color} size={32} />
          ),
        }}
        component={UserStackScreen}
      />
    </Tab.Navigator>
  );
}
