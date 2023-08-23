import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import {OrderScreen} from '../screens/MyOrderScreen/OrderScreen';
import {OrderDetailScreen} from '../screens/MyOrderScreen/OrderDetailScreen';
import HomeScreen from './../screens/HomeScreen/HomeScreen';

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
      </Stack.Navigator>
    </>
  );
}
