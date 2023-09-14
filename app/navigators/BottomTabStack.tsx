import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen} from './../screens/UserScreen/CartScreen/CartScreen';
import CheckoutScreen from './../screens/UserScreen/CheckoutScreen/CheckoutScreen';
import BottomTabNavigator from './BottomTabNavigator';
import {CartContextProvider} from './../context/CartContext';
import {ProductContextProvider} from './../context/ProductContext';

const Stack = createStackNavigator();
export default function BottomTabStack() {
  return (
    <ProductContextProvider>
      <CartContextProvider>
        <Stack.Navigator
          screenOptions={{
            headerShown: false,
          }}
          initialRouteName="BottomTabStack">
          <Stack.Screen name="BottomTabStack" component={BottomTabNavigator} />
        </Stack.Navigator>
      </CartContextProvider>
    </ProductContextProvider>
  );
}
