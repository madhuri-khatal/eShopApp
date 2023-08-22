import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';

const Stack = createStackNavigator();
export default function CartStackScreen({navigation}: any) {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="CartScreen">
        <Stack.Screen name="CartScreen" component={CartStackScreen} />
        <Stack.Screen name="CheckoutScreen" component={CartStackScreen} />
      </Stack.Navigator>
    </>
  );
}
