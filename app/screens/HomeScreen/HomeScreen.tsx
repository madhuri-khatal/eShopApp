import {View, Text} from 'react-native';
import React from 'react';
import {Appbar, useTheme} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
export default function HomeScreen({navigation}: any) {
    const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
const {colors}=useTheme();
  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Home"  titleStyle={{ color: colors.onSecondary }}   />
           <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>
        <Text>HomeScreen</Text>
      </View>
    </>
  );
}
