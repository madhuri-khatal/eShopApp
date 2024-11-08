import React from 'react';
import {createStackNavigator} from '@react-navigation/stack';
import LoginScreen from '../screens/AuthScreen/LoginScreen';
// import SignupScreen from '../screens/AuthScreen/SignupScreen';

const AuthStack = createStackNavigator();

export default function AuthStackScreen() {
  return (
    <AuthStack.Navigator screenOptions={{headerShown: false}}>
      <AuthStack.Screen name="LoginScreen" component={LoginScreen} />
      {/* <AuthStack.Screen name="SignupScreen" component={SignupScreen} /> */}
    </AuthStack.Navigator>
  );
}
