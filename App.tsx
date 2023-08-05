import {View, Text} from 'react-native';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {MD2LightTheme, PaperProvider} from 'react-native-paper';
import {darkTheme} from './assets/colors/colors';
import AppNavigator from './app/navigators/AppNavigator';
export default function App() {
  const theme = {
    ...MD2LightTheme,
    colors: darkTheme.colors,
  };
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
      <AppNavigator theme={theme} />
      </PaperProvider>
    </SafeAreaProvider>
  );
}
