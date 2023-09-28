import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
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
          </Stack.Navigator>
        </CartContextProvider>
      </ProductContextProvider>
    </>
  );
}
