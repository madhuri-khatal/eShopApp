// import {View, Text} from 'react-native';
// import React from 'react';
// import {DefaultTheme, NavigationContainer} from '@react-navigation/native';
// import DrawerStackNavigator from './DrawerStackNavigator';
// import {adaptNavigationTheme} from 'react-native-paper';

// export default function AppNavigator({theme}: any) {
//   return (
//     <NavigationContainer theme={theme}>
//       <DrawerStackNavigator />
//     </NavigationContainer>
//   );
// }

import React, {useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerStackNavigator from './DrawerStackNavigator'; // Assuming this has your HomeStackScreen
import AuthStackNavigator from './AuthStackNavigator';

export default function AppNavigator({theme}: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic

  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <DrawerStackNavigator /> : <AuthStackNavigator />}
    </NavigationContainer>
  );
}
