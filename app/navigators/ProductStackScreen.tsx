import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductScreen/ProductsScreen';
import {ProductDetailsScreen} from '../screens/ProductScreen/ProductDetailsScreen/ProductDetailsScreen';
import CheckoutScreen from '../screens/UserScreen/CheckoutScreen/CheckoutScreen';
import {CartScreen} from '../screens/UserScreen/CartScreen/CartScreen';

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
        <Stack.Screen name="cartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </>
  );
}
