import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {CartScreen} from './../screens/UserScreen/CartScreen/CartScreen';
import CheckoutScreen from './../screens/UserScreen/CheckoutScreen/CheckoutScreen';

const Stack = createStackNavigator();
export default function CartStackScreen() {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="CartScreen">
        <Stack.Screen name="CartScreen" component={CartScreen} />
        <Stack.Screen name="CheckoutScreen" component={CheckoutScreen} />
      </Stack.Navigator>
    </>
  );
}
