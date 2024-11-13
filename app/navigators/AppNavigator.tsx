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

import React, {useEffect, useState} from 'react';
import {NavigationContainer} from '@react-navigation/native';
import DrawerStackNavigator from './DrawerStackNavigator'; // Assuming this has your HomeStackScreen
import AuthStackNavigator from './AuthStackNavigator';
import AsyncStorage from '@react-native-async-storage/async-storage'
export default function AppNavigator({theme}: any) {
  const [isAuthenticated, setIsAuthenticated] = useState(false); // Replace with actual auth logic
  useEffect(() => {
    // Check AsyncStorage for the auth status
    const checkAuthStatus = async () => {
      const authStatus = await AsyncStorage.getItem('isAuthenticated'); 
      console.log(authStatus,"authStatus");
      if (authStatus === 'true') {
        setIsAuthenticated(true);
      }
    };
    checkAuthStatus();
  }, []);

  const handleLogout = async () => {
    setIsAuthenticated(false);
    await AsyncStorage.removeItem('isAuthenticated'); // Clear AsyncStorage on logout
  };



  return (
    <NavigationContainer theme={theme}>
      {isAuthenticated ? <DrawerStackNavigator onLogout={handleLogout}/> : <AuthStackNavigator setIsAuthenticated={setIsAuthenticated} />}
    </NavigationContainer>
  );
}
