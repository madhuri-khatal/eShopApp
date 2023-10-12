import React from 'react';
import {createDrawerNavigator} from '@react-navigation/drawer';
import {ProductFilterDrawer} from './../screens/ProductScreen/ProductDetailsScreen/ProductFilterDrawer';
import {useTheme} from 'react-native-paper';
import OrderStackScreen from './OrderStackScreen';
import BottomTabStack from './BottomTabStack';

const Drawer = createDrawerNavigator();
export default function DrawerStackNavigator() {
  const {colors} = useTheme();
  return (
    <Drawer.Navigator
      id="main"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        sceneContainerStyle: {},
        drawerContentStyle: {backgroundColor: colors.background},
      }}>
      <Drawer.Screen
        name="BottomTab"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
        component={BottomTabStack}
      />
      {/* <Drawer.Screen
        name="UserStack"
        options={{
          drawerLabel: 'Profile',
          title: 'Profile',
        }}
        component={UserStackScreen}
      /> */}
      <Drawer.Screen
        name="Profile"
        options={{
          drawerLabel: 'Product',
          title: 'Product',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={ProductFilterDrawer}
      />
      <Drawer.Screen
        name="OrderStack"
        options={{
          drawerLabel: 'My Order',
          title: 'My Order',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={OrderStackScreen}
      />
      {/* <Drawer.Screen
        name="TrackOrder"
        options={{
          drawerLabel: 'Track Order',
          title: 'Track Order',
          drawerContentStyle: {backgroundColor: colors.background},
        }}
        component={TrackOrderStackScreen}
      /> */}
    </Drawer.Navigator>
  );
}
