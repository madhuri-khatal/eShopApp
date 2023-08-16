import {View, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import {DrawerActions} from '@react-navigation/native';
import {Appbar, useTheme} from 'react-native-paper';

export default function ProfileScreen(props: any) {
  const {navigation} = props;
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());
  const {colors}=useTheme();
  return (
    <View>
      <Appbar.Header>
        <Appbar.Content title="Title"  titleStyle={{ color: colors.onSecondary }}  />
        <Appbar.Action icon="magnify" onPress={_handleSearch} />
        <Appbar.Action icon="menu" onPress={_handleMore} />
      </Appbar.Header>
      <Text>This is profile screen</Text>
    </View>
  );
}
