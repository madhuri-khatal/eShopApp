import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProductsScreen} from '../ProductsScreen';
import DrawerContent from './DrawerContent';
import {ProductContextProvider} from './../../../context/ProductContext';
const Drawer = createDrawerNavigator();
export const ProductFilterDrawer = () => {
  return (
    <ProductContextProvider>
      <Drawer.Navigator
        id="LeftDrawer"
        drawerContent={DrawerContent}
        screenOptions={{
          drawerPosition: 'left',
          headerShown: false,
        }}>
        <Drawer.Screen component={ProductsScreen} name="productScreen" />
      </Drawer.Navigator>
    </ProductContextProvider>
  );
};
