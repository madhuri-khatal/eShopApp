import {View, Text} from 'react-native';
import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import ProductList from '../screens/ProductScreen/ProductList';
import ProductItem from '../screens/ProductScreen/ProductItem';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
import CategoryList from '../screens/WeightListScreen/WeightList';
import {ProductsScreen} from '../screens/ProductScreen/ProductsScreen';
import {ProductDetailsScreen} from '../screens/ProductScreen/ProductDetailsScreen/ProductDetailsScreen';
import CheckoutScreen from '../screens/UserScreen/CheckoutScreen/CheckoutScreen';

const Stack = createStackNavigator();
export default function ProductStackScreen({navigation}: any) {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="ProductsScreen">
        <Stack.Screen name="ProductsScreen" component={ProductsScreen} />
        <Stack.Screen
          name="ProductDetailsScreen"
          component={ProductDetailsScreen}
        />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </>
  );
}
