import {View, Text} from 'react-native';
import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProductsScreen} from '../ProductsScreen';
import DrawerContent from './DrawerContent';
import {ProductContextProvider} from './../../../context/ProductContext';
import {useTheme} from 'react-native-paper';
import ProductStackScreen from './../../../navigators/ProductStackScreen';
import ProductList from '../ProductList';
const Drawer = createDrawerNavigator();

export const ProductFilterDrawer = () => {
  const {colors} = useTheme();
  return (
    <ProductContextProvider>
      <Drawer.Navigator
        id="LeftDrawer"
        drawerContent={DrawerContent}
        screenOptions={{
          drawerPosition: 'left',
          headerShown: false,
          // sceneContainerStyle: {},
          drawerContentStyle: {backgroundColor: colors.background},
          drawerItemStyle: {backgroundColor: colors.background},
          drawerContentContainerStyle: {backgroundColor: colors.background},
        }}>
        <Drawer.Screen
          component={ProductStackScreen}
          name="productStackScreen"
        />
        <Drawer.Screen component={ProductList} name="ProductList" />
      </Drawer.Navigator>
    </ProductContextProvider>
  );
};
