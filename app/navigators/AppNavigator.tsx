import {View, Text} from 'react-native';
import React from 'react';
import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
import DrawerStackNavigator from './DrawerStackNavigator';
import {adaptNavigationTheme} from 'react-native-paper';

export default function AppNavigator({theme}: any) {
  return (
    <NavigationContainer theme={theme}>
      <DrawerStackNavigator />
    </NavigationContainer>
  );
}
