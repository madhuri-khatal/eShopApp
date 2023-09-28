import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import UserStackScreen from './UserStackScreen';
import BottomTabNavigator from './BottomTabNavigator';
import ProductStackScreen from './ProductStackScreen';
import {ProductFilterDrawer} from './../screens/ProductScreen/ProductDetailsScreen/ProductFilterDrawer';
import {useTheme} from 'react-native-paper';
import {OrderScreen} from './../screens/MyOrderScreen/OrderScreen';
import OrderStackScreen from './OrderStackScreen';
import BottomTabStack from './BottomTabStack';
import {WishlistScreen} from './../screens/Wishlistscreen/WishlistScreen';

const Drawer = createDrawerNavigator();
export default function DrawerStackNavigator() {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      id="main"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        sceneContainerStyle: {},
        drawerContentStyle: {backgroundColor: colors.background},
      }}>
      <Drawer.Screen
        name="BottomTab"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
        component={BottomTabStack}
      />
      <Drawer.Screen
        name="UserStack"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
        }}
        component={UserStackScreen}
      />
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: 'Product',
          title: 'Product',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={ProductFilterDrawer}
      />
      <Drawer.Screen
        name="OrderStack"
        options={{
          drawerLabel: 'My Order',
          title: 'My Order',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={OrderStackScreen}
      />
      {/* <Drawer.Screen
        name="WishlistStack"
        options={{
          drawerLabel: 'Wishlist',
          title: 'My Wishlist',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={WishlistScreen}
      /> */}
    </Drawer.Navigator>
  );
}
