import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderScreen} from '../screens/MyOrderScreen/OrderScreen';
import {OrderDetailScreen} from '../screens/MyOrderScreen/OrderDetailScreen';

const Stack: any = createStackNavigator();
export default function OrderStackScreen({navigation}: any) {
  return (
    <>
      <Stack.Navigator
        screenOptions={{
          headerShown: false,
        }}
        initialRouteName="OrderScreen">
        <Stack.Screen name="OrderScreen" component={OrderScreen} />
        <Stack.Screen name="OrderDetailScreen" component={OrderDetailScreen} />
      </Stack.Navigator>
    </>
  );
}
