import React from 'react';
import {createDrawerNavigator, DrawerContentScrollView, DrawerItem} from '@react-navigation/drawer';
import {useTheme} from 'react-native-paper';
import OrderStackScreen from './OrderStackScreen';
import BottomTabStack from './BottomTabStack';
import {ProductFilterDrawer} from './../screens/ProductScreen/ProductDetailsScreen/ProductFilterDrawer';

const Drawer = createDrawerNavigator();

export default function DrawerStackNavigator({onLogout}: any) {
  const {colors} = useTheme();

  // Custom Drawer Content to Add Logout Option
  const CustomDrawerContent = (props: any) => (
    <DrawerContentScrollView {...props} style={{backgroundColor:'white'}}>
      <DrawerItem
        label="Home"
        onPress={() => props.navigation.navigate('BottomTab')}
        // style={{backgroundColor:'#e95d2a'}}
      />
      <DrawerItem
        label="Product"
        onPress={() => props.navigation.navigate('Profile')}
        // style={{backgroundColor:'#e95d2a'}}
      />
      <DrawerItem
        label="My Order"
        onPress={() => props.navigation.navigate('OrderStack')}
        // style={{backgroundColor:'#e95d2a'}}
      />
      <DrawerItem
        label="Logout"
        onPress={() => {
          onLogout(); // Call the logout function
          props.navigation.navigate('Auth'); // Navigate to the login screen
        }}
        // style={{backgroundColor:'#e95d2a'}}
      />
    </DrawerContentScrollView>
  );

  return (
    <Drawer.Navigator
      id="main"
      screenOptions={{
        drawerPosition: 'right',
        headerShown: false,
        sceneContainerStyle: {},
        drawerContentStyle: {backgroundColor: colors.background},
      }}
      drawerContent={CustomDrawerContent}>
      <Drawer.Screen
        name="BottomTab"
        options={{
          drawerLabel: 'Home',
          title: 'Home',
        }}
        component={BottomTabStack}
      />
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
    </Drawer.Navigator>
  );
}








// import React from 'react';
// import {createDrawerNavigator} from '@react-navigation/drawer';
// import {ProductFilterDrawer} from './../screens/ProductScreen/ProductDetailsScreen/ProductFilterDrawer';
// import {useTheme} from 'react-native-paper';
// import OrderStackScreen from './OrderStackScreen';
// import BottomTabStack from './BottomTabStack';

// const Drawer = createDrawerNavigator();
// export default function DrawerStackNavigator(onLogout:any) {
//   const {colors} = useTheme();
//   return (
//     <Drawer.Navigator
//       id="main"
//       screenOptions={{
//         drawerPosition: 'right',
//         headerShown: false,
//         sceneContainerStyle: {},
//         drawerContentStyle: {backgroundColor: colors.background},
//       }}>
//       <Drawer.Screen
//         name="BottomTab"
//         options={{
//           drawerLabel: 'Home',
//           title: 'Home',
//         }}
//         component={BottomTabStack}
//       />
//       {/* <Drawer.Screen
//         name="UserStack"
//         options={{
//           drawerLabel: 'Profile',
//           title: 'Profile',
//         }}
//         component={UserStackScreen}
//       /> */}
//       <Drawer.Screen
//         name="Profile"
//         options={{
//           drawerLabel: 'Product',
//           title: 'Product',
//           drawerContentStyle: {backgroundColor: colors.background},
//         }}
//         component={ProductFilterDrawer}
//       />
//       <Drawer.Screen
//         name="OrderStack"
//         options={{
//           drawerLabel: 'My Order',
//           title: 'My Order',
//           drawerContentStyle: {backgroundColor: colors.background},
//         }}
//         component={OrderStackScreen}
//       />
      
//       {/* <Drawer.Screen
//         name="TrackOrder"
//         options={{
//           drawerLabel: 'Track Order',
//           title: 'Track Order',
//           drawerContentStyle: {backgroundColor: colors.background},
//         }}
//         component={TrackOrderStackScreen}
//       /> */}
//     </Drawer.Navigator>
//   );
// }
