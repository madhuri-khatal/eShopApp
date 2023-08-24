import {View, Text} from 'react-native';
import React from 'react';
import {
  SafeAreaProvider,
  initialWindowMetrics,
} from 'react-native-safe-area-context';
import {
  MD2LightTheme,
  MD3LightTheme,
  PaperProvider,
  configureFonts,
} from 'react-native-paper';
import {darkTheme, lightTheme} from './assets/colors/colors';
import AppNavigator from './app/navigators/AppNavigator';
import {CommanContextProvider} from './app/context/CommanContext';
export default function App() {
  const fontConfig: any = {
    bodyLarge: {
      letterSpacing: 0.5,
      lineHeight: 22,
      fontSize: 20,
    },
  };

  const theme = {
    ...MD3LightTheme,
    fonts: configureFonts({config: fontConfig, isV3: true}),
    colors: lightTheme.colors,
  };
  return (
    <SafeAreaProvider initialMetrics={initialWindowMetrics}>
      <PaperProvider theme={theme}>
        <CommanContextProvider>
          <AppNavigator theme={theme} />
        </CommanContextProvider>
      </PaperProvider>
    </SafeAreaProvider>
  );
}
