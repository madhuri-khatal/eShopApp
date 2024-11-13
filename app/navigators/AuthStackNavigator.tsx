import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
import SignupScreen from '../screens/AuthScreen/SignupScreen';
import HomeStackScreen from './HomeStackScreen';

const AuthStack = createStackNavigator();

export default function AuthStackNavigator({ setIsAuthenticated }:any) {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="LoginScreen" > 
           {(props:any) => <LoginScreen {...props} setIsAuthenticated={setIsAuthenticated} />}
           </AuthStack.Screen>
      <AuthStack.Screen name="SignupScreen" component={SignupScreen} />
     
    </AuthStack.Navigator>
  );
}
 {/* <AuthStack.Screen name="LoginScreen" component={LoginScreen} /> */}