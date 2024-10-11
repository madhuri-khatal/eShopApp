import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {ProductsScreen} from '../screens/ProductScreen/ProductsScreen';
import {ProductDetailsScreen} from '../screens/ProductScreen/ProductDetailsScreen/ProductDetailsScreen';
// import CheckoutScreen from '../screens/UserScreen/CheckoutScreen/CheckoutScreen';
import {CartScreen} from '../screens/UserScreen/CartScreen/CartScreen';
import {CartContextProvider} from '../context/CartContext';
import {CategoriesScreen} from '../screens/CategoriesScreen/CategoriesScreen';

const Stack = createStackNavigator();
export default function ProductStackScreen() {
  return (
    <>
      <CartContextProvider>
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
          <Stack.Screen name="CartScreen" component={CartScreen} />
          <Stack.Screen name="CategoriesScreen" component={CategoriesScreen} />
        </Stack.Navigator>
      </CartContextProvider>
    </>
  );
}
