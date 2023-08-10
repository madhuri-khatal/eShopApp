import {View, Text} from 'react-native';
import React from 'react';
import {DrawerContent, createDrawerNavigator} from '@react-navigation/drawer';
import {ProductsScreen} from '../ProductsScreen';
const Drawer = createDrawerNavigator();
export const ProductFilterDrawer = () => {
  return (
    <Drawer.Navigator
      id="LeftDrawer"
      drawerContent={DrawerContent}
      screenOptions={{
        drawerPosition: 'left',
        headerShown: false,
      }}>
      <Drawer.Screen component={ProductsScreen} name="productScreen" />
    </Drawer.Navigator>
  );
};
