import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderScreen} from '../screens/MyOrderScreen/OrderScreen';
import {OrderDetailScreen} from '../screens/MyOrderScreen/OrderDetailScreen';
import {CartContextProvider} from '../context/CartContext';
import {ProductContextProvider} from '../context/ProductContext';
import { LoginScreen } from '../screens/MyOrderScreen/LoginScreen';

const Stack: any = createStackNavigator();
export default function OrderStackScreen({navigation}: any) {
  return (
    <>
      <ProductContextProvider>
        <CartContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="LoginScreen">
            <Stack.Screen name="LoginScreen" component={LoginScreen} />
            <Stack.Screen name="OrderScreen" component={OrderScreen} />
            <Stack.Screen
              name="OrderDetailScreen"
              component={OrderDetailScreen}
            />
          </Stack.Navigator>
        </CartContextProvider>
      </ProductContextProvider>
    </>
  );
}
