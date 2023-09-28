import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderScreen} from '../screens/MyOrderScreen/OrderScreen';
import {OrderDetailScreen} from '../screens/MyOrderScreen/OrderDetailScreen';
import {CartContextProvider} from '../context/CartContext';
import {ProductContextProvider} from '../context/ProductContext';
import {WishlistScreen} from '../screens/Wishlistscreen/WishlistScreen';

const Stack: any = createStackNavigator();
export default function WishlistStackScreen({navigation}: any) {
  return (
    <>
      <ProductContextProvider>
        <CartContextProvider>
          <Stack.Navigator
            screenOptions={{
              headerShown: false,
            }}
            initialRouteName="WishlistScreen">
            <Stack.Screen name="WishlistScreen" component={WishlistScreen} />
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
