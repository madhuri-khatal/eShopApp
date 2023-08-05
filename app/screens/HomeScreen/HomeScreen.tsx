import {View, Text} from 'react-native';
import React from 'react';
import {Appbar} from 'react-native-paper';
import {DrawerActions} from '@react-navigation/native';
export default function HomeScreen({navigation}: any) {
  const _goBack = () => console.log('Went back');

  const _handleSearch = () => console.log('Searching');

  const _handleMore = () => navigation.dispatch(DrawerActions.toggleDrawer());

  return (
    <>
      <View>
        <Appbar.Header>
          <Appbar.Content title="Title" />
          <Appbar.Action icon="magnify" onPress={_handleSearch} />
          <Appbar.Action icon="menu" onPress={_handleMore} />
        </Appbar.Header>
        <Text>HomeScreen</Text>
      </View>
    </>
  );
}
