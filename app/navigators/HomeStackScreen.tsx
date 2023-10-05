import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderScreen} from '../screens/MyOrderScreen/OrderScreen';
import {OrderDetailScreen} from '../screens/MyOrderScreen/OrderDetailScreen';
import HomeScreen from './../screens/HomeScreen/HomeScreen';
import { ProductsScreen } from '../screens/ProductScreen/ProductsScreen';
import { ProductDetailsScreen } from '../screens/ProductScreen/ProductDetailsScreen/ProductDetailsScreen';
import { CartScreen } from '../screens/UserScreen/CartScreen/CartScreen';
import ProductStackScreen from './ProductStackScreen';

const Stack: any = createStackNavigator();
export default function HomeStackScreen() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="HomeScreen">
        <Stack.Screen name="HomeScreen" component={HomeScreen} />
        <Stack.Screen name="ProductsListScreen" component={ProductStackScreen} />
        <Stack.Screen
            name="ProductDetailsScreen"
            component={ProductDetailsScreen}
          />
      </Stack.Navigator>
    </>
  );
}
